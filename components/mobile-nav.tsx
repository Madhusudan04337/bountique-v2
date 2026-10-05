'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'

export function MobileNav() {
  const pathname = usePathname()
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on checkout page to avoid distraction
  if (pathname === '/checkout') return null

  const isHome = pathname === '/'
  const isCollection = pathname.startsWith('/collection')
  const isWishlist = pathname.startsWith('/wishlist')

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#161514]/95 backdrop-blur-xl border-t border-[#302e29] px-2 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
      <nav className="flex items-center justify-around" aria-label="Mobile Bottom Navigation">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            isHome ? 'text-[#c9b293]' : 'text-[#8a857d] hover:text-[#f4efe9]'
          }`}
          aria-label="Atelier Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-sans tracking-wider mt-1 uppercase font-medium">Home</span>
        </Link>

        {/* 2. Collection */}
        <Link
          href="/collection"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            isCollection ? 'text-[#c9b293]' : 'text-[#8a857d] hover:text-[#f4efe9]'
          }`}
          aria-label="Silhouettes Collection"
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] font-sans tracking-wider mt-1 uppercase font-medium">Catalog</span>
        </Link>

        {/* 3. Search Trigger */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[#8a857d] hover:text-[#f4efe9] transition-all cursor-pointer"
          aria-label="Search Collection"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] font-sans tracking-wider mt-1 uppercase font-medium">Search</span>
        </button>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
            isWishlist ? 'text-[#c9b293]' : 'text-[#8a857d] hover:text-[#f4efe9]'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-4 h-4" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#c9b293] text-[#181716] text-[8px] font-mono font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans tracking-wider mt-1 uppercase font-medium">Saved</span>
        </Link>

        {/* 5. Bag */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[#f4efe9] hover:text-[#c9b293] transition-all cursor-pointer relative"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#c9b293] text-[#181716] text-[8px] font-mono font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans tracking-wider mt-1 uppercase font-medium">Bag</span>
        </button>
      </nav>
    </div>
  )
}
