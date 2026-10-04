'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Ruler, Check, Sparkles, Scissors, UserCheck, ShieldCheck } from 'lucide-react'

interface SizingGuideModalProps {
  isOpen: boolean
  onClose: () => void
  category?: string
  currentSize?: string
  onSelectSize?: (size: string) => void
}

export function SizingGuideModal({
  isOpen,
  onClose,
  category = 'Tailoring',
  currentSize = 'S',
  onSelectSize
}: SizingGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in')
  const [activeTab, setActiveTab] = useState<'calculator' | 'matrix' | 'international' | 'alterations'>('calculator')

  // Calculator State
  const [heightInches, setHeightInches] = useState<number>(67) // 5'7"
  const [bustInches, setBustInches] = useState<number>(36)
  const [fitPreference, setFitPreference] = useState<'sculpted' | 'natural' | 'oversized'>('natural')
  const [hemAdjustment, setHemAdjustment] = useState<string>('Standard Atelier Length')

  // Category Selector inside Modal
  const [activeCategory, setActiveCategory] = useState<string>(category)

  // Recommendation logic
  const calculatedRecommendation = useMemo(() => {
    let base = 'S'
    if (bustInches <= 33) base = 'XS'
    else if (bustInches <= 36) base = 'S'
    else if (bustInches <= 39) base = 'M'
    else if (bustInches <= 43) base = 'L'
    else base = 'XL'

    // Adjust based on fit preference
    if (fitPreference === 'sculpted' && base !== 'XS') {
      // client prefers sharper contour
    } else if (fitPreference === 'oversized' && base !== 'XL') {
      const order = ['XS', 'S', 'M', 'L', 'XL']
      const idx = order.indexOf(base)
      if (idx < order.length - 1) base = order[idx + 1]
    }

    const fitNotes = {
      XS: 'Contours softly with 1.5" of ease at chest. Ideal for petiteness with clean shoulder alignment.',
      S: 'True-to-silhouette drape with 2.5" of tailored room through shoulders and unhindered movement.',
      M: 'Relaxed fluid presence with generous breathability and effortless layered drape.',
      L: 'Graceful elongated architectural drape with comfortable room through chest and back canvas.',
      XL: 'Sculpted ease with full range of motion, tailored to preserve balanced hemline proportions.'
    }

    return {
      size: base,
      match: 97,
      note: fitNotes[base as keyof typeof fitNotes] || fitNotes['S']
    }
  }, [bustInches, fitPreference])

  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12)
    const rem = inches % 12
    const cm = Math.round(inches * 2.54)
    return `${feet}'${rem}" (${cm} cm)`
  }

  const measurements = [
    { size: 'XS', us: '0-2', uk: '4-6', eu: '32-34', chestIn: '32-34"', chestCm: '81-86cm', waistIn: '25-26"', waistCm: '63-66cm', hipIn: '35-36"', hipCm: '89-91cm' },
    { size: 'S', us: '4-6', uk: '8-10', eu: '36-38', chestIn: '35-37"', chestCm: '89-94cm', waistIn: '27-28"', waistCm: '68-71cm', hipIn: '37-38"', hipCm: '94-97cm' },
    { size: 'M', us: '8-10', uk: '12-14', eu: '40-42', chestIn: '38-40"', chestCm: '96-101cm', waistIn: '29-31"', waistCm: '74-79cm', hipIn: '39-41"', hipCm: '99-104cm' },
    { size: 'L', us: '12-14', uk: '16-18', eu: '44-46', chestIn: '41-43"', chestCm: '104-109cm', waistIn: '32-34"', waistCm: '81-86cm', hipIn: '42-44"', hipCm: '107-112cm' },
    { size: 'XL', us: '16', uk: '20', eu: '48', chestIn: '44-46"', chestCm: '112-117cm', waistIn: '35-37"', waistCm: '89-94cm', hipIn: '45-47"', hipCm: '114-119cm' },
  ]

  const handleApplySize = (size: string) => {
    if (onSelectSize) {
      onSelectSize(size)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sizing-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 14 }}
              className="relative z-10 w-full max-w-2xl bg-[#201f1c] border border-[#3b3832] text-[#f4efe9] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#2e2c28] pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-1">
                    Atelier Proportion Intelligence
                  </span>
                  <h2 id="sizing-modal-title" className="text-2xl font-serif text-[#f4efe9]">
                    Fit Advisor &amp; Sizing Matrix
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-[#a7a297] hover:text-white"
                  aria-label="Close sizing modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2c2a26] pb-3">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('calculator')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'calculator'
                        ? 'bg-[#c9b293] text-[#181716] font-semibold'
                        : 'text-[#a7a297] hover:text-white bg-[#181716]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Find My Size</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('matrix')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                      activeTab === 'matrix'
                        ? 'bg-[#c9b293] text-[#181716] font-semibold'
                        : 'text-[#a7a297] hover:text-white bg-[#181716]'
                    }`}
                  >
                    Garment Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('international')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                      activeTab === 'international'
                        ? 'bg-[#c9b293] text-[#181716] font-semibold'
                        : 'text-[#a7a297] hover:text-white bg-[#181716]'
                    }`}
                  >
                    International Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('alterations')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'alterations'
                        ? 'bg-[#c9b293] text-[#181716] font-semibold'
                        : 'text-[#a7a297] hover:text-white bg-[#181716]'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Custom Tailor Hem</span>
                  </button>
                </div>

                {activeTab === 'matrix' && (
                  <div className="flex p-0.5 bg-[#181716] rounded-lg border border-[#302e2a]">
                    <button
                      type="button"
                      onClick={() => setUnit('in')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                        unit === 'in' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                      }`}
                    >
                      INCHES
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('cm')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                        unit === 'cm' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                      }`}
                    >
                      CM
                    </button>
                  </div>
                )}
              </div>

              {/* TAB 1: INTELLIGENT FIT CALCULATOR */}
              {activeTab === 'calculator' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Height Slider */}
                    <div className="p-4 bg-[#1a1917] border border-[#302e2a] rounded-2xl space-y-2">
                      <div className="flex justify-between text-xs font-mono text-[#a7a299]">
                        <span>Client Height</span>
                        <span className="text-white font-semibold">{formatHeight(heightInches)}</span>
                      </div>
                      <input
                        type="range"
                        min="58"
                        max="75"
                        step="1"
                        value={heightInches}
                        onChange={e => setHeightInches(Number(e.target.value))}
                        className="w-full accent-[#c9b293] bg-[#292723]"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-[#78746c]">
                        <span>4&apos;10&quot;</span>
                        <span>5&apos;7&quot;</span>
                        <span>6&apos;3&quot;</span>
                      </div>
                    </div>

                    {/* Bust / Chest Slider */}
                    <div className="p-4 bg-[#1a1917] border border-[#302e2a] rounded-2xl space-y-2">
                      <div className="flex justify-between text-xs font-mono text-[#a7a299]">
                        <span>Bust / Chest Measurement</span>
                        <span className="text-white font-semibold">{bustInches}&quot; ({Math.round(bustInches * 2.54)} cm)</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="48"
                        step="1"
                        value={bustInches}
                        onChange={e => setBustInches(Number(e.target.value))}
                        className="w-full accent-[#c9b293] bg-[#292723]"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-[#78746c]">
                        <span>30&quot; (XS)</span>
                        <span>38&quot; (M)</span>
                        <span>48&quot; (XL)</span>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Silhouette Profile */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#a7a299] block">Desired Silhouette Drape</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'sculpted', title: 'Sculpted', desc: 'Contoured & tailored' },
                        { id: 'natural', title: 'Natural Ease', desc: 'Atelier intended cut' },
                        { id: 'oversized', title: 'Relaxed Drape', desc: 'Fluid, generous drape' }
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFitPreference(item.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            fitPreference === item.id
                              ? 'border-[#c9b293] bg-[#c9b293]/15 text-white'
                              : 'border-[#302e2a] bg-[#1a1917] text-[#8a857d] hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-mono font-semibold block text-[#c9b293]">{item.title}</span>
                          <span className="text-[10px] font-sans block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Recommendation Output Box */}
                  <div className="p-5 bg-[#25231f] border border-[#c9b293]/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9b293]">
                          Atelier Recommended Form
                        </span>
                        <span className="px-2 py-0.5 bg-[#55e08b]/15 text-[#55e08b] text-[9px] font-mono rounded-full">
                          {calculatedRecommendation.match}% Match
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif text-white font-medium">
                          Size {calculatedRecommendation.size}
                        </span>
                        <span className="text-xs font-mono text-[#8a857d]">
                          (Calculated for {formatHeight(heightInches)})
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#a7a297] leading-relaxed max-w-md pt-1">
                        {calculatedRecommendation.note}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplySize(calculatedRecommendation.size)}
                      className="px-6 py-3 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full whitespace-nowrap transition-colors shadow-lg self-start sm:self-center"
                    >
                      Apply Size {calculatedRecommendation.size}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GARMENT SPECS TABLE */}
              {activeTab === 'matrix' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-[#302e2a] text-[#8a857d]">
                        <th className="py-2.5 font-normal">AURORA SIZE</th>
                        <th className="py-2.5 font-normal">BUST / CHEST</th>
                        <th className="py-2.5 font-normal">NATURAL WAIST</th>
                        <th className="py-2.5 font-normal">FULL HIP</th>
                        <th className="py-2.5 font-normal">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2824]">
                      {measurements.map(m => (
                        <tr key={m.size} className="hover:bg-[#252420] transition-colors">
                          <td className="py-3 font-semibold text-[#c9b293]">{m.size}</td>
                          <td className="py-3 text-[#cfcac2]">
                            {unit === 'in' ? m.chestIn : m.chestCm}
                          </td>
                          <td className="py-3 text-[#cfcac2]">
                            {unit === 'in' ? m.waistIn : m.waistCm}
                          </td>
                          <td className="py-3 text-[#cfcac2]">
                            {unit === 'in' ? m.hipIn : m.hipCm}
                          </td>
                          <td className="py-3">
                            <button
                              type="button"
                              onClick={() => handleApplySize(m.size)}
                              className="text-[11px] font-mono text-[#c9b293] hover:underline"
                            >
                              Select {m.size} →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 3: INTERNATIONAL CONVERSION */}
              {activeTab === 'international' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-[#302e2a] text-[#8a857d]">
                        <th className="py-2.5 font-normal">AURORA SIZE</th>
                        <th className="py-2.5 font-normal">UNITED STATES</th>
                        <th className="py-2.5 font-normal">UNITED KINGDOM</th>
                        <th className="py-2.5 font-normal">EUROPE (EU/FR)</th>
                        <th className="py-2.5 font-normal">ITALY (IT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2824]">
                      {measurements.map(m => (
                        <tr key={m.size} className="hover:bg-[#252420] transition-colors">
                          <td className="py-3 font-semibold text-[#c9b293]">{m.size}</td>
                          <td className="py-3 text-[#cfcac2]">US {m.us}</td>
                          <td className="py-3 text-[#cfcac2]">UK {m.uk}</td>
                          <td className="py-3 text-[#cfcac2]">EU {m.eu}</td>
                          <td className="py-3 text-[#cfcac2]">IT {Number(m.eu.split('-')[0]) + 4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 4: COMPLIMENTARY CUSTOM ALTERATIONS */}
              {activeTab === 'alterations' && (
                <div className="space-y-4 text-xs font-sans text-[#a7a297]">
                  <div className="p-4 bg-[#1a1917] rounded-2xl border border-[#302e2a] space-y-2">
                    <span className="text-white block font-serif text-sm">
                      Chennai Atelier Complimentary Hem Adjustments
                    </span>
                    <p className="leading-relaxed">
                      Because our garments are hand-finished in our Chennai studio, we offer complimentary sleeve and trouser hem modifications prior to archival packaging.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#a7a299] block">Choose Hem Customization</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Standard Atelier Length (Default)',
                        'Petite Hem (-1.0 inch / 2.5 cm)',
                        'Shortened Hem (-2.0 inches / 5.0 cm)',
                        'Tall Extended Hem (+1.5 inches / 3.8 cm)'
                      ].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setHemAdjustment(opt)}
                          className={`p-3 rounded-xl border text-left text-xs font-mono transition-all ${
                            hemAdjustment === opt
                              ? 'border-[#c9b293] bg-[#c9b293]/15 text-white font-medium'
                              : 'border-[#302e2a] bg-[#1a1917] text-[#8a857d] hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#24221e] rounded-xl border border-[#38352f] text-[11px] font-mono text-[#c9b293] flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected: {hemAdjustment} · Hand-inspected by Master Draper Ramanathan</span>
                  </div>
                </div>
              )}

              {/* Footer Note */}
              <div className="pt-3 border-t border-[#2e2c28] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8a857d]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c9b293]" />
                  <span>Complimentary 14-day doorstep exchange on all sizes</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#2a2926] hover:bg-[#38352f] text-[#cfcac2] hover:text-white font-semibold rounded-full transition-colors self-end sm:self-auto"
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
