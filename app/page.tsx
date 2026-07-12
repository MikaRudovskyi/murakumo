import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Heritage } from '@/components/heritage'
import { KatanaShowcase } from '@/components/katana-showcase'
import { CraftStory } from '@/components/craft-story'
import { Philosophy } from '@/components/philosophy'
import { Collection } from '@/components/collection'
import { SiteFooter } from '@/components/site-footer'
import { ExperienceShell } from '@/components/experience-shell'

export default function Page() {
  return (
    <ExperienceShell>
      <main className="relative min-h-svh bg-background">
        <SiteNav />
        <Hero />
        <Heritage />
        <KatanaShowcase />
        <CraftStory />
        <Philosophy />
        <Collection />
        <SiteFooter />
      </main>
    </ExperienceShell>
  )
}
