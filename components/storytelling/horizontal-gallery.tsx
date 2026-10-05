'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const editorialStories = [
  {
    title: 'The Linen Dispatch: Seasonality Without Waste',
    edition: 'Journal 01 · May 2026',
    excerpt: 'Examining unhurried production runs and natural vegetable dyes extracted from madder root and indigo vat fermentation.',
    image: '/images/real-linen-close.jpg',
    readTime: '4 min read',
    slug: 'linen-dispatch',
  },
  {
    title: 'Anatomy of the 45° Bias Cut Slip',
    edition: 'Journal 02 · June 2026',
    excerpt: 'Why Madeleine Vionnet’s geometric breakthrough remains the holy grail for natural mulberry silk drape.',
    image: '/images/real-dress.jpg',
    readTime: '6 min read',
    slug: 'anatomy-of-bias-cut',
  },
  {
    title: 'Tailoring in Coastal Heat: Breathable Canvas Interfacings',
    edition: 'Journal 03 · July 2026',
    excerpt: 'Balancing European architectural shoulder construction with equatorial climate respiration.',
    image: '/images/real-blazer.jpg',
    readTime: '5 min read',
    slug: 'coastal-tailoring',
  },
]

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || typeof window === 'undefined' || window.innerWidth < 1024) {
        // Native horizontal overflow scroll for tablet and mobile
        return
      }

      const track = trackRef.current
      if (!track) return

      const totalScroll = track.scrollWidth - track.clientWidth
      if (totalScroll <= 0) return

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.0,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#1e1d1a] border-t border-b border-[#2e2c28] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#c9b293] uppercase tracking-[0.2em]">
            AURORA Dispatch · Summer 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] mt-2">
            The Atelier Journal
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#a7a297] max-w-sm">
          Essays on textile conservation, zero-overproduction philosophy, and bespoke tailoring methods.
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {editorialStories.map((story) => (
          <article
            key={story.slug}
            className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[440px] rounded-2xl bg-[#252420] border border-[#373530] p-6 flex flex-col justify-between group hover:border-[#524e47] transition-colors"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-[#373530]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 300px, 440px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 right-3 font-mono text-[10px] bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[#c9b293] border border-white/10">
                  {story.readTime}
                </span>
              </div>

              <span className="font-mono text-[11px] text-[#a7a297] uppercase tracking-wider block mb-2">
                {story.edition}
              </span>

              <h3 className="text-xl sm:text-2xl font-serif text-[#f4efe9] group-hover:text-[#c9b293] transition-colors leading-snug">
                {story.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#cfcac2] mt-3 leading-relaxed">
                {story.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#373530] flex items-center justify-between">
              <span className="font-sans text-xs text-[#a7a297] group-hover:text-[#f4efe9] transition-colors flex items-center gap-1">
                Read Publication <ArrowUpRight className="w-3.5 h-3.5 text-[#c9b293]" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
