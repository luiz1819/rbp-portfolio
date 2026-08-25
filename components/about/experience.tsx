"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type Entry = { company: string; role: string; period: string; slug?: string; brand?: string };

const ENTRIES: Entry[] = [
  { company: "JIFRO", role: "Participação e vivências esportivas", period: "Experiência pessoal" },
  { company: "Super Liga", role: "Participação em competições", period: "Experiência pessoal" },
  { company: "Carimbó", role: "Cultura, expressão e comunidade", period: "Experiência pessoal" },
];

const ROW_HEIGHT = 64;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const collapsedHeight = ROW_HEIGHT * 2 + ROW_GAP * 2 + ROW_HEIGHT * 0.5;
  const hiddenCount = Math.max(0, ENTRIES.length - 2);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">Vivências</h3>
      <div className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${open ? "pb-2 sm:pb-4" : "pb-0"}`}>
        <motion.div className="relative" initial={false} animate={{ height: open ? "auto" : collapsedHeight }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => (
              <li key={entry.company} className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2" style={{ minHeight: ROW_HEIGHT }}>
                <span className="ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-foreground/8 text-[15px] font-semibold text-foreground ring-1" aria-hidden="true">{entry.company.charAt(0)}</span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">{entry.company}</span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">{entry.role}<span className="text-foreground/30 mx-2">•</span><span className="text-foreground/55">{entry.period}</span></span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        <AnimatePresence>{!open && hiddenCount > 0 ? <motion.div key="fade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: ROW_HEIGHT, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", maskImage: "linear-gradient(to bottom, transparent 0%, black 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 80%)" }} /> : null}</AnimatePresence>
        {hiddenCount > 0 ? <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${open ? "relative mt-4" : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"}`}>{open ? "Mostrar menos" : `Mostrar mais ${hiddenCount}`}<ChevronDown className="h-4 w-4" aria-hidden="true" /></button> : null}
      </div>
    </div>
  );
}
