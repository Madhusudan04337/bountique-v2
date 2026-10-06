'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Plus, Check, Sparkles } from 'lucide-react'
import { useStore, formatMoney, initialProducts } from '@/lib/store'
import { AtelierBadge } from '@/components/ui-kit'

export function RunwayCarousel() {
  const { products, addToCart } = useStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [justAddedId, setJustAddedId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const items = products && products.length > 0 ? products : initialProducts

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll, { passive: true })
      return () => ref.removeEventListener('scroll', checkScroll)
    }
  }, [items])

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 300
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

      if (direction === 'right') {
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft + cardWidth, behavior: 'smooth' })
        }
      } else {
        if (scrollLeft <= 20) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft - cardWidth, behavior: 'smooth' })
        }
      }
    }
  }

  // Auto-play sliding reel with gentle intervals
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleScroll('right')
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const handleQuickAdd = (product: any) => {
    addToCart(product, 'S', product.color, 1)
    setJustAddedId(product.id)
    setTimeout(() => setJustAddedId(null), 1200)
  }

  return (
    <section
      className="py-16 sm:py-24 bg-[#181716] relative overflow-hidden select-none"
      aria-labelledby="runway-gallery-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="mb-2">
              <AtelierBadge variant="gold">
                Curated Silhouette Reel
              </AtelierBadge>
            </div>
            <h2 id="runway-gallery-heading" className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#f4efe9]">
              The <em>Runway</em> Gallery.
            </h2>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-2.5 sm:p-3 rounded-full border border-[#444038] bg-[#22211e]/90 text-white hover:border-[#c9b293] hover:bg-[#2c2a25] transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous items"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-2.5 sm:p-3 rounded-full border border-[#444038] bg-[#22211e]/90 text-white hover:border-[#c9b293] hover:bg-[#2c2a25] transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next items"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Reel in Curved Stage */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((product) => {
            const isAdded = justAddedId === product.id

            return (
              <div
                key={product.id}
                className="w-[230px] sm:w-[270px] lg:w-[310px] shrink-0 flex flex-col bg-[#21201d] border border-[#38352f] hover:border-[#c9b293]/70 rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-2xl sm:rounded-b-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-1.5 group snap-start"
              >
                <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px] bg-[#1b1a18] overflow-hidden rounded-t-[3.5rem] sm:rounded-t-[4.5rem]">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.93]"
                      sizes="(max-width: 640px) 240px, 320px"
                    />
                  </Link>

                  <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 bg-[#181716] border border-[#38352f] text-[10px] font-sans font-medium uppercase tracking-wider text-[#c9b293] rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="absolute bottom-4 right-4 p-2.5 sm:p-3 rounded-full bg-[#c9b293] text-[#181716] shadow-xl hover:bg-[#dfcaa8] transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
                    aria-label={`Quick add ${product.name} to bag`}
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5 text-[#181716]" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#8a857d] mb-1">
                      <span>{product.batchNumber}</span>
                      <span>{product.silhouetteFit}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-serif text-[#f4efe9] leading-snug">
                      <Link href={`/product/${product.slug}`} className="hover:text-[#c9b293] transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#8e8981] font-sans mt-0.5 truncate">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#2e2c27] flex items-baseline justify-between text-xs font-mono">
                    <span className="text-white font-medium tabular-nums text-xs sm:text-sm">
                      {formatMoney(product.price)}
                    </span>
                    <span className="text-[#8a857d] text-[11px]">{product.color}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
