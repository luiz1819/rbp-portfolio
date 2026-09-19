"use client";

import { useEffect, useState } from "react";

type AsciiWavesProps = { className?: string };

export function AsciiWaves({ className = "" }: AsciiWavesProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setFrame((value) => value + 1), 120);
    return () => window.clearInterval(timer);
  }, []);

  const rows = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 42 }, (_, column) => {
      const wave = Math.sin(column * 0.45 + frame * 0.12 + row * 0.8);
      return wave > 0.35 ? "·" : wave < -0.35 ? "~" : "•";
    }).join("")
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none overflow-hidden font-mono text-[10px] leading-[1.35] text-foreground/10 sm:text-xs ${className}`}>
      {rows.map((row, index) => <div key={index}>{row}</div>)}
    </div>
  );
}
