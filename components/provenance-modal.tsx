'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, CheckCircle2 } from 'lucide-react'
import { useStore } from '@/lib/store'

export function ProvenanceModal() {
  const { isProvenanceModalOpen, setIsProvenanceModalOpen } = useStore()

  return (
    <AnimatePresence>
      {isProvenanceModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="provenance-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProvenanceModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              className="relative z-10 w-full max-w-2xl bg-[#201f1c] border border-[#3b3832] text-[#f4efe9] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-[#2e2c28] pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block mb-1">
                    Textile Provenance
                  </span>
                  <h2 id="provenance-modal-title" className="text-2xl font-serif text-[#f4efe9]">
                    Natural Fibers &amp; Craft
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProvenanceModalOpen(false)}
                  className="p-1.5 text-[#a7a297] hover:text-white"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Visual Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#33312c]">
                  <Image
                    src="/images/real-detail-weave.jpg"
                    alt="Macro Belgian flax linen weave"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono text-[#c9b293]">
                    100% Belgian Flax Weave
                  </span>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#33312c]">
                  <Image
                    src="/images/real-craft.jpg"
                    alt="Chennai atelier hand tailoring"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono text-[#c9b293]">
                    Chennai Hand-Finished Seams
                  </span>
                </div>
              </div>

              {/* Pillars (H3) */}
              <div className="space-y-3 text-xs font-sans text-[#cfcac2]">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c9b293] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white block font-serif text-sm">Ghent Flax (Flanders, Belgium)</h3>
                    <p className="text-[#a7a297]">
                      Grown with natural rainfall and traditional dew retting. Naturally breathable and hypo-allergenic, softening with every wash.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c9b293] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white block font-serif text-sm">Mulberry Silk (Tamil Nadu)</h3>
                    <p className="text-[#a7a297]">
                      Spun from unbroken filament silk, finished with a gentle sand-wash for a fluid suede-like hand feel that contours without clinging.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2e2c28] flex justify-between items-center text-xs font-mono text-[#8a857d]">
                <span>Zero synthetic polyesters</span>
                <button
                  type="button"
                  onClick={() => setIsProvenanceModalOpen(false)}
                  className="px-4 py-2 bg-[#2d2b27] hover:bg-[#383631] text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
