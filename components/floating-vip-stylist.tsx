'use client'

import React from 'react'
import { MessageSquare, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'

export function FloatingVipStylist() {
  const { setIsStylistDrawerOpen, isStylistDrawerOpen, isCartOpen, isSearchOpen, isSalonModalOpen, isProvenanceModalOpen } = useStore()

  // Hide if any full-screen modal or drawer is active
  if (isStylistDrawerOpen || isCartOpen || isSearchOpen || isSalonModalOpen || isProvenanceModalOpen) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        type="button"
        onClick={() => setIsStylistDrawerOpen(true)}
        className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#201f1c] hover:bg-[#2b2a25] border border-[#c9b293]/50 text-[#f4efe9] text-xs font-sans font-medium rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#c9b293] cursor-pointer"
        aria-label="Contact VIP Stylist"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55e08b] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#55e08b]"></span>
        </span>
        <MessageSquare className="w-3.5 h-3.5 text-[#c9b293]" />
        <span className="hidden sm:inline">Stylist Advice</span>
        <span className="sm:hidden">Stylist</span>
      </button>
    </div>
  )
}
