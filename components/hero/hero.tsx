import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";
import { BlurHighlight } from "@/components/ui/blur-highlight";
import Prism from "@/components/Prism";

const PORTRAIT_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2019.43.55%20%281%29-H0C2LFFdsO66aUASU63jZ9JVa3mV8T.jpeg";
const PORTRAIT_HOVER_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2020.37.38-RmkK1W40yFAY1SaHjIJSqPjloxzkcR.jpeg";

export function Hero(): ReactNode {
  return (
    <section className="relative min-h-[680px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[62%] min-h-[440px] opacity-55 mix-blend-screen sm:h-[72%] md:right-1/2 md:h-full md:min-h-[680px]" aria-hidden="true">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.08}
          glow={0.85}
          transparent
          suspendWhenOffscreen
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-275 px-5 pt-32 pb-16 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Olá, eu sou Luiz Carlos
            </p>

            <h1 className="text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] md:text-[2.5rem] lg:text-[3.65rem]">
              <BlurHighlight className="block">Tecnologia e criatividade</BlurHighlight>
              <BlurHighlight className="block">experiências que inspiram</BlurHighlight>
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
