import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";
import { AsciiWaves } from "@/components/ui/ascii-waves";

const PORTRAIT_SRC = "/josh.webp";
const PORTRAIT_HOVER_SRC = "/josh_wave.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden">
      <AsciiWaves className="absolute inset-x-0 top-28 hidden opacity-60 sm:block" />
      <div className="mx-auto w-full max-w-275 px-5 pt-32 pb-16 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Olá, eu sou Luiz Carlos
            </p>

            <h1 className="text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block">Tecnologia e criatividade</span>
              <span className="block">experiências que inspiram</span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              Uma apresentação sobre quem sou, o que faço e as experiências que fazem parte da minha trajetória.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt="Luiz Carlos em seu espaço de criação"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
