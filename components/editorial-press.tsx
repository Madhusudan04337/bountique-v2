'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react'

const pressQuotes = [
  {
    quote: 'An antidote to rapid production—sculpted linen blazers and fluid silks with an unhurried, quiet presence.',
    publication: 'VOGUE LUXE',
    date: 'Summer 2026 Issue'
  },
  {
    quote: 'Masterful bias cuts in unadulterated Indian silk. Aurora sets a new benchmark for southern bespoke ateliers.',
    publication: 'ARCHITECTURAL DIGEST',
    date: 'Style & Provenance Edit'
  },
  {
    quote: 'The linen trousers drape like architectural sculpture. Impeccable french seams and archival cedarwood presentation.',
    publication: 'THE HINDU LUXE',
    date: 'Chennai Design Awards'
  }
]

export function EditorialPress() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % pressQuotes.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextQuote = () => setCurrent(prev => (prev + 1) % pressQuotes.length)
  const prevQuote = () => setCurrent(prev => (prev - 1 + pressQuotes.length) % pressQuotes.length)

  const activeQuote = pressQuotes[current] || pressQuotes[0]

  return (
    <section
      className="py-28 bg-[#161514] relative overflow-hidden"
      aria-labelledby="press-acclaim-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Organic Center Aura Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c9b293]/7 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Organic Wave Hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
          <path
            d="M0,200 C300,100 600,300 900,150 C1050,75 1150,220 1200,200"
            stroke="#c9b293"
            strokeWidth="0.8"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201f1c]/90 border border-[#38352f] text-[10px] font-mono uppercase tracking-[0.26em] text-[#c9b293]">
          <Sparkles className="w-3 h-3" />
          <span>Editorial &amp; Client Acclaim</span>
        </div>

        <h2 id="press-acclaim-heading" className="sr-only">
          Editorial Acclaim
        </h2>

        {/* Quote Display in Curved Floating Portal */}
        <div className="relative min-h-[180px] flex items-center justify-center p-6 sm:p-10 rounded-[3rem] bg-gradient-to-b from-[#1d1c1a]/80 via-[#181716]/60 to-[#1d1c1a]/80 border border-[#36332d] shadow-2xl backdrop-blur-sm">
          <div
            key={current}
            className="space-y-5 max-w-2xl mx-auto animate-in fade-in duration-300"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#f4efe9] leading-relaxed italic">
              &ldquo;{activeQuote.quote}&rdquo;
            </p>
            <div className="text-xs font-mono text-[#c9b293] uppercase tracking-[0.24em] font-semibold">
              {activeQuote.publication} <span className="text-[#807a72] font-normal">· {activeQuote.date}</span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={prevQuote}
            className="p-3 rounded-full border border-[#38352f] bg-[#1e1d1a] hover:border-[#c9b293] text-[#a7a297] hover:text-white transition-all cursor-pointer shadow-md"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2 items-center">
            {pressQuotes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  current === i ? 'bg-[#c9b293] w-7' : 'bg-[#3b3832] hover:bg-[#555147] w-2.5'
                }`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextQuote}
            className="p-3 rounded-full border border-[#38352f] bg-[#1e1d1a] hover:border-[#c9b293] text-[#a7a297] hover:text-white transition-all cursor-pointer shadow-md"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
