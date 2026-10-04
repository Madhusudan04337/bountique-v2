'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react'
import { useStore, formatMoney, initialProducts } from '@/lib/store'

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
      const cardWidth = 340
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

  // Auto-play sliding reel
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleScroll('right')
    }, 4200)
    return () => clearInterval(timer)
  }, [isPaused])



  const handleQuickAdd = (product: any) => {
    addToCart(product, 'S', product.color, 1)
    setJustAddedId(product.id)
    setTimeout(() => setJustAddedId(null), 1200)
  }

  return (
    <section
      className="py-24 bg-[#181716] overflow-hidden select-none"
      aria-labelledby="runway-gallery-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-1">
                Curated Silhouette Reel
              </span>
              <span className="text-[10px] font-mono text-[#8a857d] block mb-1">
                · Auto-playing
              </span>
            </div>
            <h2 id="runway-gallery-heading" className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
              The <em>Runway</em> Gallery.
            </h2>
          </div>

          <div className="flex items-center gap-3">


            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-[#4a4740] bg-[#22211e] text-white hover:border-[#c9b293] hover:bg-[#2c2a25] transition-all cursor-pointer shadow-md"
              aria-label="Previous items"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-[#4a4740] bg-[#22211e] text-white hover:border-[#c9b293] hover:bg-[#2c2a25] transition-all cursor-pointer shadow-md"
              aria-label="Next items"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Reel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map(product => {
            const isAdded = justAddedId === product.id

            return (
              <div
                key={product.id}
                className="w-72 sm:w-80 shrink-0 flex flex-col bg-[#21201d] border border-[#35332e] hover:border-[#c9b293]/60 rounded-t-[3.5rem] rounded-b-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative w-full h-[360px] sm:h-[400px] bg-[#1b1a18] overflow-hidden rounded-t-[3.5rem]">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105 filter brightness-[0.93]"
                      sizes="320px"
                    />
                  </Link>

                  <div className="absolute top-4 left-5 flex flex-col gap-1 z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 bg-[#181716]/85 backdrop-blur-sm border border-[#38352f] text-[9px] font-mono uppercase tracking-widest text-[#c9b293] rounded-full">
                      {product.category}
                    </span>
                    <span className="px-2 py-0.5 bg-[#251f1a]/85 backdrop-blur-sm text-[8px] font-mono uppercase tracking-widest text-[#e89069] rounded-full">
                      {product.stockRemaining} left
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-[#c9b293] text-[#181716] shadow-xl hover:bg-[#dfcaa8] transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
                    aria-label={`Quick add ${product.name} to bag`}
                  >
                    {isAdded ? <Check className="w-4 h-4 text-[#181716]" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#8a857d] mb-1">
                      <span>{product.batchNumber}</span>
                      <span>{product.silhouetteFit}</span>
                    </div>
                    <h3 className="text-base font-serif text-[#f4efe9] leading-snug">
                      <Link href={`/product/${product.slug}`} className="hover:text-[#c9b293] transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#8e8981] font-sans mt-0.5">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#2d2b27] flex items-baseline justify-between text-xs font-mono">
                    <span className="text-white font-medium tabular-nums">
                      {formatMoney(product.price)}
                    </span>
                    <span className="text-[#7f7a72]">{product.color}</span>
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
