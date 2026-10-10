"use client";

import { useState } from "react";

// Put the photo at public/profile.jpg. Until then, a monogram is shown.
export default function ProfilePhoto({ alt }: { alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-panel to-ink">
      {failed ? (
        <div className="grid h-full place-items-center">
          <span className="gold-text font-serif text-[9rem] leading-none italic">AL</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/profile.jpg" alt={alt} className="h-full w-full object-cover object-[65%_center] grayscale-[30%]" onError={() => setFailed(true)} />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-20" style={{ transform: "translateZ(40px)" }}>
        <p className="font-serif text-3xl">{alt}</p>
      </div>
    </div>
  );
}
