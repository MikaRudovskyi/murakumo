'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Optional ambient sound, synthesised with the Web Audio API (no asset needed):
 * a low drone + slow-breathing filtered noise evoking a still temple hall.
 * Defaults to off; user opts in. A soft "unsheathe" swell plays on enable.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<AudioNode[]>([])

  const teardown = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try {
        // @ts-expect-error stop exists on source nodes
        n.stop?.()
        n.disconnect()
      } catch {
        /* noop */
      }
    })
    nodesRef.current = []
  }, [])

  const start = useCallback(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    const ctx = ctxRef.current ?? new AudioCtx()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, ctx.currentTime)
    master.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2.5)
    master.connect(ctx.destination)
    masterRef.current = master

    // Two detuned low drones (a hushed perfect fifth)
    const freqs = [110, 164.81]
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      const g = ctx.createGain()
      g.gain.value = i === 0 ? 0.5 : 0.28
      // slow tremolo
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.08 + i * 0.03
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.12
      lfo.connect(lfoGain).connect(g.gain)
      osc.connect(g).connect(master)
      osc.start()
      lfo.start()
      nodesRef.current.push(osc, lfo)
    })

    // Breathing filtered noise (wind through the hall)
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 480
    bp.Q.value = 0.6
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.05
    const breathe = ctx.createOscillator()
    breathe.frequency.value = 0.06
    const breatheGain = ctx.createGain()
    breatheGain.gain.value = 0.04
    breathe.connect(breatheGain).connect(noiseGain.gain)
    noise.connect(bp).connect(noiseGain).connect(master)
    noise.start()
    breathe.start()
    nodesRef.current.push(noise, breathe)

    // Unsheathe swell
    const swell = ctx.createOscillator()
    swell.type = 'triangle'
    swell.frequency.setValueAtTime(300, ctx.currentTime)
    swell.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.5)
    const swellGain = ctx.createGain()
    swellGain.gain.setValueAtTime(0.0001, ctx.currentTime)
    swellGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.15)
    swellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)
    swell.connect(swellGain).connect(master)
    swell.start()
    swell.stop(ctx.currentTime + 1.3)

    void ctx.resume()
  }, [])

  const stop = useCallback(() => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (ctx && master) {
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6)
      window.setTimeout(teardown, 700)
    } else {
      teardown()
    }
  }, [teardown])

  const toggle = () => {
    setOn((prev) => {
      const next = !prev
      if (next) start()
      else stop()
      return next
    })
  }

  useEffect(() => () => teardown(), [teardown])

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor
      aria-pressed={on}
      aria-label={on ? 'Mute ambience' : 'Play ambience'}
      className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 border border-gold/40 bg-background/60 px-4 py-3 backdrop-blur-md transition-colors duration-500 hover:border-gold hover:bg-background/80"
    >
      <span className="flex h-3 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-gold transition-all duration-300"
            style={{
              height: on ? undefined : '3px',
              animation: on
                ? `sound-bar 900ms ${i * 120}ms ease-in-out infinite`
                : 'none',
            }}
          />
        ))}
      </span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
        {on ? 'Sound On' : 'Sound Off'}
      </span>
      <style>{`
        @keyframes sound-bar {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }
      `}</style>
    </button>
  )
}
