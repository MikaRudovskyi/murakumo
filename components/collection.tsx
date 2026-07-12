import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const PIECES = [
  {
    name: 'Kurogane',
    jp: '黒鉄',
    type: 'Tachi',
    price: '¥ 4,200,000',
    image: '/images/collection-1.png',
  },
  {
    name: 'Shirayuki',
    jp: '白雪',
    type: 'Wakizashi',
    price: '¥ 2,850,000',
    image: '/images/collection-2.png',
  },
  {
    name: 'Kinkō',
    jp: '金光',
    type: 'Katana',
    price: '¥ 5,600,000',
    image: '/images/collection-3.png',
  },
]

export function Collection() {
  return (
    <section
      id="collection"
      className="relative border-t border-border/60 bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-widest-xl text-gold">
                The Collection
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-xl text-balance font-serif text-4xl font-light text-foreground sm:text-5xl md:text-6xl">
                Each blade is made once, and never again
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A limited annual release of numbered pieces, accompanied by a
              certificate of authenticity from the master smith.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PIECES.map((piece, i) => (
            <Reveal key={piece.name} delay={i * 140}>
              <a
                href="#"
                className="group relative block overflow-hidden border border-border/60 bg-card transition-colors duration-500 hover:border-gold/50"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={piece.image || '/placeholder.svg'}
                    alt={`${piece.name}, a ${piece.type} from the Murakumo collection`}
                    fill
                    className="object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <span className="absolute right-5 top-5 flex size-10 items-center justify-center border border-gold/40 text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <span className="absolute left-5 top-5 font-serif text-3xl text-gold/70">
                    {piece.jp}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {piece.type}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-light text-foreground transition-colors group-hover:text-gold">
                      {piece.name}
                    </h3>
                  </div>
                  <p className="pb-1 text-sm text-muted-foreground">
                    {piece.price}
                  </p>
                </div>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
