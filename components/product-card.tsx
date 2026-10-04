'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Product, useStore } from '@/lib/store'
import { AtelierBadge, PriceTag } from '@/components/ui-kit'

interface ProductCardProps {
  product: Product
  priority?: boolean
  variant?: 'standard' | 'compact'
}

export function ProductCard({
  product,
  priority = false,
  variant = 'standard'
}: ProductCardProps) {
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
      className="group relative flex flex-col bg-[#201f1c] border border-[#35332e] hover:border-[#c9b293]/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#181716] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.94] contrast-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges / Tags (Top Left) */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag && (
            <AtelierBadge variant={product.tag === 'Bestseller' ? 'gold' : 'subtle'}>
              {product.tag}
            </AtelierBadge>
          )}
          {product.stockRemaining <= 4 && (
            <AtelierBadge variant="scarcity">
              Only {product.stockRemaining} left
            </AtelierBadge>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all z-20 backdrop-blur-md flex items-center justify-center cursor-pointer ${
            wishlisted
              ? 'bg-[#c9b293] text-[#181716] shadow-md scale-105'
              : 'bg-[#181716]/80 text-[#f4efe9] hover:text-[#c9b293] hover:border-[#c9b293] border border-[#38352f]'
          }`}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className="w-3.5 h-3.5" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Compact Quick Add Overlay */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-20">
          {showQuickAdd ? (
            <div
              className="p-2 bg-[#181716]/95 border border-[#3d3a34] backdrop-blur-md rounded-xl shadow-xl animate-in fade-in duration-150"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex gap-1 mb-1.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-0.5 text-[10px] font-mono rounded border transition-all cursor-pointer ${
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
                className="w-full h-7 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-colors rounded-lg shadow-sm cursor-pointer"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3 h-3" /> Added!
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" /> Add Size {selectedSize}
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
              className="w-full h-7 sm:h-8 px-2.5 bg-[#181716]/90 hover:bg-[#c9b293] hover:text-[#181716] text-[#f4efe9] border border-[#3b3933] text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-all rounded-full backdrop-blur-md shadow-md cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Plus className="w-3 h-3" />
              <span>Quick Bag</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#201f1c]">
        <div>
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#8a857d] mb-1">
            <span>{product.batchNumber}</span>
            <span>{product.silhouetteFit}</span>
          </div>

          <h3 className="text-xs sm:text-sm font-serif text-[#f4efe9] group-hover:text-[#c9b293] transition-colors leading-snug truncate">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-[11px] text-[#8e8981] font-sans truncate mt-0.5">
            {product.fabric}
          </p>
        </div>

        <div className="pt-2 border-t border-[#2c2a26]">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            color={product.color}
            size="sm"
          />
        </div>
      </div>
    </article>
  )
}
