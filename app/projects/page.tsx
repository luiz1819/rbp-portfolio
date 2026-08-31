import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import LetterGlitch from "@/components/LetterGlitch";

export const metadata: Metadata = createMetadata({
  title: "Galeria pessoal",
  description: "Fotos, experiências e histórias da trajetória de Luiz Carlos.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="relative mx-auto w-full max-w-275 overflow-hidden px-5 pt-32 pb-16 sm:px-10 sm:pt-100 sm:pb-20"><div className="pointer-events-none absolute inset-0 z-0 h-full min-h-120 opacity-12 sm:opacity-20" aria-hidden="true"><LetterGlitch glitchSpeed={70} centerVignette outerVignette smooth backgroundColor="transparent" /></div><div className="relative z-10">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Um pouco sobre mim
          </h1>
          <p className="max-w-[33ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Fotos, experiências e histórias do JIFRO, da Super Liga, do Carimbó e de outros momentos importantes.
          </p>
        </FadeIn>
      </div></section>
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
