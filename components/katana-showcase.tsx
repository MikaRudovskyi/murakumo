'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal } from '@/components/reveal'

type Hotspot = {
  id: string
  top: string
  label: string
  jp: string
  title: string
  detail: string
  meta: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'kissaki',
    top: '15%',
    label: 'Kissaki',
    jp: '切先',
    title: 'The Point',
    detail:
      'The most difficult geometry to polish. Its boundary line, the yokote, must be perfectly crisp — a test the master applies before any blade leaves the forge.',
    meta: 'Chū-kissaki · medium point',
  },
  {
    id: 'blade',
    top: '34%',
    label: 'Blade',
    jp: '地鉄',
    title: 'Steel & Forging',
    detail:
      'Smelted tamahagane is folded upon itself over a thousand times, driving out impurities and marrying hard edge-steel to a resilient softer spine. The result is a surface grain — jihada — like flowing water.',
    meta: '1,024 layers · differential hardness',
  },
  {
    id: 'hamon',
    top: '52%',
    label: 'Hamon',
    jp: '刃文',
    title: 'The Temper Line',
    detail:
      'Before quenching, the smith paints the blade in clay. The bare edge cools instantly into glassy martensite while the spine stays soft, leaving a misted, wave-like border unique to every blade.',
    meta: 'Notare · gentle wave pattern',
  },
  {
    id: 'tsuba',
    top: '72%',
    label: 'Tsuba',
    jp: '鍔',
    title: 'The Guard',
    detail:
      'More than protection, the tsuba is the sword’s jewel. Hand-cut iron inlaid with gold clouds — a private crest carried by the family that commissions the blade.',
    meta: 'Patinated iron · gold nunome inlay',
  },
  {
    id: 'tsuka',
    top: '88%',
    label: 'Tsuka',
    jp: '柄',
    title: 'Handle & Signature',
    detail:
      'Wrapped in vegetable-tanned silk over genuine ray skin for an unshifting grip. Beneath the wrap, the tang bears the master smith’s signature — the mei — chiselled by hand.',
    meta: 'Tsumami-maki · silk over samegawa',
  },
]

export function KatanaShowcase() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 40 })
  const [activeId, setActiveId] = useState<string>('hamon')

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -12, y: px * 18 })
    setGlare({ x: 50 + px * 60, y: 40 + py * 40 })
  }, [])

  const reset = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 40 })
  }, [])

  const active = HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[2]

  return (
    <section
      id="showcase"
      className="relative overflow-hidden border-y border-border/60 bg-background py-24 lg:py-32"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, oklch(0.8 0.12 82 / 0.22), transparent 65%)',
        }}
      />

      <Reveal className="mx-auto mb-16 max-w-2xl px-6 text-center">
        <p className="text-xs uppercase tracking-widest-xl text-gold">
          Inspect the Artifact
        </p>
        <h2 className="mt-6 text-balance font-serif text-4xl font-light text-foreground sm:text-5xl">
          Anatomy of a masterpiece
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Move across the blade to catch the light. Select a point to study how
          it is made.
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        {/* Interactive katana stage */}
        <div
          ref={stageRef}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="relative flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className="relative h-[64vh] max-h-[680px] w-full"
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src="/images/showcase-katana.png"
              alt="A complete Murakumo katana displayed vertically, tip skyward"
              fill
              className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
            {/* Metallic glare that tracks the cursor */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity"
              style={{
                background: `radial-gradient(30% 40% at ${glare.x}% ${glare.y}%, oklch(0.95 0.08 90 / 0.55), transparent 60%)`,
              }}
            />

            {/* Hotspots */}
            {HOTSPOTS.map((h) => (
              <HotspotButton
                key={h.id}
                hotspot={h}
                active={h.id === activeId}
                onSelect={() => setActiveId(h.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[22rem]">
          <div className="mb-8 flex flex-wrap gap-2">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                type="button"
                data-cursor
                onClick={() => setActiveId(h.id)}
                className={`border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  h.id === activeId
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl text-gold">{active.jp}</span>
                <span className="h-px flex-1 gold-line" />
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {active.label}
              </p>
              <h3 className="mt-2 font-serif text-3xl font-light text-foreground">
                {active.title}
              </h3>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                {active.detail}
              </p>
              <p className="mt-6 inline-block border border-gold/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                {active.meta}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function HotspotButton({
  hotspot,
  active,
  onSelect,
}: {
  hotspot: Hotspot
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      data-cursor
      onClick={onSelect}
      aria-label={`View ${hotspot.label}`}
      className="group absolute left-1/2 hidden -translate-x-1/2 md:block"
      style={{ top: hotspot.top }}
    >
      <span className="relative flex size-4 items-center justify-center">
        {!active && (
          <span className="absolute inline-flex size-4 animate-ping rounded-full bg-gold/40" />
        )}
        <span
          className={`relative inline-flex rounded-full transition-all duration-300 ${
            active ? 'size-3 bg-gold ring-4 ring-gold/30' : 'size-2 bg-gold/80'
          }`}
        />
      </span>
      <span className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap border border-gold/30 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        {hotspot.label}
      </span>
    </button>
  )
}
