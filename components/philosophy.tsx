import { Reveal } from '@/components/reveal'

export function Philosophy() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card py-28 lg:py-40 lacquer">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span
            aria-hidden
            className="font-serif text-6xl leading-none text-gold/50"
          >
            &ldquo;
          </span>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-4 text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl">
            The blade reflects the one who forged it. To temper steel is to
            temper the self — nothing hurried, nothing wasted, nothing false.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="h-px w-16 gold-line" />
            <p className="text-xs uppercase tracking-widest-xl text-gold">
              Takeshi Murakumo
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              27th Master Smith
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
