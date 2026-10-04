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
  Calendar,
  MessageSquare,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useStore, formatMoney } from '@/lib/store'
import { AtelierBadge } from '@/components/ui-kit'

export function SiteHeader() {
  const pathname = usePathname()
  const {
    cartCount,
    cartSubtotal,
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
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { label: 'Collection', href: '/collection' },
    { label: 'Atelier Story', href: '/story' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' }
  ]

  const pillarCategories = [
    { label: 'Tailoring & Blazers', href: '/collection?category=Tailoring' },
    { label: 'Mulberry Silk Dresses', href: '/collection?category=Silk%20Dresses' },
    { label: 'Poplin Tops & Shirts', href: '/collection?category=Tops%20%26%20Shirts' },
    { label: 'Pleated Bottoms', href: '/collection?category=Bottoms' }
  ]

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#181716]/95 backdrop-blur-md border-b border-[#302e2a] py-3 shadow-xl'
            : 'bg-[#181716] border-b border-[#292724] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#a7a297] hover:text-[#f4efe9] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-baseline gap-2 group">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-[#f4efe9] group-hover:text-[#c9b293] transition-colors">
                AURORA
              </span>
              <span className="hidden sm:inline text-[9px] font-mono tracking-widest text-[#8a857d] uppercase">
                Atelier
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-mono uppercase tracking-[0.16em] transition-all py-1 border-b-2 cursor-pointer ${
                    active
                      ? 'border-[#c9b293] text-[#c9b293] font-semibold'
                      : 'border-transparent text-[#b5b0a6] hover:text-[#f4efe9] hover:border-[#524f46]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            <button
              type="button"
              onClick={() => setIsProvenanceModalOpen(true)}
              className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#b5b0a6] hover:text-[#c9b293] transition-colors py-1 cursor-pointer"
            >
              Provenance
            </button>

            <button
              type="button"
              onClick={() => setIsSalonModalOpen(true)}
              className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#b5b0a6] hover:text-[#c9b293] transition-colors py-1 cursor-pointer"
            >
              Salon Fitting
            </button>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#38352f] bg-[#201f1c] hover:border-[#c9b293] text-xs font-mono text-[#a7a297] hover:text-white transition-colors cursor-pointer shadow-sm"
              aria-label="Search Collection"
            >
              <Search className="w-3.5 h-3.5 text-[#c9b293]" />
              <span className="text-[11px]">Search...</span>
            </button>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-[#a7a297] hover:text-white cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* VIP Stylist Trigger */}
            <button
              type="button"
              onClick={() => setIsStylistDrawerOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3b3832] bg-[#201f1c] hover:border-[#c9b293] text-[11px] font-mono text-[#cfcac2] transition-colors cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#c9b293]" />
              <span>Stylist</span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-[#a7a297] hover:text-[#f4efe9] transition-colors relative cursor-pointer"
              aria-label={mounted ? `Wishlist (${wishlist.length})` : 'Wishlist'}
              suppressHydrationWarning
            >
              <Heart className="w-4 h-4" />
              {mounted && wishlist.length > 0 && (
                <motion.span
                  key={wishlist.length}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: [0.6, 1.25, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#c9b293] text-[#181716] text-[9px] font-mono font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>

            {/* Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#24221f] border border-[#3b3832] hover:border-[#c9b293] text-[#f4efe9] hover:text-[#c9b293] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              aria-label={mounted ? `Shopping bag (${cartCount})` : 'Shopping bag'}
              suppressHydrationWarning
            >
              <ShoppingBag className="w-4 h-4 text-[#c9b293]" />
              {mounted && (
                <span className="text-xs font-mono tabular-nums font-medium">
                  {cartCount}
                  {cartCount > 0 && (
                    <span className="hidden sm:inline text-[#8a857d] font-normal ml-1">
                      · {formatMoney(cartSubtotal)}
                    </span>
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#1c1b18] border-r border-[#34322d] p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#302e29]">
                  <div>
                    <span className="text-xl font-serif text-[#f4efe9] block">AURORA</span>
                    <span className="text-[10px] font-mono text-[#8a857d] uppercase tracking-wider">Atelier Chennai</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-[#a7a297] hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 4 Pillars Section */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                    Wardrobe Pillars
                  </span>
                  <div className="space-y-1">
                    {pillarCategories.map(p => (
                      <Link
                        key={p.label}
                        href={p.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 text-sm font-serif text-[#f4efe9] hover:text-[#c9b293] border-b border-[#282622]"
                      >
                        <span>{p.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#6e6a62]" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Atelier Story & Services */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                    Atelier &amp; Client Services
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <Link
                      href="/story"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-[#cfcac2] hover:text-[#c9b293]"
                    >
                      Our Story &amp; Philosophy
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setIsProvenanceModalOpen(true)
                      }}
                      className="block text-left py-1.5 text-[#cfcac2] hover:text-[#c9b293] cursor-pointer"
                    >
                      Textile Provenance Archives
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setIsSalonModalOpen(true)
                      }}
                      className="block text-left py-1.5 text-[#cfcac2] hover:text-[#c9b293] cursor-pointer"
                    >
                      Private Fitting Appointment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setIsStylistDrawerOpen(true)
                      }}
                      className="block text-left py-1.5 text-[#c9b293] hover:underline cursor-pointer"
                    >
                      WhatsApp VIP Stylist Concierge
                    </button>
                    <Link
                      href="/journal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-[#cfcac2] hover:text-[#c9b293]"
                    >
                      Atelier Journal
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-[#cfcac2] hover:text-[#c9b293]"
                    >
                      Client Concierge &amp; Salon Location
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div className="pt-6 border-t border-[#302e29] text-[11px] font-mono text-[#8a857d] space-y-1">
                <p>Khader Nawaz Khan Rd, Chennai</p>
                <p>Mon - Sat · 10:30 AM - 7:30 PM</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
