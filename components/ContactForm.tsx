"use client";

import { FormEvent, useState } from "react";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-cream placeholder:text-dim/70 transition-colors focus:border-gold focus:bg-gold/5 focus:outline-none";
const label = "mb-2 block text-xs tracking-wider text-dim uppercase";
const topics = ["AI Agent", "Chatbot / GPT", "Web App", "Training", "Other"];

// No backend needed: the message opens in WhatsApp, ready to send.
export default function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [msg, setMsg] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hi Asif, I'm ${name} (${email}).\nTopic: ${topic}\n\n${msg}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={label}>Name</span>
          <input className={field} placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className={label}>Email</span>
          <input className={field} type="email" placeholder="you@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <span className={label}>I&apos;m interested in</span>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${topic === t ? "border-gold bg-gold text-ink" : "border-white/10 text-dim hover:border-gold/50 hover:text-cream"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <label>
        <span className={label}>Message</span>
        <textarea className={`${field} min-h-32 resize-none`} placeholder="Tell me about your project" required value={msg} onChange={(e) => setMsg(e.target.value)} />
      </label>
      <button type="submit" className="group mt-1 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gold to-gold2 px-7 py-4 font-medium text-ink shadow-[0_10px_40px_-12px_rgba(214,177,108,.8)] transition-transform hover:-translate-y-0.5">
        Send message
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
