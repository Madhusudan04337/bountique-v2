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
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#201f1c]/95 hover:bg-[#2b2a25] border border-[#c9b293]/40 text-[#f4efe9] text-xs font-mono rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c9b293]"
        aria-label="Contact VIP Stylist"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55e08b] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#55e08b]"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-[#c9b293]" />
        <span className="hidden sm:inline font-medium">VIP Stylist Online</span>
        <span className="sm:hidden font-medium">Stylist</span>
      </button>
    </div>
  )
}
