'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Sparkles, Calendar, Compass, ShieldCheck } from 'lucide-react'
import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { ShopTheLookSection } from '@/components/shop-the-look'
import { SplitShowcase } from '@/components/split-showcase'
import { RunwayCarousel } from '@/components/runway-carousel'
import { EditorialPress } from '@/components/editorial-press'

const pillars = [
  {
    name: 'Tailoring',
    image: '/images/real-blazer.jpg',
    href: '/collection?category=Tailoring',
    count: 'Blazers & Structured Coats'
  },
  {
    name: 'Silk Dresses',
    image: '/images/real-dress.jpg',
    href: '/collection?category=Silk%20Dresses',
    count: 'Bias-Cut Slips & Evening Gowns'
  },
  {
    name: 'Tops & Shirts',
    image: '/images/real-shirt.jpg',
    href: '/collection?category=Tops%20%26%20Shirts',
    count: 'Poplin Cotton & Raw Silk'
  },
  {
    name: 'Bottoms',
    image: '/images/real-trouser.jpg',
    href: '/collection?category=Bottoms',
    count: 'Pleated Trousers & Fluid Skirts'
  }
]

export default function HomePage() {
  const { products, showToast, setIsSalonModalOpen, setIsProvenanceModalOpen } = useStore()
  const [activeTab, setActiveTab] = useState<'All' | 'Tailoring' | 'Silk Dresses' | 'Tops & Shirts' | 'Bottoms'>('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredProducts =
    activeTab === 'All' ? products : products.filter(p => p.category === activeTab)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    showToast('Privilege code: AURORA15')
    setEmail('')
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9]">
      {/* 1. CINEMATIC PARALLAX HERO (Page H1) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#292724] px-4 sm:px-6 lg:px-8 py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real-hero.jpg"
            alt="Aurora High Summer Editorial"
            fill
            priority
            className="object-cover object-[center_35%] filter brightness-[0.68] contrast-[1.05]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181716]/80 backdrop-blur-md border border-[#3b3832] text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293]">
              <Sparkles className="w-3 h-3" />
              <span>High Summer Edit / 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#f4efe9] leading-[1.06] tracking-tight">
              Quiet forms. <br />
              <em className="text-[#c9b293] font-normal italic">Sculpted drape.</em>
            </h1>

            <p className="text-sm sm:text-base font-sans text-[#cfcac2] max-w-md leading-relaxed">
              Belgian flax linen and raw mulberry silk, cut in unhurried limited editions inside our Chennai atelier.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-colors shadow-xl"
              >
                <span>Explore Silhouettes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsProvenanceModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#3d3a34] bg-[#201f1c]/70 hover:border-[#c9b293] text-xs font-mono text-[#f4efe9] rounded-full backdrop-blur-sm transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#c9b293]" />
                <span>Textile Provenance</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ATELIER COMMITMENTS & CLIENT PRIVILEGES (Distinct 4-column feature section) */}
      <section className="border-b border-[#292724] bg-[#1a1917] py-8 px-4 sm:px-6 lg:px-8" aria-label="Atelier Commitments">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#201f1c] border border-[#2e2c28]">
            <span className="w-8 h-8 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center shrink-0 text-xs font-mono">
              01
            </span>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">Chennai Atelier</h3>
              <p className="text-[11px] font-sans text-[#a7a297] mt-0.5 leading-snug">
                Hand-cut in limited micro-batches of thirty to fifty pieces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#201f1c] border border-[#2e2c28]">
            <span className="w-8 h-8 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center shrink-0 text-xs font-mono">
              02
            </span>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">Pure Natural Fibers</h3>
              <p className="text-[11px] font-sans text-[#a7a297] mt-0.5 leading-snug">
                100% Belgian dew-retted flax and unbroken mulberry silk.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#201f1c] border border-[#2e2c28]">
            <span className="w-8 h-8 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center shrink-0 text-xs font-mono">
              03
            </span>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">Archival Unboxing</h3>
              <p className="text-[11px] font-sans text-[#a7a297] mt-0.5 leading-snug">
                Rigid cedarwood presentation box and linen dust cover included.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#201f1c] border border-[#2e2c28]">
            <span className="w-8 h-8 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center shrink-0 text-xs font-mono">
              04
            </span>
            <div>
              <button
                type="button"
                onClick={() => setIsSalonModalOpen(true)}
                className="text-left group"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] group-hover:underline">
                  Private Salon Fitting →
                </h3>
                <p className="text-[11px] font-sans text-[#a7a297] mt-0.5 leading-snug">
                  Personal appointments on Khader Nawaz Khan Road.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE FEATURE: SHOP THE LOOK (H2) */}
      <ShopTheLookSection />

      {/* 4. SPLIT-SCREEN RUNWAY SHOWCASE (H2) */}
      <SplitShowcase />

      {/* 5. 4-PILLAR CATALOG SHOWCASE (H2 -> H3) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="pillars-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block mb-1">
              Curated Wardrobe Pillars
            </span>
            <h2 id="pillars-heading" className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
              The four <em>foundations.</em>
            </h2>
          </div>
          <Link
            href="/collection"
            className="text-xs font-mono uppercase tracking-wider text-[#c9b293] hover:text-[#f4efe9] flex items-center gap-1.5"
          >
            <span>View complete catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="transition-transform duration-300 hover:-translate-y-1.5"
            >
              <Link
                href={pillar.href}
                className="group relative block w-full h-[380px] sm:h-[440px] bg-[#201f1c] border border-[#35332e] hover:border-[#c9b293]/60 rounded-t-[4rem] rounded-b-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.92]"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono uppercase text-[#c9b293] block">
                    {pillar.count}
                  </span>
                  <h3 className="text-xl font-serif">{pillar.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE RUNWAY DRAG CAROUSEL (H2 -> H3) */}
      <RunwayCarousel />

      {/* 7. TEXTILE PROVENANCE & SALON INVITATION (H2 -> H3) */}
      <section className="py-24 bg-[#191817] border-y border-[#292724]" aria-labelledby="atelier-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-1">
              Atelier &amp; Salon
            </span>
            <h2 id="atelier-services-heading" className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
              Craft provenance and salon fittings.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Provenance Card (H3) */}
            <div className="p-8 sm:p-10 bg-[#21201d] border border-[#35332e] rounded-[2.5rem] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                  Material Provenance
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe9]">
                  Belgian Flax &amp; Sandwashed Silk
                </h3>
                <p className="text-sm font-sans text-[#a7a297] leading-relaxed">
                  Every thread is traced directly to its origin. European dew-retted flax and Tamil Nadu filament silk, constructed with french seams and natural horn buttons.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsProvenanceModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c9b293] hover:underline"
                >
                  <span>Explore Textile Archives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Salon Fitting Card (H3) */}
            <div className="p-8 sm:p-10 bg-[#21201d] border border-[#35332e] rounded-[2.5rem] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                  Private Salon
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe9]">
                  Khader Nawaz Khan Salon, Chennai
                </h3>
                <p className="text-sm font-sans text-[#a7a297] leading-relaxed">
                  Reserve a private fitting session with our master tailor. Experience fabric weights in person and receive personalized bespoke adjustments.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsSalonModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Fitting Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL & CLIENT ACCLAIM */}
      <EditorialPress />

      {/* 9. PRIVATE CIRCLE NEWSLETTER (H2) */}
      <section className="py-24 bg-[#141312]" aria-labelledby="newsletter-heading">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293]">
            The Aurora Circle
          </span>
          <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-serif text-[#f4efe9]">
            Receive private editions &amp; notes.
          </h2>
          <p className="text-xs font-sans text-[#8f8a82]">
            Enjoy 15% off your initial order with code <strong>AURORA15</strong>.
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#201f1c] border border-[#c9b293]/40 text-xs font-mono text-[#c9b293] rounded-xl">
              Welcome to the circle. Privilege code: <strong>AURORA15</strong>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Client email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#201f1c] border border-[#373530] text-white font-mono text-xs focus:outline-none focus:border-[#c9b293] rounded-full"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#dfcaa8] rounded-full transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
