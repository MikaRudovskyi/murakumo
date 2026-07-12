import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const CHAPTERS = [
  {
    index: '01',
    kanji: '鍛錬',
    title: 'The Fold',
    image: '/images/forge.png',
    body: 'Tamahagane steel is heated to 1,300°C, hammered flat, and folded upon itself again and again. A thousand layers emerge — banishing impurity, weaving resilience into the very grain of the blade.',
    align: 'left' as const,
  },
  {
    index: '02',
    kanji: '刃文',
    title: 'The Hamon',
    image: '/images/blade-hamon.png',
    body: 'A clay slurry is painted along the spine before quenching. In the shock of cold water the edge hardens to glass while the body stays supple — leaving behind the hamon, a temper line as unique as a signature.',
    align: 'right' as const,
  },
  {
    index: '03',
    kanji: '装',
    title: 'The Mounting',
    image: '/images/tsuba.png',
    body: 'The tsuba guard is cast in patinated iron and inlaid with gold clouds and waves. Silk is wrapped by hand around the handle in the traditional tsukamaki, each diamond drawn taut and true.',
    align: 'left' as const,
  },
]

export function CraftStory() {
  return (
    <section id="craft" className="relative bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-widest-xl text-gold">
            The Making
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 text-balance font-serif text-4xl font-light text-foreground sm:text-5xl">
            Three chapters, one year of fire
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-28 px-6 lg:gap-40 lg:px-10">
        {CHAPTERS.map((chapter) => (
          <article
            key={chapter.index}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
              chapter.align === 'right' ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={chapter.image || '/placeholder.svg'}
                  alt={`${chapter.title} — a stage in forging a Murakumo katana`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <span className="absolute bottom-6 left-6 font-serif text-7xl font-light text-gold/80">
                  {chapter.index}
                </span>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className={chapter.align === 'right' ? 'lg:pr-8' : 'lg:pl-8'}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-serif text-4xl text-gold">
                    {chapter.kanji}
                  </span>
                  <span className="h-px w-12 bg-gold/40" />
                </div>
                <h3 className="font-serif text-4xl font-light text-foreground sm:text-5xl">
                  {chapter.title}
                </h3>
                <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                  {chapter.body}
                </p>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}
