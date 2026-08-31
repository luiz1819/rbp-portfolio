"use client"

import { useEffect, useRef } from "react"

export function Prism({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    let frame = 0
    let raf = 0
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = canvas.clientWidth * ratio
      canvas.height = canvas.clientHeight * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      context.clearRect(0, 0, width, height)
      const time = frame * 0.006
      for (let i = 0; i < 3; i++) {
        const x = width * (0.2 + i * 0.3) + Math.sin(time + i) * width * 0.08
        const gradient = context.createLinearGradient(x, 0, x + width * 0.25, height)
        gradient.addColorStop(0, "rgba(255,255,255,0)")
        gradient.addColorStop(0.5, "rgba(255,255,255,0.08)")
        gradient.addColorStop(1, "rgba(255,255,255,0)")
        context.fillStyle = gradient
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x + width * 0.25, 0)
        context.lineTo(x - width * 0.05, height)
        context.lineTo(x - width * 0.3, height)
        context.closePath()
        context.fill()
      }
      frame++
      raf = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 size-full ${className}`} />
}
