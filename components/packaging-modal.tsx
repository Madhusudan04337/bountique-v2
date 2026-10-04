'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, Gift, Check, ShieldCheck } from 'lucide-react'

export function PackagingModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="packaging-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              className="relative z-10 w-full max-w-2xl bg-[#201f1c] border border-[#3b3832] text-[#f4efe9] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-[#2e2c28] pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block mb-1">
                    The Atelier Experience
                  </span>
                  <h2 id="packaging-modal-title" className="text-2xl font-serif text-[#f4efe9]">
                    Signature Packaging &amp; Unboxing Ritual
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-[#a7a297] hover:text-white"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Visual Split */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#36342f]">
                <Image
                  src="/images/real-craft.jpg"
                  alt="Aurora Handcrafted Packaging"
                  fill
                  className="object-cover filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#c9b293] flex justify-between">
                  <span>Complimentary with every order</span>
                  <span>Plastic-free archival presentation</span>
                </div>
              </div>

              {/* 4 Pillars of Unboxing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#cfcac2]">
                <div className="p-3.5 bg-[#252420] border border-[#33312c] rounded-xl space-y-1">
                  <strong className="text-white block font-serif text-sm">
                    1. Rigid Cedarwood Box
                  </strong>
                  <p className="text-[#a7a297]">
                    Archival magnetic keepsake box wrapped in handmade recycled cotton parchment paper.
                  </p>
                </div>

                <div className="p-3.5 bg-[#252420] border border-[#33312c] rounded-xl space-y-1">
                  <strong className="text-white block font-serif text-sm">
                    2. Raw Flax Dust Cover
                  </strong>
                  <p className="text-[#a7a297]">
                    Breathable unbleached linen garment sleeve protects against dust without synthetic static.
                  </p>
                </div>

                <div className="p-3.5 bg-[#252420] border border-[#33312c] rounded-xl space-y-1">
                  <strong className="text-white block font-serif text-sm">
                    3. Draper Inspection Card
                  </strong>
                  <p className="text-[#a7a297]">
                    Handwritten and numbered certificate signed by the master tailor who assembled your piece.
                  </p>
                </div>

                <div className="p-3.5 bg-[#252420] border border-[#33312c] rounded-xl space-y-1">
                  <strong className="text-white block font-serif text-sm">
                    4. Mysore Sandalwood Sachet
                  </strong>
                  <p className="text-[#a7a297]">
                    All-natural aromatic botanical wood shavings to keep your wardrobe fresh naturally.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2e2c28] flex justify-between items-center text-xs font-mono text-[#8a857d]">
                <span className="flex items-center gap-1.5 text-[#c9b293]">
                  <Check className="w-3.5 h-3.5" />
                  Pre-selected for your order
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-semibold rounded-full transition-colors"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
