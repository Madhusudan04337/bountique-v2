'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

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

  // Subtle auto-advance every 6 seconds unless paused
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
      className="py-20 bg-[#161514] border-b border-[#292724]"
      aria-labelledby="press-acclaim-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#c9b293] block">
          Editorial &amp; Client Acclaim
        </span>
        <h2 id="press-acclaim-heading" className="sr-only">
          Editorial Acclaim
        </h2>

        {/* Quote Display */}
        <div className="relative min-h-[160px] flex items-center justify-center">
          <div
            key={current}
            className="space-y-4 max-w-2xl mx-auto animate-in fade-in duration-300"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#f4efe9] leading-relaxed italic">
              &ldquo;{activeQuote.quote}&rdquo;
            </p>
            <div className="text-xs font-mono text-[#c9b293] uppercase tracking-[0.2em]">
              {activeQuote.publication} <span className="text-[#6d6860]">· {activeQuote.date}</span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={prevQuote}
            className="p-2.5 rounded-full border border-[#33312c] bg-[#1e1d1a] hover:border-[#c9b293] text-[#8a857d] hover:text-white transition-colors cursor-pointer"
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
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  current === i ? 'bg-[#c9b293] w-6' : 'bg-[#3b3832] hover:bg-[#555147] w-2'
                }`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextQuote}
            className="p-2.5 rounded-full border border-[#33312c] bg-[#1e1d1a] hover:border-[#c9b293] text-[#8a857d] hover:text-white transition-colors cursor-pointer"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
