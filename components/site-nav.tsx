'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/magnetic'

const LINKS = [
  { label: 'Showcase', href: '#showcase' },
  { label: 'Soul', href: '#soul' },
  { label: 'Museum', href: '#museum' },
  { label: 'Smith', href: '#smith' },
  { label: 'Collection', href: '#collection' },
  { label: 'Forge Yours', href: '#customize' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/60 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Murakumo home"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.25em] text-foreground">
            叢雲
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-widest-xl text-muted-foreground transition-colors group-hover:text-gold sm:inline">
            Murakumo
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        <Magnetic className="hidden md:inline-block">
          <a
            href="#collection"
            data-cursor
            className="group inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all duration-500 hover:bg-gold hover:text-primary-foreground"
          >
            Acquire
          </a>
        </Magnetic>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-4 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#collection"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center border border-gold/40 px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold"
          >
            Acquire
          </a>
        </div>
      </div>
    </header>
  )
}
