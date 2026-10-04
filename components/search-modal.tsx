'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X } from 'lucide-react'
import { useStore, formatMoney } from '@/lib/store'

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery('')
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setIsSearchOpen])

  const filtered = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 3)

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <div className="min-h-screen px-4 flex items-start justify-center pt-20 pb-12">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-[#1e1d1a] border border-[#36342f] text-[#f4efe9] p-6 shadow-2xl relative z-10 text-left rounded-3xl max-h-[85vh] overflow-y-auto"
            >
              <h2 id="search-modal-title" className="sr-only">
                Search Boutique Pieces
              </h2>

              <div className="flex items-center gap-3 border-b border-[#302e2a] pb-3">
                <Search className="w-4 h-4 text-[#c9b293]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pieces, linen, dresses..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-base font-serif text-white placeholder-[#78746c] focus:outline-none"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1 text-[#8f8a82]" aria-label="Close search">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8a857d]">
                  {query ? 'Results' : 'Curated pieces'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {filtered.map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex sm:flex-col gap-3 p-2 bg-[#252420] border border-[#33312c] hover:border-[#c9b293] rounded-2xl transition-colors"
                    >
                      <div className="relative w-16 sm:w-full aspect-[3/4] bg-[#1a1917] shrink-0 overflow-hidden rounded-xl">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="120px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-serif text-[#f4efe9] group-hover:text-[#c9b293] truncate">
                          {product.name}
                        </h3>
                        <span className="text-xs font-mono text-[#a39e94] block mt-1">
                          {formatMoney(product.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
