import { Reveal } from '@/components/reveal'

export function Heritage() {
  return (
    <section
      id="heritage"
      className="relative mx-auto max-w-5xl px-6 py-28 text-center lg:py-40"
    >
      <Reveal>
        <span className="font-serif text-3xl text-gold">一期一会</span>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-6 text-xs uppercase tracking-widest-xl text-muted-foreground">
          Ichigo Ichie — One encounter, one chance
        </p>
      </Reveal>
      <Reveal delay={200}>
        <h2 className="mx-auto mt-10 max-w-4xl text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
          A katana is not manufactured. It is{' '}
          <span className="italic text-gold">summoned</span> — from fire, water,
          and the patience of a single hand.
        </h2>
      </Reveal>
      <Reveal delay={320}>
        <p className="mx-auto mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          For seven centuries the Murakumo lineage has forged blades in the
          shadow of the mountains. Each sword takes the better part of a year,
          shaped through thousands of deliberate strokes until steel and spirit
          become inseparable.
        </p>
      </Reveal>

      <Reveal delay={420} className="mt-16 flex items-center justify-center">
        <span className="h-px w-24 gold-line" />
      </Reveal>
    </section>
  )
}
