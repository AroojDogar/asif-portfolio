import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TagSphere from "@/components/TagSphere";
import Timeline from "@/components/Timeline";
import ProfilePhoto from "@/components/ProfilePhoto";
import ContactSection from "@/components/ContactSection";
import Chatbot from "@/components/Chatbot";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectCover from "@/components/ProjectCover";
import { FadeIn, RevealText, Counter, TiltCard, Magnetic } from "@/components/Motion";
import { profile, stats, about, services, process, skills, projects, testimonials } from "./data";

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <FadeIn>
      <p className="mb-6 flex items-center gap-3 text-xs tracking-[0.25em] text-gold uppercase">
        <span className="text-dim">{n}</span>
        <span className="h-px w-10 bg-gold/50" />
        {children}
      </p>
    </FadeIn>
  );
}



export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />


        {/* ABOUT */}
        <section id="about" className="py-28 sm:py-36">
          <div className={wrap}>
            <Label n="01">About</Label>
            <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
                  <RevealText text="I build AI that thinks, acts and" />
                  <RevealText text="delivers real results." className="gold-text italic" delay={0.3} />
                </h2>
                {about.map((p, i) => (
                  <FadeIn key={i} delay={0.1 * i}>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">{p}</p>
                  </FadeIn>
                ))}
                <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-ink p-6">
                      <p className="gold-text font-serif text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
                      <p className="mt-2 text-xs leading-snug text-dim">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <FadeIn delay={0.2}>
                <TiltCard className="rounded-[2rem]">
                  <ProfilePhoto alt={profile.name} />
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative py-28 sm:py-36">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink2 to-transparent" />
          <div className={`${wrap} relative`}>
            <Label n="02">Services</Label>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
              <RevealText text="From idea to" /> <RevealText text="intelligent product." className="italic text-gold" delay={0.2} />
            </h2>
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {services.map((s, i) => (
                <FadeIn key={s.title} delay={i * 0.08}>
                  <TiltCard className="rounded-3xl">
                    <div className="group flex h-full flex-col rounded-3xl border border-white/8 bg-panel/70 p-8 backdrop-blur transition-colors hover:border-gold/40">
                      <div className="flex items-start justify-between">
                        <span className="font-serif text-6xl text-white/10 transition-colors group-hover:text-gold/40">0{i + 1}</span>
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition-all group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-ink">→</span>
                      </div>
                      <h3 className="mt-10 font-serif text-3xl">{s.title}</h3>
                      <p className="mt-3 text-dim">{s.text}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-dim">{t}</span>)}
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-28 sm:py-36">
          <div className={wrap}>
            <Label n="03">Process</Label>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
              <RevealText text="How I take ideas" /> <RevealText text="to production." className="italic text-gold" delay={0.2} />
            </h2>
            <div className="relative mt-16 grid gap-5 md:grid-cols-4">
              <div className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 md:block" />
              {process.map((p, i) => (
                <FadeIn key={p.step} delay={i * 0.12}>
                  <div className="group relative h-full">
                    <div className="relative z-10 mb-6 grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-ink font-serif text-xl text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                      0{i + 1}
                    </div>
                    <h3 className="font-serif text-3xl">{p.step}</h3>
                    <p className="mt-3 text-dim">{p.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="py-28 sm:py-36">
          <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
            <div>
              <Label n="04">Stack</Label>
              <h2 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
                <RevealText text="A toolkit built for" /> <RevealText text="the AI era." className="italic text-gold" delay={0.2} />
              </h2>
              <FadeIn>
                <p className="mt-6 max-w-md text-lg text-dim">Models, agents and the full-stack engineering that turns them into dependable products. Move your cursor over the globe to spin it.</p>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}><TagSphere tags={skills} /></FadeIn>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-28 sm:py-36">
          <div className={wrap}>
            <Label n="05">Selected Work</Label>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
                <RevealText text="Products that" /> <RevealText text="ship." className="italic text-gold" delay={0.15} />
              </h2>
              <FadeIn>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm transition-colors hover:border-gold hover:text-gold">All 80+ repositories ↗</a>
              </FadeIn>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <FadeIn key={p.title} delay={(i % 3) * 0.1}>
                  <TiltCard className="rounded-3xl">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block h-full overflow-hidden rounded-3xl border border-white/8 bg-panel transition-colors hover:border-gold/40">
                      <ProjectCover title={p.title} hue={p.hue} variant={i % 3} />
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] tracking-[0.2em] text-gold uppercase">{p.category}</span>
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-sm transition-all group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-ink">→</span>
                        </div>
                        <h3 className="mt-3 font-serif text-2xl">{p.title}</h3>
                        <p className="mt-2 text-sm text-dim">{p.text}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-dim">{t}</span>)}
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="py-28 sm:py-36">
          <div className={wrap}>
            <Label n="06">Journey</Label>
            <h2 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
              <RevealText text="Six chapters," /> <RevealText text="one mission." className="italic text-gold" delay={0.2} />
            </h2>
            <Timeline />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="overflow-hidden py-28 sm:py-36">
          <div className={wrap}>
            <Label n="07">Kind words</Label>
          </div>
          <div className={`${wrap} grid gap-6 md:grid-cols-3`}>
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col justify-between rounded-3xl border border-white/8 bg-panel/60 p-8">
                  <blockquote className="font-serif text-2xl leading-snug">
                    <span className="text-gold">&ldquo;</span>{t.quote}<span className="text-gold">&rdquo;</span>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-violet text-sm font-semibold text-ink">{t.initials}</span>
                    <span>
                      <b className="block font-medium">{t.name}</b>
                      <small className="text-dim">{t.title}</small>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="overflow-hidden border-t border-white/5 pt-16">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-6 text-sm text-dim`}>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.title} · {profile.location}</span>
          <Magnetic>
            <a href="#home" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold" aria-label="Back to top">↑</a>
          </Magnetic>
        </div>
        <p className="mt-10 text-center font-serif text-[18vw] leading-[0.8] text-white/[0.04] select-none">Langrah</p>
      </footer>

      <Chatbot />
    </>
  );
}
