"use client";

import { useEffect, useRef } from "react";

type PrismProps = {
  className?: string;
  animationType?: "rotate" | "hover";
  timeScale?: number;
  height?: number;
  baseWidth?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  noise?: number;
  glow?: number;
};

export function Prism({
  className = "",
  animationType = "rotate",
  timeScale = 0.5,
  height = 3.5,
  baseWidth = 5.5,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  noise = 0.5,
  glow = 1,
}: PrismProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointerX = (event.clientX - box.left) / Math.max(1, box.width) - 0.5;
      pointerY = (event.clientY - box.top) / Math.max(1, box.height) - 0.5;
    };
    const draw = () => {
      const width = canvas.clientWidth;
      const heightPx = canvas.clientHeight;
      const time = reduced ? 0 : frame * 0.006 * timeScale;
      context.clearRect(0, 0, width, heightPx);
      context.save();
      context.translate(width / 2 + pointerX * (animationType === "hover" ? 20 : 0), heightPx / 2 + pointerY * (animationType === "hover" ? 20 : 0));
      context.rotate(Math.sin(time * 0.7) * 0.08);
      const count = width < 500 ? 2 : 3;
      for (let i = 0; i < count; i++) {
        const progress = i / Math.max(1, count - 1);
        const x = (progress - 0.5) * width * 0.9 + Math.sin(time + i * 1.7) * width * 0.08;
        const bar = Math.max(0.12, Math.min(0.42, baseWidth / 18));
        const gradient = context.createLinearGradient(x - width * bar, -heightPx, x + width * bar, heightPx);
        const hue = 190 + hueShift + i * 18 + Math.sin(time * colorFrequency) * 12;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 0)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 85%, 75%, ${0.12 * glow})`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 70%, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(x - width * bar, -heightPx);
        context.lineTo(x + width * bar, -heightPx);
        context.lineTo(x + width * bar * 0.45 + Math.sin(time) * width * 0.04, heightPx);
        context.lineTo(x - width * bar * 0.7, heightPx);
        context.closePath();
        context.fill();
      }
      if (noise > 0) {
        context.globalAlpha = Math.min(0.12, noise * 0.08);
        for (let i = 0; i < 90; i++) {
          context.fillStyle = "#ffffff";
          context.fillRect(Math.random() * width - width / 2, Math.random() * heightPx - heightPx / 2, 1, 1);
        }
      }
      context.restore();
      frame += 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move, { passive: true });
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
    };
  }, [animationType, baseWidth, colorFrequency, glow, height, hueShift, noise, scale, timeScale]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}

export default Prism;
