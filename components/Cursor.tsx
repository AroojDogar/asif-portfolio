"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Gold dot + trailing ring that grows over links and buttons. Desktop only.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 25 });
  const ry = useSpring(y, { stiffness: 250, damping: 25 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-none-fine");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a, button, input, textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: hover ? 64 : 34, height: hover ? 64 : 34, backgroundColor: hover ? "rgba(214,177,108,.25)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
