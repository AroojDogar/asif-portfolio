"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = ["Who is Asif?", "What services does he offer?", "Show me his projects", "How can I hire him?"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Asif's AI assistant. Ask me anything about his work, skills or how to start a project together." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: "Something went wrong. Please try again, or message Asif on WhatsApp." }]);
    }
    setLoading(false);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.6, type: "spring" }}
        onClick={() => setOpen(!open)}
        aria-label="Open AI assistant"
        className="fixed right-5 bottom-5 z-[70] flex items-center gap-2 rounded-full bg-gold py-3 pr-5 pl-3 font-medium text-ink shadow-[0_10px_40px_-8px_rgba(214,177,108,.7)] transition-colors hover:bg-gold2"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ink text-gold">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/60" />
          {open ? "✕" : "✦"}
        </span>
        <span className="text-sm">{open ? "Close" : "Ask my AI"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-24 left-4 z-[70] flex h-[min(560px,70vh)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink2/95 shadow-2xl backdrop-blur-xl sm:left-auto sm:w-[380px]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-violet font-serif text-lg text-ink">A</div>
              <div>
                <p className="font-medium">Asif&apos;s AI Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · powered by Gemini
                </p>
              </div>
            </div>

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "rounded-br-sm bg-gold text-ink" : "rounded-bl-sm bg-white/6 text-cream"}`}>
                    {m.content || (
                      <span className="flex gap-1 py-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-dim" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => send(s)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-dim transition-colors hover:border-gold hover:text-cream">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Asif..."
                maxLength={500}
                className="flex-1 rounded-full bg-white/6 px-4 py-2.5 text-sm text-cream placeholder:text-dim focus:ring-1 focus:ring-gold focus:outline-none"
              />
              <button disabled={loading} className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink transition-opacity disabled:opacity-40" aria-label="Send">
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
