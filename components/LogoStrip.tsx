import { companies } from "@/app/data";

// Monochrome wordmarks so every logo sits in the same visual style.
function OpenAI() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <rect key={r} x="9" y="2.5" width="6" height="11" rx="3" transform={`rotate(${r} 12 12)`} />
        ))}
      </svg>
      <span className="text-2xl font-semibold tracking-tight">OpenAI</span>
    </span>
  );
}

function Microsoft() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <rect x="1" y="1" width="10.5" height="10.5" />
        <rect x="12.5" y="1" width="10.5" height="10.5" />
        <rect x="1" y="12.5" width="10.5" height="10.5" />
        <rect x="12.5" y="12.5" width="10.5" height="10.5" />
      </svg>
      <span className="text-2xl font-semibold tracking-tight">Microsoft</span>
    </span>
  );
}

function Google() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
      <span className="text-2xl font-medium tracking-tight">Google</span>
    </span>
  );
}

function ManTech() {
  return (
    <span className="flex flex-col leading-none">
      <span className="text-2xl font-extrabold tracking-tight italic">ManTech</span>
      <span className="mt-1 text-[9px] font-semibold tracking-[0.35em]">INTERNATIONAL</span>
    </span>
  );
}

function PAIB() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 2 21 7v10l-9 5-9-5V7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="text-2xl font-bold tracking-[0.12em]">PAIB</span>
    </span>
  );
}

const logos: Record<string, () => React.ReactElement> = {
  OpenAI,
  Microsoft,
  Google,
  "ManTech International": ManTech,
  PAIB,
};

export default function LogoStrip() {
  const row = companies.map((c) => ({ name: c, Logo: logos[c] }));

  return (
    <section className="border-y border-white/5 py-12">
      <p className="mb-8 text-center text-xs tracking-[0.3em] text-gold uppercase">Working In</p>
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
            {[...row, ...row].map(({ name, Logo }, i) => (
              <span key={`${name}-${i}`} title={name} className="mx-10 text-cream/55 transition-colors duration-300 hover:text-cream sm:mx-14">
                <Logo />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
