"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { experience } from "@/app/data";

// Career timeline whose gold line fills as you scroll through it.
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <div ref={ref} className="relative mt-16">
      <div className="absolute top-0 bottom-0 left-[11px] w-px bg-line md:left-1/2" />
      <motion.div style={{ scaleY: scrollYProgress }} className="absolute top-0 bottom-0 left-[11px] w-px origin-top bg-gradient-to-b from-gold2 via-gold to-violet md:left-1/2" />
      {experience.map((e, i) => (
        <motion.div
          key={e.company}
          initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mb-10 pl-10 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
        >
          <span className={`absolute top-7 left-1.5 h-3 w-3 rounded-full ring-4 ring-ink ${i % 2 ? "md:-left-1.5" : "md:right-[-6px] md:left-auto"} ${e.current ? "bg-gold" : "bg-line"}`}>
            {e.current && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold" />}
          </span>
          <div className="rounded-3xl border border-white/8 bg-panel/60 p-6 backdrop-blur transition-colors hover:border-gold/40">
            <p className={`text-xs tracking-[0.2em] uppercase ${e.current ? "text-gold" : "text-dim"}`}>{e.date}</p>
            <h3 className="mt-2 font-serif text-3xl">{e.company}</h3>
            <p className="mt-1 text-cream/90">{e.role}</p>
            <p className="mt-1 text-sm text-dim">{e.full}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
