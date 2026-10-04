'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles, Feather, Compass } from 'lucide-react'

const milestones = [
  {
    year: '2020',
    title: 'Conception & The Chennai Loom',
    description: 'Founded in Chennai with an uncompromising focus on relaxed, architectural tailoring in European dew-retted flax and raw silk.',
    image: '/images/real-craft.jpg'
  },
  {
    year: '2023',
    title: 'Heritage Weaving Alliances',
    description: 'Refined local sourcing with master handloom weavers in Tamil Nadu, securing single-source unbroken mulberry silk threads and natural horn closures.',
    image: '/images/real-shirt.jpg'
  },
  {
    year: '2026',
    title: 'The Contemporary Flagship',
    description: 'Every silhouette remains hand-cut and individually numbered in limited micro-batches of thirty to fifty pieces on Khader Nawaz Khan Road.',
    image: '/images/real-hero.jpg'
  }
]

export function StoryPage() {
  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen selection:bg-[#c9b293] selection:text-[#181716]">
      {/* Hero */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real-hero.jpg"
            alt="Aurora Studio"
            fill
            priority
            className="object-cover filter brightness-[0.52] contrast-[1.05]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/40 to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#c9b293]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181716]/80 backdrop-blur-md border border-[#3b3832] text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293]">
            <Sparkles className="w-3 h-3" />
            <span>Studio Philosophy &amp; Lineage</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#f4efe9] leading-[1.1] tracking-tight">
            Clothing crafted with <em>unhurried patience.</em>
          </h1>

          <p className="text-sm sm:text-base font-sans text-[#cfcac2] max-w-xl mx-auto leading-relaxed prose-readable">
            A wardrobe of considered silhouettes and tactile natural fibers, designed in our Chennai atelier.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#201f1c] border border-[#36342f] overflow-hidden rounded-t-[4rem] rounded-b-2xl shadow-2xl">
            <Image
              src="/images/real-dress.jpg"
              alt="Silk drape silhouette"
              fill
              className="object-cover filter brightness-[0.94]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c9b293] block">
                The Atelier Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] leading-tight">
                Quiet forms. <br />
                <em className="text-[#c9b293] font-normal italic">Enduring presence.</em>
              </h2>
            </div>

            <div className="space-y-4 text-sm font-sans text-[#cfcac2] leading-relaxed prose-readable">
              <p>
                We design pieces to move seamlessly with you across the day. Belgian flax that softens and gains luster with every cold wash, pure mulberry silk that contours naturally, and internal seams bound to endure for decades.
              </p>
              <p className="text-[#a7a297]">
                Rather than following seasonal calendar cycles, our garments are cut in micro-batches of thirty to fifty pieces. This allows our master tailors to preserve strict millimeter tolerances and ensure no excess inventory is created.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                <span>Explore The Wardrobe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-24 bg-[#1a1917] relative overflow-hidden" aria-labelledby="milestones-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block">
              Chronicle
            </span>
            <h2 id="milestones-heading" className="text-3xl sm:text-4xl font-serif text-[#f4efe9]">
              Studio Milestones
            </h2>
          </div>

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="p-6 sm:p-8 bg-[#201f1c]/90 border border-[#34322d] rounded-3xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-xl backdrop-blur-md"
              >
                <div className="sm:col-span-2 text-3xl font-serif text-[#c9b293] font-medium">
                  {m.year}
                </div>
                <div className="sm:col-span-4 relative aspect-[4/3] bg-[#181716] overflow-hidden rounded-2xl border border-[#312f2a]">
                  <Image src={m.image} alt={m.title} fill className="object-cover" sizes="220px" />
                </div>
                <div className="sm:col-span-6 space-y-2">
                  <h3 className="text-xl font-serif text-[#f4efe9]">{m.title}</h3>
                  <p className="text-xs sm:text-sm font-sans text-[#a7a297] leading-relaxed prose-readable">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
