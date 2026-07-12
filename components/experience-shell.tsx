'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Loader } from '@/components/loader'
import { Atmosphere } from '@/components/atmosphere'
import { CustomCursor } from '@/components/custom-cursor'
import { SoundToggle } from '@/components/sound-toggle'

/**
 * Client shell that plays the loading sequence, locks scroll while loading,
 * then fades the content in and mounts the global ambience (petals, cursor,
 * sound). Content stays server-rendered and is simply gated by opacity.
 */
export function ExperienceShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      <Atmosphere />
      <CustomCursor />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {!loading && <SoundToggle />}
    </>
  )
}
