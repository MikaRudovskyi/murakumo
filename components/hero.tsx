'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { Magnetic } from '@/components/magnetic'

export function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = window.setTimeout(() => setLoaded(true), 80)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(t)
    }
  }, [])

  const p = prefersReduced ? 0 : 1
  const fade = Math.max(0, 1 - scrollY / 620)

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden lacquer"
    >
      {/* Katana backdrop with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.28 * p}px) scale(${1 + scrollY * 0.00018 * p})`,
        }}
      >
        <Image
          src="/images/hero-katana.png"
          alt="A Murakumo katana suspended against black lacquer, its edge tracing a line of gold light"
          fill
          priority
          className={`object-cover transition-all duration-[2200ms] ease-out ${
            loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      {/* Moving light reflection sweep across the blade */}
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, oklch(0.85 0.1 85 / 0.5) 50%, transparent 60%)',
            backgroundSize: '250% 100%',
          }}
          animate={{ backgroundPosition: ['150% 0%', '-150% 0%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        />
      )}

      {/* Drifting fog layers */}
      {!prefersReduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full opacity-40 blur-2xl"
            style={{
              background:
                'radial-gradient(60% 100% at 30% 100%, oklch(0.22 0.01 70 / 0.6), transparent 70%)',
            }}
            animate={{ x: ['-8%', '8%', '-8%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-full opacity-30 blur-2xl"
            style={{
              background:
                'radial-gradient(60% 100% at 70% 100%, oklch(0.25 0.02 80 / 0.5), transparent 70%)',
            }}
            animate={{ x: ['6%', '-6%', '6%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Vertical side labels */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block rotate-180 text-[10px] uppercase tracking-widest-xl text-muted-foreground [writing-mode:vertical-rl]">
          Est. Kamakura · 1287
        </span>
      </div>
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block text-[10px] uppercase tracking-widest-xl text-muted-foreground [writing-mode:vertical-rl]">
          手作り · Handforged
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ opacity: fade, transform: `translateY(${scrollY * -0.06 * p}px)` }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-xs uppercase tracking-widest-xl text-gold"
        >
          The Living Blade
        </motion.p>

        <h1 className="text-balance font-serif text-6xl font-light leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={loaded ? { y: '0%' } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Murakumo
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Heirloom katana, folded by hand over a thousand times. Where black
          lacquer, tempered steel, and gold become a single, silent gesture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#showcase"
              data-cursor
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:gap-5 hover:bg-gold-muted"
            >
              Enter the Showcase
              <span aria-hidden className="transition-transform">
                →
              </span>
            </a>
          </Magnetic>
          <a
            href="#craft"
            data-cursor
            className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 underline-offset-8 transition-colors hover:text-gold hover:underline"
          >
            The Craft
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity: fade }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest-xl text-muted-foreground">
            Scroll
          </span>
          <span className="h-12 w-px overflow-hidden bg-border">
            <span className="block h-1/2 w-full animate-[shimmer_2s_infinite] bg-gold" />
          </span>
        </div>
      </div>
    </section>
  )
}
