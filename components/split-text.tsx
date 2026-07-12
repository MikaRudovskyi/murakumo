'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

type SplitTextProps = {
  text: string
  className?: string
  /** delay before the sequence starts (s) */
  delay?: number
  /** stagger between words (s) */
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  once?: boolean
}

const wordVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%' },
}

/**
 * Splits text into words that rise from behind a mask, one after another.
 * Falls back to a plain fade when reduced-motion is requested.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  as = 'span',
  once = true,
}: SplitTextProps) {
  const prefersReduced = useReducedMotion()
  const words = text.split(' ')
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <MotionTag
      className={cn('inline-flex flex-wrap', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.25em] inline-block overflow-hidden py-[0.05em]">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
