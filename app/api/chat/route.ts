import { ApiError, GoogleGenAI, type Content } from "@google/genai";
import { systemPrompt, localAnswer } from "@/app/knowledge";

type ChatMessage = { role: "user" | "assistant"; content: string };

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { messages?: ChatMessage[] } | null;
  // Keep the last few turns and cap message length so the endpoint can't be abused.
  const messages = (body?.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  while (messages.length && messages[0].role !== "user") messages.shift();
  const last = messages.at(-1);
  if (!last || last.role !== "user") return new Response("Bad request", { status: 400 });

  // No API key configured: answer from the built-in knowledge.
  if (!ai) return new Response(localAnswer(last.content));

  // Gemini calls the assistant role "model".
  const contents: Content[] = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let sent = false;
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents,
          config: { systemInstruction: systemPrompt, maxOutputTokens: 1024 },
        });
        for await (const chunk of stream) {
          if (chunk.text) {
            controller.enqueue(encoder.encode(chunk.text));
            sent = true;
          }
        }
        if (!sent) controller.enqueue(encoder.encode(localAnswer(last.content)));
      } catch (error) {
        console.error("Chat error:", error instanceof ApiError ? `${error.status} ${error.message}` : error);
        if (!sent) controller.enqueue(encoder.encode(localAnswer(last.content)));
      }
      controller.close();
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
