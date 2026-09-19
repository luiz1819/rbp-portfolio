"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

import Strands from "@/components/Strands";

type Polaroid = {
  id: string;
  rotate: number;
  src: string;
  alt: string;
};

const PHOTOS: Polaroid[] = [
  { id: "a", rotate: -8, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-25%20at%2010.11.52%20%281%29-SPDSJ3BAOJAiUqU59YA25eB93zq2gk.jpeg", alt: "Apresentação de dança em um espaço aberto" },
  { id: "b", rotate: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2020.19.31-QvygLH6st63ZATy685CUf0C0C3jaNA.jpeg", alt: "Registro com colegas em um ambiente escolar" },
  { id: "c", rotate: -4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2020.19.32-QEkPzJkVJpKWeXzvpJm3D3aPFQOv67.jpeg", alt: "Estádio ao anoitecer" },
  { id: "d", rotate: 7, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-31%20at%2020.37.38-bn3wsJv9vJDrWV8l4vQFM9haRYDlWC.jpeg", alt: "Encontro informal com uma colega" },
  { id: "e", rotate: -6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20251128_075315-j9baNERzrtjdll7ODwqkxHqYXe9qKG.jpg", alt: "Medalhas de olimpíadas acadêmicas" },
  { id: "f", rotate: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260915_164814-06NB25uAldLUe0nL9i0f4Hm5RPcXSg.jpg", alt: "Controle de drone em uma atividade de campo" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
}: {
  photo: Polaroid;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: photo.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
    >
      <img src={photo.src} alt={photo.alt} className="h-full w-full rounded-xl object-cover object-center" />
      {index === PHOTOS.length - 1 ? <Strands className="opacity-65" /> : null}
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-[18px] px-2 sm:gap-5 sm:px-4 lg:pl-[105px] lg:pr-0">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
