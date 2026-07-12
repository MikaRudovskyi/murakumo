'use client'

import { useState } from 'react'
import { Reveal } from '@/components/reveal'

const COLUMNS = [
  {
    title: 'Maison',
    links: ['Heritage', 'The Smiths', 'Atelier Visits', 'Journal'],
  },
  {
    title: 'Blades',
    links: ['Katana', 'Wakizashi', 'Tachi', 'Bespoke Commission'],
  },
  {
    title: 'Care',
    links: ['Maintenance', 'Authenticity', 'Shipping', 'Contact'],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative bg-background pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Newsletter */}
        <Reveal className="flex flex-col justify-between gap-10 border-b border-border/60 pb-20 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-md text-balance font-serif text-4xl font-light text-foreground sm:text-5xl">
              Join the private register
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Be the first to be notified when a new blade leaves the forge.
              We write rarely, and only when it matters.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setSent(true)
            }}
            className="flex w-full max-w-md items-center border-b border-border transition-colors focus-within:border-gold"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="whitespace-nowrap py-4 pl-4 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-muted"
            >
              {sent ? 'Received' : 'Subscribe'}
            </button>
          </form>
        </Reveal>

        {/* Links */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-4xl tracking-[0.2em] text-foreground">
              叢雲
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Murakumo — heirloom Japanese katana, handforged since 1287.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
                {col.title}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-10 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Murakumo. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-gold">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              京都 · Kyoto
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
