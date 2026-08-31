"use client"

import { useEffect, useRef } from "react"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export function LetterGlitch({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    let raf = 0
    let frame = 0
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
      context.font = "12px monospace"
      const columns = Math.ceil(width / 18)
      const rows = Math.ceil(height / 18)
      for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
        if ((x * 7 + y * 11 + frame) % 17 > 2) continue
        context.fillStyle = "rgba(255,255,255,0.16)"
        context.fillText(LETTERS[(x * 13 + y * 5 + frame) % LETTERS.length] ?? "", x * 18, y * 18)
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
