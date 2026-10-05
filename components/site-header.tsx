'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Compass,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useStore, formatMoney } from '@/lib/store'

export function SiteHeader() {
  const pathname = usePathname()
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsSalonModalOpen,
    setIsProvenanceModalOpen,
    setIsStylistDrawerOpen
  } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const wishlistLength = mounted ? wishlist.length : 0
  const cartItemCount = mounted ? cartCount : 0

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#181716]/95 backdrop-blur-md border-b border-[#2d2a26] py-3 shadow-xl'
            : 'bg-[#181716] border-b border-[#24221f] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#b5b0a6] hover:text-[#f4efe9] transition-colors cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="group" aria-label="AURORA Atelier Homepage">
              <div className="flex flex-col leading-none">
                <span className="font-sans text-xl font-medium tracking-[0.25em] text-[#f4efe9] group-hover:text-[#c9b293] transition-colors uppercase">
                  AURORA
                </span>
                <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-[#8a857d] uppercase">
                  ATELIER
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Minimalist Primary Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/collection"
              className={`text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors py-1 border-b-2 cursor-pointer ${
                pathname === '/collection'
                  ? 'border-[#c9b293] text-[#c9b293]'
                  : 'border-transparent text-[#b5b0a6] hover:text-[#f4efe9]'
              }`}
            >
              Catalog
            </Link>

            <Link
              href="/story"
              className={`text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors py-1 border-b-2 cursor-pointer ${
                pathname === '/story'
                  ? 'border-[#c9b293] text-[#c9b293]'
                  : 'border-transparent text-[#b5b0a6] hover:text-[#f4efe9]'
              }`}
            >
              Atelier Story
            </Link>

            <button
              type="button"
              onClick={() => setIsProvenanceModalOpen(true)}
              className="text-xs font-sans uppercase tracking-[0.14em] font-medium text-[#b5b0a6] hover:text-[#c9b293] transition-colors py-1 cursor-pointer"
            >
              Provenance
            </button>

            <button
              type="button"
              onClick={() => setIsSalonModalOpen(true)}
              className="text-xs font-sans uppercase tracking-[0.14em] font-medium text-[#b5b0a6] hover:text-[#c9b293] transition-colors py-1 cursor-pointer"
            >
              Salon Fitting
            </button>
          </nav>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3.5 sm:py-2 rounded-full border border-[#38352f] bg-[#201f1c] hover:border-[#c9b293] text-[#b5b0a6] hover:text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 text-[#c9b293]" />
              <span className="hidden md:inline text-[11px] font-mono tracking-wider">Search</span>
            </button>

            <Link
              href="/collection"
              className="relative p-2 sm:p-2.5 rounded-full border border-[#38352f] bg-[#201f1c] hover:border-[#c9b293] text-[#b5b0a6] hover:text-white transition-colors cursor-pointer"
              aria-label="Saved Pieces"
            >
              <Heart className="w-4 h-4" />
              {wishlistLength > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c9b293] text-[#181716] text-[9px] font-mono font-bold flex items-center justify-center">
                  {wishlistLength}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3.5 sm:py-2 rounded-full border border-[#c9b293]/40 bg-[#c9b293]/10 hover:bg-[#c9b293]/20 text-[#c9b293] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-mono font-semibold">
                {cartItemCount} {cartItemCount === 1 ? 'Piece' : 'Pieces'}
              </span>
              {cartItemCount > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c9b293] text-[#181716] text-[9px] font-mono font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-50 bg-[#181716]/98 border-b border-[#2d2a26] p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col space-y-4 max-w-sm mx-auto text-center">
              <Link
                href="/collection"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-mono uppercase tracking-widest text-[#f4efe9] hover:text-[#c9b293] border-b border-[#282622]"
              >
                Catalog Collection
              </Link>

              <Link
                href="/story"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-mono uppercase tracking-widest text-[#f4efe9] hover:text-[#c9b293] border-b border-[#282622]"
              >
                Atelier Story
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsProvenanceModalOpen(true)
                }}
                className="py-2.5 text-sm font-mono uppercase tracking-widest text-[#f4efe9] hover:text-[#c9b293] border-b border-[#282622] cursor-pointer"
              >
                Textile Provenance
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsSalonModalOpen(true)
                }}
                className="py-2.5 text-sm font-mono uppercase tracking-widest text-[#f4efe9] hover:text-[#c9b293] border-b border-[#282622] cursor-pointer"
              >
                Salon Fitting Appointment
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsStylistDrawerOpen(true)
                }}
                className="py-3 px-6 rounded-full bg-[#c9b293] text-[#181716] font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>VIP Stylist Concierge</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
