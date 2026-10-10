"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/app/data";
import { Magnetic } from "./Motion";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;
const start = 2.1; // after the preloader

function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    // The padding sits on the inner span so the gold gradient (background-clip: text)
    // also covers descenders like the "g" in Langrah.
    <span className="-mb-[0.3em] block overflow-hidden">
      <motion.span className={`block pr-[0.08em] pb-[0.3em] ${className}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: start + delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-violet/15 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />

      <motion.div style={{ y: sceneY, opacity: fade }} className="absolute inset-x-0 top-0 h-[44svh] lg:inset-y-0 lg:left-[48%] lg:h-auto">
        <motion.div className="h-full w-full" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, delay: start - 0.3, ease }}>
          <Scene3D />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="pointer-events-none relative mx-auto w-full max-w-6xl px-4 pt-[42svh] pb-24 sm:px-6 lg:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: start, duration: 0.8 }} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-dim uppercase backdrop-blur">
          <span className="relative h-2 w-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-400" />
            <span className="absolute inset-0 rounded-full bg-green-400" />
          </span>
          Available for global projects
        </motion.div>

        <div className="lg:max-w-[55%]">
        <h1 className="font-serif text-[clamp(3.4rem,14vw,8rem)] leading-[0.9] tracking-tight lg:text-[clamp(3.4rem,8.5vw,8rem)]">
          <Line delay={0.1}>{profile.firstName}</Line>
          <Line delay={0.22} className="gold-text italic">{profile.lastName}</Line>
        </h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: start + 0.6, duration: 0.9, ease }} className="mt-7">
          <p className="flex items-center font-medium whitespace-nowrap text-cream text-[clamp(0.8rem,4.1vw,1.15rem)] sm:text-xl lg:text-[clamp(1rem,1.65vw,1.5rem)]">
            {profile.roles.map((r, i) => (
              <span key={r} className="flex items-center">
                {i > 0 && <span className="mx-[0.7em] h-[1.05em] w-px bg-gold/70" />}
                {r}
              </span>
            ))}
          </p>
          <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent py-1.5 pr-5 pl-1.5 shadow-[0_0_30px_-10px_rgba(214,177,108,.6)] backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-xs text-ink">✦</span>
            <span className="font-semibold tracking-[0.14em] text-gold2 uppercase text-[clamp(0.74rem,3.5vw,1rem)] sm:text-base lg:text-[clamp(0.85rem,1.1vw,1.05rem)]">
              {profile.deployedRole}
            </span>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: start + 0.9, duration: 1 }} className="mt-6 max-w-lg text-dim">
          {profile.intro}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: start + 1.05, duration: 0.9, ease }} className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href="#work" className="group flex items-center gap-3 rounded-full bg-cream py-2 pr-2 pl-6 font-medium text-ink transition-colors hover:bg-gold2">
              Explore my work
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition-transform group-hover:rotate-[-45deg]">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="rounded-full border border-white/15 px-6 py-4 font-medium backdrop-blur transition-colors hover:border-gold hover:text-gold">
              Start a project
            </a>
          </Magnetic>
        </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: start + 1.4 }} className="absolute inset-x-0 bottom-8 mx-auto flex max-w-6xl items-end justify-between px-4 text-xs tracking-[0.2em] text-dim uppercase sm:px-6">
        <span>{profile.location}</span>
        <a href="#about" className="flex flex-col items-center gap-2">
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span className="absolute inset-x-0 h-4 bg-gold" animate={{ y: [-16, 40] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
          </span>
        </a>
        <span className="hidden sm:block">© {new Date().getFullYear()}</span>
      </motion.div>
    </header>
  );
}
