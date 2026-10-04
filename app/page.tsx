'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Sparkles, Calendar, Compass, ShieldCheck, Feather, Award } from 'lucide-react'
import { useStore } from '@/lib/store'
import { ShopTheLookSection } from '@/components/shop-the-look'
import { SplitShowcase } from '@/components/split-showcase'
import { RunwayCarousel } from '@/components/runway-carousel'
import { EditorialPress } from '@/components/editorial-press'
import { AtelierButton, AtelierBadge, SectionHeader, OrganicCard } from '@/components/ui-kit'

const pillars = [
  {
    name: 'Tailoring',
    image: '/images/real-blazer.jpg',
    href: '/collection?category=Tailoring',
    count: 'Blazers & Coats',
    accent: 'Hand-basted canvas'
  },
  {
    name: 'Silk Dresses',
    image: '/images/real-dress.jpg',
    href: '/collection?category=Silk%20Dresses',
    count: 'Bias-Cut Slips',
    accent: '45° True bias contour'
  },
  {
    name: 'Tops & Shirts',
    image: '/images/real-shirt.jpg',
    href: '/collection?category=Tops%20%26%20Shirts',
    count: 'Poplin & Raw Silk',
    accent: 'Mother-of-pearl buttons'
  },
  {
    name: 'Bottoms',
    image: '/images/real-trouser.jpg',
    href: '/collection?category=Bottoms',
    count: 'Pleated Trousers',
    accent: 'Fluid high-rise drape'
  }
]

