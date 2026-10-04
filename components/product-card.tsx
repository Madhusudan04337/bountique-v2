'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Product, useStore, formatMoney } from '@/lib/store'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'S')
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const wishlisted = isWishlisted(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, selectedSize, product.color, 1)
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      setShowQuickAdd(false)
    }, 1200)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <article
      className="group relative flex flex-col bg-[#21201d] border border-[#35332e] hover:border-[#c9b293]/60 rounded-t-[3rem] rounded-b-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1.5"
      onMouseLeave={() => {
        setShowQuickAdd(false)
      }}
    >
      {/* Product Image with Organic Arch top */}
      <div className="relative aspect-[3/4] w-full bg-[#1b1a18] overflow-hidden rounded-t-[3rem]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.93] contrast-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Scarcity / Tag Overlay */}
        <div className="absolute top-4 left-5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tag && (
            <span className="px-2.5 py-0.5 bg-[#181716]/90 border border-[#3b3934] text-[9px] font-mono uppercase tracking-[0.14em] text-[#c9b293] rounded-full backdrop-blur-md">
              {product.tag}
            </span>
          )}
          {product.stockRemaining <= 5 && (
            <span className="px-2 py-0.5 bg-[#2a1e17]/90 border border-[#8a4e32]/60 text-[8px] font-mono uppercase tracking-widest text-[#e89069] rounded-full backdrop-blur-md">
              Only {product.stockRemaining} left
            </span>
          )}
        </div>

        {/* Wishlist / Like Button with Instant Visual Feedback */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-5 p-2.5 rounded-full transition-all z-20 backdrop-blur-md shadow-lg cursor-pointer hover:scale-110 active:scale-90 ${
            wishlisted
              ? 'bg-[#c9b293] text-[#181716] shadow-[0_0_12px_rgba(201,178,147,0.5)]'
              : 'bg-[#181716]/85 text-[#f4efe9] hover:text-[#c9b293] hover:border-[#c9b293] border border-[#38352f]'
          }`}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className="w-4 h-4 transition-transform" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Tray */}
        <div className="absolute inset-x-4 bottom-4 z-20">
          {showQuickAdd ? (
            <div
              className="p-3 bg-[#181716]/95 border border-[#3d3a34] backdrop-blur-md rounded-2xl shadow-2xl animate-in fade-in duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex gap-1 mb-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                        : 'border-[#383530] bg-[#22201d] text-[#a7a299] hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-2 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-colors rounded-xl shadow-md cursor-pointer active:scale-95"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added to Bag
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Quick Add Size {selectedSize}
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setShowQuickAdd(true)
              }}
              className="w-full py-2.5 px-3 bg-[#181716]/90 hover:bg-[#c9b293] hover:text-[#181716] text-[#f4efe9] border border-[#3b3933] text-[10px] font-mono uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-all opacity-95 sm:opacity-0 sm:group-hover:opacity-100 rounded-full backdrop-blur-md shadow-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Bag</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5 bg-[#21201d]">
        <div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#8a857d] mb-1">
            <span>{product.batchNumber}</span>
            <span>{product.silhouetteFit}</span>
          </div>
          <h3 className="text-base font-serif text-[#f4efe9] group-hover:text-[#c9b293] transition-colors leading-snug">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-[#8e8981] font-sans mt-0.5">
            {product.fabric}
          </p>
        </div>

        <div className="pt-2.5 border-t border-[#2d2b27] flex items-baseline justify-between text-xs font-mono">
          <span className="text-[#f4efe9] tabular-nums font-medium">
            {formatMoney(product.price)}
          </span>
          <span className="text-[#7f7a72]">{product.color}</span>
        </div>
      </div>
    </article>
  )
}
