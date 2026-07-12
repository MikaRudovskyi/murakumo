'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A refined dual-ring cursor for pointer devices. A small gold dot follows the
 * pointer instantly; a larger ring trails with easing and expands over
 * interactive elements ([data-cursor] / a / button).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!finePointer || prefersReduced) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-none-desktop')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      }
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, [data-cursor], input, [role="button"]',
      )
      if (ringRef.current) {
        ringRef.current.dataset.active = interactive ? 'true' : 'false'
      }
    }

    const render = () => {
      ring.x += (mouse.x - ring.x) * 0.15
      ring.y += (mouse.y - ring.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    render()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-none-desktop')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={ringRef}
        data-active="false"
        className="absolute -left-4 -top-4 size-8 rounded-full border border-gold/70 transition-[width,height,opacity,background-color] duration-300 data-[active=true]:size-12 data-[active=true]:-left-6 data-[active=true]:-top-6 data-[active=true]:border-gold data-[active=true]:bg-gold/10"
      />
      <div
        ref={dotRef}
        className="absolute -left-0.5 -top-0.5 size-1 rounded-full bg-gold"
      />
    </div>
  )
}
