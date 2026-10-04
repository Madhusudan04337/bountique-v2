'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, Calendar, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useStore } from '@/lib/store'

export function SiteHeader() {
  const pathname = usePathname()
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsSalonModalOpen,
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

  return (
    <>
      {/* Refined Minimalist Atelier Studio Marque */}
      <div className="bg-[#121110] border-b border-[#24221f] text-[#8a857d] py-1.5 px-4 text-center text-[10px] font-mono tracking-[0.26em] uppercase flex items-center justify-center">
        <span>Chennai Atelier Flagship · Complimentary Insured Courier Across India</span>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#181716]/95 backdrop-blur-md border-b border-[#302e2a] py-3.5 shadow-xl'
            : 'bg-[#181716] border-b border-[#292724] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#a7a297] hover:text-[#f4efe9]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-[#f4efe9]">
              AURORA
            </Link>
          </div>

          {/* Main Site Header Navigation (Targeted CSS Selector 1) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-all py-1 border-b-2 cursor-pointer ${
                    active
                      ? 'border-[#c9b293] text-[#c9b293] font-medium'
                      : 'border-transparent text-[#b5b0a6] hover:text-[#f4efe9] hover:border-[#524f46]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <button
              type="button"
              onClick={() => setIsSalonModalOpen(true)}
              className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#b5b0a6] hover:text-[#c9b293] transition-colors py-1 cursor-pointer"
            >
              Salon Fitting
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setIsStylistDrawerOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3b3832] bg-[#201f1c] hover:border-[#c9b293] text-[11px] font-mono text-[#cfcac2] transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#c9b293]" />
              <span>VIP Stylist</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#a7a297] hover:text-[#f4efe9] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </motion.button>

            <Link
              href="/wishlist"
              className="p-2 text-[#a7a297] hover:text-[#f4efe9] transition-colors relative"
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

            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#f4efe9] hover:text-[#c9b293] transition-colors flex items-center gap-1.5 group cursor-pointer"
              aria-label={mounted ? `Shopping bag (${cartCount})` : 'Shopping bag'}
              suppressHydrationWarning
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              {mounted && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.3, 1] }}
                  transition={{ duration: 0.28 }}
                  className="text-xs font-mono tabular-nums font-semibold"
                >
                  ({cartCount})
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-[#1f1e1b] border-r border-[#34322d] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#34322d]">
                  <span className="text-xl font-serif text-[#f4efe9]">AURORA</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#a7a297]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-serif text-[#f4efe9] hover:text-[#c9b293]"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setIsStylistDrawerOpen(true)
                    }}
                    className="text-left text-base font-serif text-[#c9b293]"
                  >
                    VIP Stylist Concierge
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setIsSalonModalOpen(true)
                    }}
                    className="text-left text-base font-serif text-[#cfcac2]"
                  >
                    Book Chennai Fitting
                  </button>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-serif text-[#a7a297]"
                    suppressHydrationWarning
                  >
                    Wishlist ({mounted ? wishlist.length : 0})
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-[#34322d] text-xs font-mono text-[#8b867e]">
                <p>Khader Nawaz Khan Rd, Chennai</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
