'use client'

import React from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'

export function SiteFooter() {
  const { setIsSalonModalOpen, setIsProvenanceModalOpen } = useStore()

  return (
    <footer className="bg-[#141312] border-t border-[#292724] text-[#a7a297] pt-16 pb-12 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#292724]">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-xl font-serif text-[#f4efe9] tracking-[0.2em] block">AURORA</span>
            <p className="text-xs text-[#827d75] leading-relaxed max-w-xs">
              Considered everyday elegance. Natural Belgian flax linen and mulberry silk tailored in Chennai, India.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#c9b293] block mb-2">Wardrobe Pillars</span>
            <div><Link href="/collection?category=Tailoring" className="hover:text-white">Tailoring</Link></div>
            <div><Link href="/collection?category=Silk%20Dresses" className="hover:text-white">Silk Dresses</Link></div>
            <div><Link href="/collection?category=Tops%20%26%20Shirts" className="hover:text-white">Tops &amp; Shirts</Link></div>
            <div><Link href="/collection?category=Bottoms" className="hover:text-white">Bottoms</Link></div>
          </div>

          {/* Atelier & Craft */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#c9b293] block mb-2">The Atelier</span>
            <div><Link href="/story" className="hover:text-white">Studio Story</Link></div>
            <div>
              <button
                type="button"
                onClick={() => setIsProvenanceModalOpen(true)}
                className="hover:text-white text-left"
              >
                Textile Provenance
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsSalonModalOpen(true)}
                className="hover:text-[#c9b293] text-left"
              >
                Private Salon Fitting
              </button>
            </div>
            <div><Link href="/contact" className="hover:text-white">Concierge &amp; Care</Link></div>
          </div>

          {/* Chennai Salon Details */}
          <div className="space-y-2 text-xs text-[#827d75]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9b293] block mb-2">Flagship Salon</span>
            <p className="text-[#a7a297]">Khader Nawaz Khan Road</p>
            <p>Nungambakkam, Chennai 600006</p>
            <p className="font-mono text-[11px] text-[#c9b293] pt-1">Mon–Sat / 10am–7pm</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6e6a62] gap-3">
          <span>© {new Date().getFullYear()} AURORA CHENNAI · ALL RIGHTS RESERVED</span>
          <span>INR (₹) · COMPLIMENTARY COURIER INCLUDED</span>
        </div>
      </div>
    </footer>
  )
}
