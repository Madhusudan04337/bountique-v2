'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, MessageSquare, Sparkles, Feather } from 'lucide-react'
import { useStore, formatMoney, initialProducts } from '@/lib/store'
import { AtelierButton, AtelierBadge, SectionHeader } from '@/components/ui-kit'

export function SplitShowcase() {
  const { products, addToCart, toggleWishlist, isWishlisted, setIsStylistDrawerOpen, setIsCartOpen } = useStore()
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileAngle, setMobileAngle] = useState<'studio' | 'detail'>('studio')

  const showcaseProducts = products && products.length >= 3 ? products.slice(0, 3) : initialProducts.slice(0, 3)
  const current = showcaseProducts[activeIndex] || showcaseProducts[0] || initialProducts[0]
  const wishlisted = isWishlisted(current.id)

  return (
    <section className="py-16 sm:py-24 bg-[#181716] relative overflow-hidden" aria-labelledby="signature-forms-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="mb-2">
              <AtelierBadge variant="gold">
                Split Runway Reel
              </AtelierBadge>
            </div>
            <h2 id="signature-forms-heading" className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#f4efe9]">
              The <em>signature</em> forms.
            </h2>
          </div>

          {/* Silhouette Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#201f1c]/90 backdrop-blur-md rounded-full border border-[#36342e] shadow-xl overflow-x-auto pb-0.5 scrollbar-none self-start sm:self-auto">
            {showcaseProducts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs font-mono rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeIndex === i
                    ? 'bg-[#c9b293] text-[#181716] font-semibold shadow-[0_0_15px_rgba(201,178,147,0.3)] scale-[1.02]'
                    : 'text-[#a7a297] hover:text-white hover:bg-[#282622]'
                }`}
              >
                0{i + 1} · {p.name.replace('The ', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
          {/* Left: Product Information & Purchase CTAs */}
          <div key={`info-${current.id}`} className="lg:col-span-5 space-y-5 lg:sticky lg:top-28 animate-in fade-in duration-300">
            <div className="p-5 sm:p-7 bg-gradient-to-b from-[#22211e]/95 via-[#1e1d1a]/90 to-[#191817] border border-[#38352f] rounded-3xl space-y-4 sm:space-y-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#8f8a81] mb-1">
                  <span className="uppercase tracking-wider">{current.category} · {current.origin}</span>
                  <span className="text-[#c9b293] font-medium">{current.batchNumber}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-serif text-[#f4efe9] leading-tight">
                  {current.name}
                </h3>
                <div className="flex items-baseline gap-2.5 mt-2 text-sm font-mono">
                  <span className="text-xl sm:text-2xl text-[#f4efe9] font-medium tabular-nums">
                    {formatMoney(current.price)}
                  </span>
                  {current.originalPrice && (
                    <span className="text-xs text-[#78736b] line-through">
                      {formatMoney(current.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-[#e89069] ml-auto">
                    Only {current.stockRemaining} left in edition
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#cfcac2] leading-relaxed prose-readable">
                {current.description}
              </p>

              {/* Craft Highlights */}
              <div className="p-3 sm:p-3.5 bg-[#181716]/80 border border-[#312f2a] rounded-2xl space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9b293] block">
                    {current.masterTailor} · {current.silhouetteFit}
                  </span>
                </div>
                <ul className="text-xs font-sans text-[#cfcac2] space-y-1">
                  {current.details && current.details.slice(0, 2).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#c9b293] mt-0.5">•</span>
                      <span className="truncate">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <div className="flex gap-2">
                  <AtelierButton
                    onClick={() => {
                      addToCart(current, 'S', current.color, 1)
                      setIsCartOpen(true)
                    }}
                    variant="primary"
                    size="md"
                    fullWidth
                  >
                    Quick Add Size S
                  </AtelierButton>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(current.id)}
                    className={`p-3 border rounded-full transition-all cursor-pointer shrink-0 ${
                      wishlisted
                        ? 'border-[#c9b293] bg-[#c9b293] text-[#181716]'
                        : 'border-[#38352f] bg-[#201f1c] text-[#a7a297] hover:text-white'
                    }`}
                    aria-label="Save piece"
                  >
                    <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>

                  <Link
                    href={`/product/${current.slug}`}
                    className="p-3 border border-[#38352f] bg-[#201f1c] hover:border-[#c9b293] rounded-full text-[#a7a297] hover:text-white transition-colors shrink-0 flex items-center justify-center"
                    aria-label="View piece details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStylistDrawerOpen(true)}
                  className="w-full py-2 px-3 bg-[#1e1d1a]/80 hover:bg-[#252420] border border-[#33312c] rounded-full text-[11px] font-mono text-[#c9b293] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Consult Head Stylist on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Dual Visual Showcase (Interactive angle switch on mobile, side-by-side on desktop) */}
          <div key={`img-${current.id}`} className="lg:col-span-7 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 relative">
            {/* Mobile View Toggle Switcher */}
            <div className="sm:hidden flex justify-center">
              <div className="inline-flex p-1 bg-[#201f1c] rounded-full border border-[#35332e] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMobileAngle('studio')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    mobileAngle === 'studio' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                  }`}
                >
                  Studio Angle
                </button>
                <button
                  type="button"
                  onClick={() => setMobileAngle('detail')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    mobileAngle === 'detail' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                  }`}
                >
                  Weave Detail
                </button>
              </div>
            </div>

            {/* Angle 1: Studio Silhouette */}
            <div className={`relative w-full h-[280px] sm:h-[400px] lg:h-[480px] bg-[#1d1c1a] rounded-tl-[3.5rem] sm:rounded-tl-[5rem] rounded-br-[3.5rem] sm:rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden border border-[#38352f] shadow-2xl group ${mobileAngle === 'detail' ? 'hidden sm:block' : 'block'}`}>
              <Image
                src={current.image}
                alt={current.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.93] contrast-[1.02]"
                sizes="(max-width: 640px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-5 px-2.5 py-0.5 bg-[#181716]/85 backdrop-blur-md rounded-full text-[9px] font-mono uppercase tracking-widest text-[#c9b293] border border-[#38352f]">
                Studio Silhouette
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white text-xs font-mono flex justify-between">
                <span>{current.fabric}</span>
                <span className="text-[#c9b293]">{current.color}</span>
              </div>
            </div>

            {/* Angle 2: Drape & Weave Detail */}
            <div className={`relative w-full h-[280px] sm:h-[400px] lg:h-[480px] bg-[#1d1c1a] rounded-tr-[3.5rem] sm:rounded-tr-[5rem] rounded-bl-[3.5rem] sm:rounded-bl-[5rem] rounded-tl-2xl rounded-br-2xl overflow-hidden border border-[#38352f] shadow-2xl sm:mt-10 group ${mobileAngle === 'studio' ? 'hidden sm:block' : 'block'}`}>
              <Image
                src={current.detailImage || current.image}
                alt={`${current.name} detail`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.93] contrast-[1.02]"
                sizes="(max-width: 640px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-5 px-2.5 py-0.5 bg-[#181716]/85 backdrop-blur-md rounded-full text-[9px] font-mono uppercase tracking-widest text-[#c9b293] border border-[#38352f]">
                Drape &amp; Weave Motion
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white text-xs font-mono flex justify-between">
                <span>French Seam Finishing</span>
                <span className="text-[#c9b293]">Batch #{current.batchNumber.slice(-2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
