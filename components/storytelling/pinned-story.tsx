'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const storyChapters = [
  {
    chapter: 'Chapter 01',
    title: 'The Loom & The Flax',
    subtitle: 'Kortrijk, Flanders to Coastal Tamil Nadu',
    text: 'Every yard of our unbleached linen begins in the historic rain-fed river valleys of Flanders. Grown without synthetic pesticides, the flax stalks are naturally water-retted before being spun into dense, breathable slub yarn.',
    image: '/images/real-linen-close.jpg',
    metric: '185 GSM Pure Flanders Flax',
  },
  {
    chapter: 'Chapter 02',
    title: 'Hand-Basted Craftsmanship',
    subtitle: 'Chennai Master Tailors',
    text: 'In our light-filled workshop, each blazer jacket canvas is hand-shaped with animal-free horsehair alternatives. Over forty-two separate pressing steps sculpt lapels that roll softly against the collarbone without stiff interfacings.',
    image: '/images/real-blazer.jpg',
    metric: '42 Hand-Pressing Steps',
  },
  {
    chapter: 'Chapter 03',
    title: 'True Bias Cut',
    subtitle: 'Mulberry Silk at 45 Degrees',
    text: 'Cutting at a true 45-degree angle releases the silk warp and weft, allowing garments to skim natural bodily curves like liquid water. We allow the cut panels to hang for 48 hours before final hemming to guarantee true drape.',
    image: '/images/real-dress.jpg',
    metric: '48hr Pre-Drape Hang Time',
  },
]

export function PinnedStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || typeof window === 'undefined' || window.innerWidth < 768) {
        // On mobile or reduced-motion, keep natural stacked layout
        return
      }

      const panels = gsap.utils.toArray<HTMLElement>('.story-chapter-card')
      if (panels.length <= 1) return

      // Sequential chapter reveals with unhurried transitions
      panels.forEach((panel, i) => {
        if (i === 0) return
        gsap.fromTo(
          panel,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.8,
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#2e2c28]/60 bg-[#181716]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="font-mono text-xs text-[#c9b293] uppercase tracking-[0.2em] mb-3">
            Atelier Chronicle · Handcrafted in Chennai
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f4efe9] tracking-tight">
            The Geometry of Slow Making
          </h2>
          <p className="mt-4 text-sm sm:text-base font-sans text-[#a7a297] leading-relaxed">
            Our garments do not follow wholesale seasonal calendars. Each piece is born from a quiet dialogue between handwoven fiber and the human frame.
          </p>
        </div>

        <div ref={pinTargetRef} className="space-y-12 sm:space-y-16">
          {storyChapters.map((ch, idx) => (
            <div
              key={ch.chapter}
              className="story-chapter-card rounded-2xl bg-[#21201d]/60 border border-[#373530]/80 p-6 sm:p-10 lg:p-12 transition-colors hover:border-[#524e47]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <span className="font-mono text-xs text-[#c9b293] tracking-widest uppercase">
                    {ch.chapter}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-serif text-[#f4efe9]">
                    {ch.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8a857d] uppercase tracking-wider mt-1 mb-4">
                    {ch.subtitle}
                  </p>
                  <p className="font-sans text-sm sm:text-base text-[#cfcac2] leading-relaxed">
                    {ch.text}
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#373530] flex items-center gap-3">
                    <span className="font-mono text-xs text-[#c9b293] bg-[#2a2824] px-3 py-1 rounded">
                      {ch.metric}
                    </span>
                  </div>
                </div>

                <div className={`lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-[#373530] ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={ch.image}
                    alt={ch.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
