"use client";

import { useEffect, useRef } from "react";

// A 3D globe of skill tags that spins on its own and follows the cursor.
export default function TagSphere({ tags }: { tags: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const n = tags.length;
    // Even spread over a sphere (Fibonacci lattice)
    const points = tags.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)];
    });
    let ax = 0.003, ay = 0.004, tx = ax, ty = ay;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ty = ((e.clientX - r.left) / r.width - 0.5) * 0.02;
      tx = -((e.clientY - r.top) / r.height - 0.5) * 0.02;
    };
    const onLeave = () => { tx = 0.003; ty = 0.004; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const frame = () => {
      ax += (tx - ax) * 0.05;
      ay += (ty - ay) * 0.05;
      const radius = el.clientWidth / 2.4;
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      points.forEach((p, i) => {
        const [x, y, z] = p;
        const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
        const x2 = x * cy + z1 * sy, z2 = -x * sy + z1 * cy;
        p[0] = x2; p[1] = y1; p[2] = z2;
        const node = items.current[i];
        if (node) {
          const scale = (z2 + 2) / 3;
          node.style.transform = `translate(-50%,-50%) translate3d(${x2 * radius}px, ${y1 * radius}px, 0) scale(${scale})`;
          node.style.opacity = String(0.25 + ((z2 + 1) / 2) * 0.75);
          node.style.zIndex = String(Math.round(z2 * 100));
        }
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [tags]);

  return (
    <div ref={box} className="relative mx-auto aspect-square w-full max-w-[460px] select-none">
      <div className="absolute inset-[18%] rounded-full bg-gold/10 blur-3xl" />
      {tags.map((t, i) => (
        <span
          key={t}
          ref={(n) => { items.current[i] = n; }}
          className="absolute top-1/2 left-1/2 rounded-full border border-white/10 bg-ink2/80 px-3 py-1.5 text-sm whitespace-nowrap text-cream backdrop-blur"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
