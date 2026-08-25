import { ArrowRight, Camera } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Memory = {
  id: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
};

const MEMORIES: Memory[] = [
  {
    id: "jifro",
    title: "Vivências que também fazem parte de mim.",
    description:
      "Este espaço reúne fotos e histórias da minha participação no JIFRO, na Super Liga, no Carimbó e em outros momentos que ajudam a contar quem eu sou além do trabalho.",
    meta: "Memórias pessoais",
    imageRatio: 1248 / 1254,
    image: "/josh.webp",
    imageAlt: "Luiz Carlos em seu espaço de criação",
  },
];

export type ProjectsProps = { withHeadline?: boolean; viewMoreVisible?: boolean };

export function Projects({ withHeadline = false, viewMoreVisible = false }: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? MEMORIES.slice(0, 4) : MEMORIES;
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Um pouco sobre mim
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Fotos, experiências e histórias que fazem parte da minha trajetória.
            </p>
          </FadeIn>
        ) : null}
        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((memory, index) => <MemoryCard key={memory.id} memory={memory} index={index} />)}
        </div>
        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link href="/projects" className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">
              Ver galeria completa
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MemoryCard({ memory, index }: { memory: Memory; index: number }): ReactNode {
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.3)} className="mb-6 break-inside-avoid md:mb-7">
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Camera className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">Galeria pessoal</span>
        </header>
        <div className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1" style={{ aspectRatio: memory.imageRatio }}>
          <div className="project-card__image-inner">
            <Image src={memory.image} alt={memory.imageAlt} fill sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw" className="object-cover" priority={index < 2} />
          </div>
        </div>
        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">{memory.title}</h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">{memory.description}</p>
        </div>
        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">{memory.meta}</p>
      </article>
    </FadeIn>
  );
}
