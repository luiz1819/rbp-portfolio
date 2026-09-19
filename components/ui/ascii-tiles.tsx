"use client";

import { useEffect, useState } from "react";

type AsciiTilesProps = { className?: string };

export function AsciiTiles({ className = "" }: AsciiTilesProps) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % 18), 180);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div aria-hidden="true" className={`pointer-events-none grid grid-cols-9 gap-1 opacity-35 ${className}`}>
      {Array.from({ length: 54 }, (_, index) => (
        <span key={index} className={`aspect-square rounded-[2px] bg-foreground transition-opacity duration-500 ${index % 18 === active ? "opacity-70" : "opacity-10"}`} />
      ))}
    </div>
  );
}
