'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, MessageSquare } from 'lucide-react'
import { useStore, formatMoney, initialProducts } from '@/lib/store'

export function SplitShowcase() {
  const { products, addToCart, toggleWishlist, isWishlisted, setIsStylistDrawerOpen } = useStore()
  const [activeIndex, setActiveIndex] = useState(0)

  const showcaseProducts = products && products.length >= 3 ? products.slice(0, 3) : initialProducts.slice(0, 3)
  const current = showcaseProducts[activeIndex] || showcaseProducts[0] || initialProducts[0]
  const wishlisted = isWishlisted(current.id)

  return (
    <section className="py-24 bg-[#181716] border-b border-[#292724] relative overflow-hidden" aria-labelledby="signature-forms-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-1">
            Split Runway Reel
          </span>
          <h2 id="signature-forms-heading" className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
            The <em>signature</em> forms.
          </h2>
        </div>

        {/* Silhouette Selector Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#201f1c] rounded-full border border-[#33312c] w-fit shadow-lg">
            {showcaseProducts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`px-5 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
                  activeIndex === i
                    ? 'bg-[#c9b293] text-[#181716] font-semibold shadow-md'
                    : 'text-[#a7a297] hover:text-white hover:bg-[#282622]'
                }`}
              >
                0{i + 1} · {p.name.replace('The ', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Narrative & Specifications */}
          <div key={`info-${current.id}`} className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#8f8a81] mb-1">
                  <span className="uppercase tracking-wider">{current.category} · {current.origin}</span>
                  <span className="text-[#c9b293] font-medium">{current.batchNumber}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] leading-tight">
                  {current.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2 text-sm font-mono">
                  <span className="text-2xl text-[#f4efe9] font-medium tabular-nums">
                    {formatMoney(current.price)}
                  </span>
                  {current.originalPrice && (
                    <span className="text-xs text-[#78736b] line-through">
                      {formatMoney(current.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-[#e89069] ml-auto">
                    Only {current.stockRemaining} remain in this edition
                  </span>
                </div>
              </div>

              <p className="text-sm font-sans text-[#a7a297] leading-relaxed">
                {current.description}
              </p>

              {/* Craft Highlights */}
              <div className="p-4 bg-[#201f1c] border border-[#33312c] rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9b293] block">
                    Garment Construction · {current.masterTailor}
                  </span>
                  <span className="text-[10px] font-mono text-[#8a857d]">
                    {current.silhouetteFit}
                  </span>
                </div>
                <ul className="text-xs font-sans text-[#cfcac2] space-y-1.5">
                  {current.details && current.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c9b293] mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(current, 'S', current.color, 1)}
                    className="flex-1 py-3.5 px-6 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-widest font-semibold rounded-full transition-colors text-center shadow-lg cursor-pointer"
                  >
                    Quick Add Size S
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(current.id)}
                    className={`p-3.5 border rounded-full transition-all cursor-pointer ${
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
                    className="p-3.5 border border-[#38352f] bg-[#201f1c] hover:border-[#c9b293] rounded-full text-[#a7a297] hover:text-white transition-colors"
                    aria-label="View piece details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStylistDrawerOpen(true)}
                  className="w-full py-2.5 px-4 bg-[#1e1d1a] hover:bg-[#252420] border border-[#33312c] rounded-full text-xs font-mono text-[#c9b293] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Have questions on fit? Consult Head Stylist on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Sculpted Imagery */}
          <div key={`img-${current.id}`} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Look angle 1 (Arch Top) */}
            <div className="relative w-full h-[420px] sm:h-[520px] bg-[#1d1c1a] rounded-t-[4rem] rounded-b-2xl overflow-hidden border border-[#36342f] shadow-2xl">
              <Image
                src={current.image}
                alt={current.name}
                fill
                priority
                className="object-cover filter brightness-[0.93] contrast-[1.02]"
                sizes="(max-width: 640px) 100vw, 35vw"
              />
              <div className="absolute top-4 left-5 px-3 py-1 bg-[#181716]/85 backdrop-blur-sm rounded-full text-[9px] font-mono uppercase tracking-widest text-[#c9b293] border border-[#33312c]">
                Studio Angle
              </div>
            </div>

            {/* Look angle 2 (Inverse Arch Bottom) */}
            <div className="relative w-full h-[420px] sm:h-[520px] bg-[#1d1c1a] rounded-b-[4rem] rounded-t-2xl overflow-hidden border border-[#36342f] shadow-2xl sm:mt-10">
              <Image
                src={current.detailImage || current.image}
                alt={`${current.name} detail`}
                fill
                className="object-cover filter brightness-[0.93] contrast-[1.02]"
                sizes="(max-width: 640px) 100vw, 35vw"
              />
              <div className="absolute bottom-4 left-5 px-3 py-1 bg-[#181716]/85 backdrop-blur-sm rounded-full text-[9px] font-mono uppercase tracking-widest text-[#c9b293] border border-[#33312c]">
                Drape Motion
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
