// Abstract browser-window mockup used as a project thumbnail. Three layouts rotate by index.
export default function ProjectCover({ title, hue, variant }: { title: string; hue: number; variant: number }) {
  const accent = `hsl(${hue} 70% 62%)`;
  const soft = `hsl(${hue} 60% 55% / .18)`;
  const bar = "rounded-full bg-white/10";

  return (
    <div
      className="relative h-56 overflow-hidden"
      style={{ background: `radial-gradient(circle at 20% 0%, hsl(${hue} 70% 50% / .45), transparent 55%), radial-gradient(circle at 100% 100%, hsl(${(hue + 60) % 360} 70% 50% / .3), transparent 55%), #0e0e13` }}
    >
      <div className="absolute inset-x-6 top-7 bottom-0 overflow-hidden rounded-t-xl border border-white/10 bg-ink/85 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-dim">{title}</span>
        </div>

        {variant === 0 && (
          <div className="flex h-full gap-3 p-3">
            <div className="w-1/4 space-y-2">
              {[70, 55, 80, 45].map((w, i) => <div key={i} className={`h-2 ${bar}`} style={{ width: `${w}%`, background: i === 0 ? accent : undefined }} />)}
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-14 rounded-lg" style={{ background: soft }} />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-lg bg-white/5" />)}
              </div>
            </div>
          </div>
        )}

        {variant === 1 && (
          <div className="space-y-3 p-4">
            <div className={`h-2 w-1/3 ${bar}`} />
            <div className="flex h-20 items-end gap-1.5">
              {[40, 65, 50, 80, 60, 95, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 5 ? accent : soft }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => <div key={i} className="h-6 rounded-md bg-white/5" />)}
            </div>
          </div>
        )}

        {variant === 2 && (
          <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-4">
            <div className="space-y-2">
              <div className="h-3 w-4/5 rounded-full" style={{ background: accent }} />
              <div className={`h-2 w-full ${bar}`} />
              <div className={`h-2 w-2/3 ${bar}`} />
              <div className="mt-3 h-5 w-20 rounded-full" style={{ background: soft }} />
            </div>
            <div className="aspect-square rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, hsl(${(hue + 60) % 360} 70% 50% / .4))` }} />
          </div>
        )}
      </div>
    </div>
  );
}
