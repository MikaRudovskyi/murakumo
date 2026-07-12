'use client'

import { useEffect, useRef } from 'react'

type Petal = {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rot: number
  rotSpeed: number
  sway: number
  swaySpeed: number
  opacity: number
}

/**
 * Global atmospheric layer: drifting sakura petals (canvas), soft fog blooms,
 * and an animated film grain. All decorative + pointer-events-none.
 */
export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let raf = 0
    let running = true

    // Petal count scales with viewport but stays modest for performance.
    const count = Math.min(28, Math.floor(width / 52))
    const petals: Petal[] = Array.from({ length: count }, () => spawn(width, height))

    function spawn(w: number, h: number, top = false): Petal {
      return {
        x: Math.random() * w,
        y: top ? -20 - Math.random() * h : Math.random() * h,
        size: 6 + Math.random() * 8,
        speedY: 0.35 + Math.random() * 0.7,
        speedX: -0.3 + Math.random() * 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: -0.02 + Math.random() * 0.04,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.15 + Math.random() * 0.4,
      }
    }

    function drawPetal(p: Petal) {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacity
      // Warm gold-tinted petal
      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size)
      grad.addColorStop(0, 'rgba(226, 192, 122, 0.9)')
      grad.addColorStop(1, 'rgba(180, 140, 70, 0.5)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.quadraticCurveTo(p.size * 0.6, -p.size * 0.2, 0, p.size)
      ctx.quadraticCurveTo(-p.size * 0.6, -p.size * 0.2, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    function tick() {
      if (!ctx || !running) return
      ctx.clearRect(0, 0, width, height)
      for (const p of petals) {
        p.sway += p.swaySpeed
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.sway) * 0.5
        p.rot += p.rotSpeed
        if (p.y > height + 20) {
          Object.assign(p, spawn(width, height, true))
        }
        drawPetal(p)
      }
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) tick()
      else cancelAnimationFrame(raf)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {/* Sakura / gold petals */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Soft fog blooms */}
      <div
        className="absolute -left-40 top-1/4 size-[40rem] animate-float-slow rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--gold), transparent 70%)' }}
      />
      <div
        className="absolute -right-40 bottom-1/4 size-[36rem] animate-float-slow rounded-full opacity-[0.05] blur-3xl"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.05 60), transparent 70%)',
          animationDelay: '2s',
        }}
      />
      {/* Film grain */}
      <div className="grain-overlay animate-grain absolute -inset-[50%] opacity-[0.05] mix-blend-overlay" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, transparent 55%, oklch(0.05 0 0 / 0.55) 100%)',
        }}
      />
    </div>
  )
}
