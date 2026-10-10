import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt, localAnswer } from "@/app/knowledge";

type ChatMessage = { role: "user" | "assistant"; content: string };

const hasKey = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const client = hasKey ? new Anthropic() : null;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { messages?: ChatMessage[] } | null;
  // Keep the last few turns and cap message length so the endpoint can't be abused.
  const messages: Anthropic.MessageParam[] = (body?.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  while (messages.length && messages[0].role !== "user") messages.shift();
  const last = messages.at(-1);
  if (!last || last.role !== "user") return new Response("Bad request", { status: 400 });

  // No API key configured: answer from the built-in knowledge.
  if (!client) return new Response(localAnswer(last.content as string));

  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 1024,
    system: systemPrompt,
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages,
  } as Anthropic.Beta.MessageCreateParamsStreaming);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("Sorry, I can't help with that. Ask me about Asif's work, skills or how to contact him."));
        }
      } catch (error) {
        console.error("Chat error:", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
        controller.enqueue(encoder.encode(localAnswer(last.content as string)));
      }
      controller.close();
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
