import { profile } from "@/app/data";
import ContactForm from "./ContactForm";
import { FadeIn, RevealText } from "./Motion";

const icons = {
  email: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.3 7H4v.6l8 5.4 8-5.4V7h-.3L12 12.2z",
  whatsapp: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1a15 15 0 0 1-6.3-5.6c-.5-.7-.9-1.6-.9-2.5 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.7c.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.5.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.3.1.1.1.7-.1 1.3z",
  linkedin: "M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9.5h3V19zM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.8 13 12.8 14.3V19h-3V9.5h2.9v1.3a3.2 3.2 0 0 1 2.8-1.6c3 0 3.5 2 3.5 4.5V19z",
  github: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
};

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: icons.email },
  { label: "WhatsApp", value: profile.phone, href: `https://wa.me/${profile.whatsapp}`, icon: icons.whatsapp },
  { label: "LinkedIn", value: "Mian Asif Langrah", href: profile.linkedin, icon: icons.linkedin },
  { label: "GitHub", value: "@Asif-langrah", href: profile.github, icon: icons.github },
];

function Icon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[140px]" />
      <div className="absolute right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          {/* gradient border card */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-gold/50 via-white/5 to-violet/40 p-px">
            <div className="grid gap-12 rounded-[calc(2.5rem-1px)] bg-ink2/95 p-5 sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div className="flex flex-col">
                <p className="flex items-center gap-3 text-xs tracking-[0.25em] text-gold uppercase">
                  <span className="text-dim">08</span>
                  <span className="h-px w-10 bg-gold/50" />
                  Contact
                </p>
                <h2 className="mt-6 font-serif text-5xl leading-[1] sm:text-6xl">
                  <RevealText text="Have a project" />
                  <br />
                  <RevealText text="in mind?" className="gold-text italic" delay={0.2} />
                </h2>
                <p className="mt-5 max-w-md text-dim">
                  Whether it&apos;s an AI agent, a chatbot or a full product, let&apos;s talk about how to bring it to life.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {channels.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                        <Icon d={c.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs tracking-wider text-dim uppercase">{c.label}</span>
                        <span className="block truncate text-sm text-cream">{c.value}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-6 max-lg:mt-10">
                  <span className="flex items-center gap-2 text-sm text-dim">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    {profile.location} · Working worldwide
                  </span>
                  <a href={profile.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-dim transition-colors hover:border-gold hover:text-gold">
                    <Icon d={icons.facebook} className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="sm:rounded-3xl sm:border sm:border-white/8 sm:bg-ink/60 sm:p-8">
                <h3 className="font-serif text-3xl">Send a message</h3>
                <p className="mt-1 text-sm text-dim">Fill in the details and it will open in WhatsApp, ready to send.</p>
                <div className="mt-8">
                  <ContactForm whatsapp={profile.whatsapp} />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
