"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = ["About", "Services", "Work", "Journey", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <div className="ml-auto flex w-fit items-center justify-end gap-2 rounded-full border border-white/10 bg-ink/60 p-2.5 backdrop-blur-xl md:mx-auto md:w-full md:max-w-6xl md:justify-between">
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const id = l.toLowerCase();
            return (
              <a key={l} href={`#${id}`} className="relative rounded-full px-4 py-2 text-sm text-dim transition-colors hover:text-cream">
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/8" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className={`relative ${active === id ? "text-cream" : ""}`}>{l}</span>
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden rounded-full bg-cream px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold2 sm:block">
            Hire me
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 md:hidden">
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-2 grid max-w-6xl rounded-3xl border border-white/10 bg-ink2/95 p-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-serif text-2xl hover:bg-white/5">
              {l}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
