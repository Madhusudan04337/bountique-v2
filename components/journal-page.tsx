'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'

interface Article {
  id: string
  title: string
  date: string
  image: string
  summary: string
  body: string
}

const articles: Article[] = [
  {
    id: 'layering-notes',
    title: 'The art of layering in warm climates',
    date: 'March 2026',
    image: '/images/real-blazer.jpg',
    summary: 'Varying open weaves and weights to achieve structural depth without warmth.',
    body: 'In coastal climates, layering relies on fiber breathability. An unlined linen blazer layered over a raw silk camisole allows air to circulate freely while presenting clean, architectural lines.'
  },
  {
    id: 'belgian-flax',
    title: 'Notes on Belgian flax and washing',
    date: 'February 2026',
    image: '/images/real-craft.jpg',
    summary: 'Why unadulterated linen improves with age and gentle cold washing.',
    body: 'European flax has natural hollow fibers that soften gradually with each wash. We pre-wash our fabrics in our Chennai workshop to stabilize drape before cutting.'
  },
  {
    id: 'bias-cut',
    title: 'The fluid geometry of bias cutting',
    date: 'January 2026',
    image: '/images/real-dress.jpg',
    summary: 'How cutting fabric at a 45-degree diagonal produces natural contour.',
    body: 'Bias cutting aligns the textile diagonally to the grain line, allowing the weave to flex naturally around the body without restrictive darts or stiff boning.'
  }
]

export function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page H1 */}
        <div className="pb-8 border-b border-[#292724] mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block mb-1">
            Studio Journal
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#f4efe9]">
            Notes &amp; textiles
          </h1>
        </div>

        {/* Articles Section (H2 -> H3) */}
        <section aria-labelledby="journal-notes-heading">
          <h2 id="journal-notes-heading" className="sr-only">
            Published Journal Notes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer flex flex-col bg-[#201f1c] border border-[#2f2d29] hover:border-[#4d4942] rounded-3xl overflow-hidden transition-colors"
              >
                <div className="relative aspect-[4/3] bg-[#1a1917] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#8a857d] block mb-1">
                      {article.date}
                    </span>
                    <h3 className="text-lg font-serif text-[#f4efe9] group-hover:text-[#c9b293] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs font-sans text-[#a7a299] mt-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#c9b293] pt-2 flex items-center gap-1">
                    Read note <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-xl bg-[#201f1c] border border-[#36342f] p-6 rounded-3xl text-left space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#2d2b27]">
                <span className="text-xs font-mono text-[#c9b293]">{selectedArticle.date}</span>
                <button onClick={() => setSelectedArticle(null)} className="p-1 text-[#8f8a82]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-[#181716] overflow-hidden rounded-2xl">
                <Image src={selectedArticle.image} alt={selectedArticle.title} fill className="object-cover" />
              </div>

              <h3 className="text-2xl font-serif text-[#f4efe9] leading-snug">
                {selectedArticle.title}
              </h3>

              <p className="text-sm font-sans text-[#cfcac2] leading-relaxed">
                {selectedArticle.body}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
