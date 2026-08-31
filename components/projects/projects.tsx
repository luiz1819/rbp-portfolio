import { ArrowRight, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import PixelSnow from "@/components/PixelSnow";

type Memory = { id: string; title: string; description: string; meta: string; image?: string; imageAlt: string };

const MEMORIES: Memory[] = [
  { id: "jifro", title: "JIFRO", description: "Participação, energia e aprendizados que marcaram minha trajetória.", meta: "Evento esportivo e cultural", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-25%20at%2010.11.55-ezwxP5oqI5zauCdd3CSrnMypJZIL6S.jpeg", imageAlt: "Luiz Carlos em um momento do JIFRO" },
  { id: "super-liga", title: "Super Liga", description: "Atuei como ponta, vivendo o jogo com intensidade, disciplina e espírito de equipe.", meta: "Esporte · Ponta", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2020.37.59-xR0g75rOZlUOsl3FxOqefsRQyvRGlv.jpeg", imageAlt: "Jogada de vôlei na Super Liga" },
  { id: "carimbo", title: "Carimbó", description: "Cultura, movimento e conexão com as raízes da Amazônia.", meta: "Cultura e expressão", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2019.35.14%20%281%29-6HLRi7XWv0RPTGWKlM6gGsFP05W1IU.jpeg", imageAlt: "Apresentação de Carimbó" },
  { id: "outros-eventos", title: "Outros momentos", description: "Um espaço aberto para registrar encontros, eventos e experiências importantes.", meta: "Memórias pessoais", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2019.43.51-3eHUH3kTiyCn0gVH1OeICNlnWBIwlM.jpeg", imageAlt: "Momento entre amigos em uma atividade esportiva" },
];

export type ProjectsProps = { withHeadline?: boolean; viewMoreVisible?: boolean };

export function Projects({ withHeadline = false, viewMoreVisible = false }: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? MEMORIES.slice(0, 2) : MEMORIES;
  return (
    <section className="relative isolate min-h-[680px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-35" aria-hidden="true">
        <PixelSnow color="#ffffff" variant="round" density={0.22} speed={0.8} brightness={0.7} className="h-full w-full" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-275 px-5 sm:px-10">
        {withHeadline ? <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14"><h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">Um pouco sobre mim</h2><p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">Fotos, experiências e histórias que fazem parte da minha trajetória.</p></FadeIn> : null}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7">{items.map((memory, index) => <MemoryCard key={memory.id} memory={memory} index={index} />)}</div>
        {viewMoreVisible ? <div className="mt-12 flex justify-center sm:mt-16"><Link href="/projects" className="focus-ring group inline-flex items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">Ver galeria completa <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /></Link></div> : null}
      </div>
    </section>
  );
}

function MemoryCard({ memory, index }: { memory: Memory; index: number }): ReactNode {
  return <FadeIn delay={Math.min(index * 0.06, 0.3)}><article className="project-card flex h-full flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5"><header className="flex items-center gap-2.5 px-1 pt-2"><span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background"><Camera className="h-3.5 w-3.5 text-foreground" aria-hidden="true" /></span><span className="text-sm font-medium tracking-tight text-foreground">Galeria pessoal</span></header><div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-foreground/5">{memory.image ? <Image src={memory.image} alt={memory.imageAlt} fill sizes="(min-width: 640px) 45vw, 100vw" className="object-cover" /> : <div className="flex flex-col items-center gap-2 text-center text-foreground/40"><Camera className="h-6 w-6" aria-hidden="true" /><span className="text-xs">Adicione sua foto aqui</span></div>}</div><div className="flex flex-col gap-2.5 px-1 pb-1"><h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">{memory.title}</h3><p className="text-[14px] leading-relaxed tracking-tight text-foreground/65 sm:text-[15px]">{memory.description}</p></div><p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">{memory.meta}</p></article></FadeIn>;
}
