import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GridScan } from "@/components/GridScan";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="relative mx-auto w-full max-w-312 overflow-hidden pt-32 sm:pt-56">
        <div className="pointer-events-none absolute inset-0 z-0 h-120 opacity-15 sm:h-160" aria-hidden="true">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#2F293A"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
            className="h-full w-full"
            style={{}}
          />
        </div>
        <div className="relative z-10"><PolaroidStrip /></div>
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Olá! Eu sou <span className="border-b border-foreground/30 pb-0.5">Luiz Carlos</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                Sou um profissional apaixonado por criar experiências digitais intuitivas e humanas. Meu percurso combina tecnologia, criatividade e participação em experiências que valorizam colaboração, disciplina e comunidade.
              </p>
              <p>
                My journey into design began when I realized how often good user experience was missing from powerful tools. That led me to embrace <strong className="font-semibold text-foreground">user-centered design</strong> as both a mindset and a craft, one that balances clarity, creativity, and functionality.
              </p>
              <p>
                Currently leading design at small product teams shipping software for <strong className="font-semibold text-foreground">creative professionals</strong>, I&rsquo;m always looking for opportunities to <strong className="font-semibold text-foreground">shape thoughtful interfaces and build scalable design systems</strong>.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
