"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(id);
          setTimeout(() => setDone(true), 250);
          return 100;
        }
        return c + Math.ceil((100 - c) / 8);
      });
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="font-serif text-2xl italic text-dim">Mian Asif Langrah</p>
          <p className="gold-text mt-2 font-serif text-8xl tabular-nums sm:text-9xl">{count}</p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-line">
            <div className="h-full bg-gold transition-[width] duration-100" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
