'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const milestones = [
  {
    year: '2020',
    title: 'Conception',
    description: 'Began in Chennai with a focus on relaxed, architectural tailoring in Belgian flax.',
    image: '/images/real-craft.jpg'
  },
  {
    year: '2023',
    title: 'Raw Silk & Linen',
    description: 'Refined local sourcing with heritage handloom weavers and unadulterated threads.',
    image: '/images/real-shirt.jpg'
  },
  {
    year: '2026',
    title: 'The Modern Studio',
    description: 'Every garment remains numbered and cut in limited micro-batches of thirty to fifty.',
    image: '/images/real-hero.jpg'
  }
]

export function StoryPage() {
  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-[#292724]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real-hero.jpg"
            alt="Aurora Studio"
            fill
            priority
            className="object-cover filter brightness-[0.5]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293]">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#f4efe9]">
            Clothing made with <em>patience.</em>
          </h1>
          <p className="text-sm font-sans text-[#cfcac2] max-w-md mx-auto">
            A wardrobe of considered silhouettes and tactile natural fibers, designed in Chennai.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 relative aspect-[4/3] bg-[#201f1c] border border-[#2f2d29] overflow-hidden rounded-sm">
            <Image
              src="/images/real-dress.jpg"
              alt="Silk silhouette"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="md:col-span-6 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293]">
              The approach
            </span>
            <h2 className="text-3xl font-serif text-[#f4efe9]">
              Quiet forms. <br />
              <em className="text-[#c9b293]">Enduring presence.</em>
            </h2>
            <p className="text-sm font-sans text-[#a7a299] leading-relaxed">
              We design pieces to move with you through the day. Linen that softens with washing, pure silk that drapes naturally, and seams constructed to last for years.
            </p>
            <div className="pt-2">
              <Link
                href="/collection"
                className="text-xs font-mono uppercase tracking-widest text-[#c9b293] hover:underline"
              >
                View collection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-[#1d1c1a] border-y border-[#292724]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <h2 className="text-2xl font-serif text-[#f4efe9] text-center">Studio milestones</h2>

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center border-b border-[#2b2926] pb-6"
              >
                <div className="sm:col-span-2 text-2xl font-serif text-[#c9b293]">
                  {m.year}
                </div>
                <div className="sm:col-span-4 relative aspect-[4/3] bg-[#22211e] overflow-hidden rounded-sm">
                  <Image src={m.image} alt={m.title} fill className="object-cover" sizes="160px" />
                </div>
                <div className="sm:col-span-6 space-y-1">
                  <h3 className="text-lg font-serif text-[#f4efe9]">{m.title}</h3>
                  <p className="text-xs font-sans text-[#9c978f] leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
