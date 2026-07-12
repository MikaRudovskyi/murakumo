'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/**
 * Fullscreen cinematic loading sequence: black lacquer, an ink-brushed logo
 * reveal, drifting gold embers, and a "forging" progress bar. Calls onDone when
 * complete, then curtains away to reveal the hero.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exit, setExit] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setProgress(100)
      const t = window.setTimeout(() => {
        setExit(true)
        window.setTimeout(onDone, 300)
      }, 400)
      return () => window.clearTimeout(t)
    }

    let raf = 0
    let current = 0
    const startedAt = performance.now()
    const duration = 2600

    const tick = (now: number) => {
      const elapsed = now - startedAt
      // ease-out curve with a little irregular "hammering" jitter
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3)
      const jitter = Math.sin(elapsed / 90) * 1.4
      current = Math.min(100, eased * 100 + jitter)
      setProgress(Math.max(0, Math.round(current)))
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        window.setTimeout(() => setExit(true), 500)
        window.setTimeout(onDone, 1200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, prefersReduced])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background lacquer"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Gold embers */}
          {!prefersReduced && <Embers />}

          {/* Logo */}
          <div className="relative flex flex-col items-center">
            <motion.span
              className="ink-reveal font-serif text-7xl tracking-[0.3em] text-foreground sm:text-8xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              叢雲
            </motion.span>
            <motion.span
              className="mt-6 text-[10px] uppercase tracking-widest-xl text-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Murakumo
            </motion.span>
          </div>

          {/* Forging progress */}
          <div className="mt-14 w-64">
            <div className="relative h-px w-full overflow-hidden bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                style={{ width: `${progress}%` }}
              />
              {/* Traveling spark at the leading edge */}
              <motion.span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_4px_var(--gold)]"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Forging
              </span>
              <span className="font-serif text-sm text-gold tabular-nums">
                {progress.toString().padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Embers() {
  const embers = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {embers.map((i) => {
        const left = (i * 53) % 100
        const delay = (i % 6) * 0.5
        const dur = 4 + (i % 5)
        const size = 2 + (i % 3)
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              left: `${left}%`,
              bottom: '-10px',
              width: size,
              height: size,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -420, opacity: [0, 0.8, 0] }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}