export default function HomePage() {
  const { showToast, setIsSalonModalOpen, setIsProvenanceModalOpen } = useStore()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    showToast('Privilege code: AURORA15')
    setEmail('')
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9] overflow-x-hidden selection:bg-[#c9b293] selection:text-[#181716]">
      {/* 1. CINEMATIC HERO (Page H1 with Organic Curved Bottom Wave) */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pb-28">
        {/* Background Image with Layered Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real-hero.jpg"
            alt="Aurora High Summer Editorial"
            fill
            priority
            className="object-cover object-[center_35%] filter brightness-[0.68] contrast-[1.05]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/30 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-xl space-y-5 sm:space-y-6"
          >
            <div>
              <AtelierBadge variant="gold" icon={Sparkles}>
                High Summer Edit · 2026
              </AtelierBadge>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#f4efe9] leading-[1.06] tracking-tight">
              Quiet forms. <br />
              <em className="text-[#c9b293] font-normal italic">Sculpted drape.</em>
            </h1>

            <p className="text-sm sm:text-base font-sans text-[#cfcac2] max-w-md leading-relaxed prose-readable">
              Belgian flax linen and raw mulberry silk, cut in unhurried limited editions inside our Chennai atelier.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <AtelierButton
                href="/collection"
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                Explore Silhouettes
              </AtelierButton>

              <AtelierButton
                onClick={() => setIsProvenanceModalOpen(true)}
                variant="glass"
                size="lg"
                icon={Compass}
                iconPosition="left"
              >
                Textile Provenance
              </AtelierButton>
            </div>
          </motion.div>
        </div>

      </section>

      {/* 2. ATELIER COMMITMENTS & CLIENT PRIVILEGES (Compact 2x2 on Mobile / 4-Col on Desktop) */}
      <section className="relative bg-[#1a1917] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 -mt-1" aria-label="Atelier Commitments">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#21201d]/90 via-[#252320]/80 to-[#21201d]/90 border border-[#36332d]/80 p-4 sm:p-6 lg:p-8 backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 lg:divide-x lg:divide-[#33312c]">
              <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-1.5 sm:p-2">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c9b293]/25 to-[#c9b293]/5 text-[#c9b293] border border-[#c9b293]/30 flex items-center justify-center shrink-0 text-[11px] sm:text-xs font-mono font-semibold shadow-inner">
                  01
                </span>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#f4efe9] font-medium">Chennai Atelier</h3>
                  <p className="text-[11px] sm:text-xs font-sans text-[#a7a297] mt-0.5 sm:mt-1 leading-relaxed">
                    Hand-cut in micro-batches of thirty to fifty pieces.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-1.5 sm:p-2 lg:pl-8">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c9b293]/25 to-[#c9b293]/5 text-[#c9b293] border border-[#c9b293]/30 flex items-center justify-center shrink-0 text-[11px] sm:text-xs font-mono font-semibold shadow-inner">
                  02
                </span>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#f4efe9] font-medium">Natural Fibers</h3>
                  <p className="text-[11px] sm:text-xs font-sans text-[#a7a297] mt-0.5 sm:mt-1 leading-relaxed">
                    100% Belgian flax and unbroken mulberry silk.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-1.5 sm:p-2 lg:pl-8">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c9b293]/25 to-[#c9b293]/5 text-[#c9b293] border border-[#c9b293]/30 flex items-center justify-center shrink-0 text-[11px] sm:text-xs font-mono font-semibold shadow-inner">
                  03
                </span>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#f4efe9] font-medium">Archival Unboxing</h3>
                  <p className="text-[11px] sm:text-xs font-sans text-[#a7a297] mt-0.5 sm:mt-1 leading-relaxed">
                    Cedarwood presentation box and linen dust cover.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-1.5 sm:p-2 lg:pl-8">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c9b293]/25 to-[#c9b293]/5 text-[#c9b293] border border-[#c9b293]/30 flex items-center justify-center shrink-0 text-[11px] sm:text-xs font-mono font-semibold shadow-inner">
                  04
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsSalonModalOpen(true)}
                    className="text-left group cursor-pointer"
                  >
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] group-hover:underline flex items-center gap-1.5">
                      <span>Salon Fitting</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-[11px] sm:text-xs font-sans text-[#a7a297] mt-0.5 sm:mt-1 leading-relaxed">
                      Appointments on Khader Nawaz Khan Road.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. SIGNATURE FEATURE: SHOP THE LOOKBOOK CANVAS (H2) */}
      <ShopTheLookSection />

      {/* 4. SPLIT-SCREEN RUNWAY SHOWCASE (H2) */}
      <SplitShowcase />

      {/* 5. 4-PILLAR CATALOG SHOWCASE (Organic Arched Foundations) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" aria-labelledby="pillars-heading">
        <SectionHeader
          kicker="Curated Wardrobe Pillars"
          title={<>The four <em className="text-[#c9b293] font-normal italic">foundations.</em></>}
          actionHref="/collection"
          actionLabel="View complete catalog"
        />

        {/* 4 Pillars in 2-Col Mobile / 4-Col Desktop Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group"
            >
              <Link
                href={pillar.href}
                className="relative block w-full h-[240px] sm:h-[360px] lg:h-[440px] bg-[#201f1c] border border-[#38352f] hover:border-[#c9b293]/70 rounded-t-[3rem] sm:rounded-t-[4.5rem] rounded-b-2xl sm:rounded-b-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1.5"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.92]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/20 to-transparent pointer-events-none" />

                <div className="hidden sm:block absolute top-5 right-5 px-2.5 py-1 bg-[#181716]/85 backdrop-blur-md rounded-full border border-[#38352f] text-[9px] font-mono text-[#c9b293] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {pillar.accent}
                </div>

                <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 text-white space-y-0.5 sm:space-y-1">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#c9b293] block truncate">
                    {pillar.count}
                  </span>
                  <h3 className="text-base sm:text-xl font-serif">{pillar.name}</h3>
                  <div className="hidden sm:flex pt-1 items-center gap-1 text-[10px] font-mono text-[#a7a297] group-hover:text-white transition-colors">
                    <span>Explore silhouette</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE RUNWAY CAROUSEL */}
      <RunwayCarousel />

      {/* 7. TEXTILE PROVENANCE & SALON INVITATION */}
      <section className="relative py-20 sm:py-28 bg-[#191817] overflow-hidden" aria-labelledby="atelier-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            align="center"
            kicker="Atelier &amp; Private Salon"
            title="Craft provenance and salon fittings."
            description="Experience uncompromised European linen, unbroken mulberry silk, and private consultations in Chennai."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Provenance Sculpted Portal */}
            <OrganicCard contour="arch-diagonal" className="p-6 sm:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 group hover:border-[#c9b293]/50 transition-all duration-300">
              <div className="space-y-3 sm:space-y-4">
                <AtelierBadge variant="gold">
                  Material Provenance &amp; Weaving
                </AtelierBadge>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe9] leading-tight">
                  Belgian Flax &amp; Sandwashed Silk
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#a7a297] leading-relaxed prose-readable">
                  Every thread is traced directly to its origin. European dew-retted flax and Tamil Nadu filament silk, constructed with french seams, bound internal edges, and natural horn buttons.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsProvenanceModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c9b293] group-hover:text-white transition-colors cursor-pointer"
                >
                  <span className="border-b border-[#c9b293]/40 pb-0.5">Explore Textile Archives</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </OrganicCard>

            {/* Salon Fitting Sculpted Portal */}
            <OrganicCard contour="pill" className="p-6 sm:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 group hover:border-[#c9b293]/50 transition-all duration-300">
              <div className="space-y-3 sm:space-y-4">
                <AtelierBadge variant="gold">
                  Flagship Appointments
                </AtelierBadge>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe9] leading-tight">
                  Khader Nawaz Khan Salon, Chennai
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#a7a297] leading-relaxed prose-readable">
                  Reserve a private fitting session with our master tailor. Experience fabric weights in person, receive silhouette consultations, and arrange bespoke hemline adjustments.
                </p>
              </div>

              <div>
                <AtelierButton
                  onClick={() => setIsSalonModalOpen(true)}
                  variant="primary"
                  size="sm"
                  icon={Calendar}
                  iconPosition="left"
                >
                  Reserve Fitting Appointment
                </AtelierButton>
              </div>
            </OrganicCard>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL & CLIENT ACCLAIM */}
      <EditorialPress />

      {/* 9. PRIVATE CIRCLE NEWSLETTER */}
      <section className="py-20 sm:py-24 bg-[#141312] relative overflow-hidden" aria-labelledby="newsletter-heading">
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <OrganicCard contour="pill" glow className="p-6 sm:p-12 text-center space-y-5">
            <AtelierBadge variant="gold">
              The Aurora Circle
            </AtelierBadge>
            <h2 id="newsletter-heading" className="text-2xl sm:text-4xl font-serif text-[#f4efe9]">
              Receive private editions &amp; notes.
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#a7a297] max-w-md mx-auto leading-relaxed">
              Enjoy 15% off your initial order with atelier privilege code <strong>AURORA15</strong>.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#201f1c] border border-[#c9b293]/40 text-xs font-mono text-[#c9b293] rounded-2xl animate-in fade-in">
                Welcome to the circle. Privilege code: <strong>AURORA15</strong>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Client email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#181716] border border-[#38352f] text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-[#c9b293] rounded-full placeholder:text-[#68645c]"
                />
                <AtelierButton type="submit" variant="primary" size="md">
                  Join Circle
                </AtelierButton>
              </form>
            )}
          </OrganicCard>
        </div>
      </section>
    </main>
  )
}
