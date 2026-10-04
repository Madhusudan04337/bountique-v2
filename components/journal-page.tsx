'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, X, BookOpen, Sparkles } from 'lucide-react'

interface Article {
  id: string
  title: string
  date: string
  image: string
  summary: string
  body: string
  readTime: string
}

const articles: Article[] = [
  {
    id: 'layering-notes',
    title: 'The art of layering in warm climates',
    date: 'March 2026',
    image: '/images/real-blazer.jpg',
    readTime: '3 min read',
    summary: 'Varying open weaves and weights to achieve structural depth without trapping warmth.',
    body: 'In coastal climates, layering relies on fiber breathability. An unlined linen blazer layered over a raw silk camisole allows air to circulate freely while presenting clean, architectural lines. By alternating loose Belgian flax weaves with fine sandwashed mulberry silk, the ensemble responds naturally to ambient breeze while holding an intentional silhouette.'
  },
  {
    id: 'belgian-flax',
    title: 'Notes on Belgian flax and gentle washing',
    date: 'February 2026',
    image: '/images/real-craft.jpg',
    readTime: '4 min read',
    summary: 'Why unadulterated linen improves with age, cold washing, and natural drying.',
    body: 'European dew-retted flax possesses natural hollow fibers that soften gradually with each wash cycle. We pre-wash our textiles in our Chennai workshop to stabilize drape before cutting. When cared for with pH-neutral soap and dried away from direct harsh sun, the linen fibers bloom, yielding a supple, buttery hand-feel that outlasts synthetic alternatives.'
  },
  {
    id: 'bias-cut',
    title: 'The fluid geometry of true 45° bias cutting',
    date: 'January 2026',
    image: '/images/real-dress.jpg',
    readTime: '4 min read',
    summary: 'How cutting fabric at a 45-degree diagonal produces natural body contour.',
    body: 'Bias cutting aligns the textile diagonally to the warp and weft grain lines, allowing the weave to expand and contract dynamically around the body. Without restrictive darts, stiff boning, or synthetic elastane, a true bias-cut mulberry silk slip contours gracefully to individual curves while maintaining effortless movement.'
  }
]

export function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16 sm:py-24 selection:bg-[#c9b293] selection:text-[#181716]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-10 border-b border-[#2d2b27] mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201f1c] border border-[#38352f] text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] mb-4">
            <BookOpen className="w-3 h-3" />
            <span>Studio Journal &amp; Essays</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#f4efe9] leading-tight">
            Notes, textiles &amp; <em>craft.</em>
          </h1>
          <p className="text-sm sm:text-base font-sans text-[#a7a297] mt-3 max-w-xl leading-relaxed prose-readable">
            Observations on fiber behavior, drape mechanics, and sustainable wardrobe curation from our Chennai atelier.
          </p>
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
                className="group cursor-pointer flex flex-col bg-[#21201d] border border-[#35332e] hover:border-[#c9b293]/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] bg-[#1a1917] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.93]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#181716]/85 backdrop-blur-md rounded-full text-[9px] font-mono uppercase text-[#c9b293] border border-[#38352f]">
                    {article.readTime}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#8a857d] block">
                      {article.date}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-[#f4efe9] group-hover:text-[#c9b293] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#a7a297] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pt-2 flex items-center gap-1.5 group-hover:underline">
                    <span>Read complete essay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative z-10 w-full max-w-2xl bg-[#201f1c] border border-[#38352f] p-6 sm:p-8 rounded-[2.5rem] text-left space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#2e2c28]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c9b293]">
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-[#8f8a82] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-[#181716] overflow-hidden rounded-2xl border border-[#33312c]">
                <Image src={selectedArticle.image} alt={selectedArticle.title} fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe9] leading-tight">
                  {selectedArticle.title}
                </h3>

                <p className="text-sm font-sans text-[#cfcac2] leading-relaxed prose-readable">
                  {selectedArticle.body}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2e2c28] flex justify-between items-center text-xs font-mono text-[#8a857d]">
                <span>Aurora Atelier Journal</span>
                <Link
                  href="/collection"
                  onClick={() => setSelectedArticle(null)}
                  className="text-[#c9b293] hover:underline"
                >
                  Explore Related Garments →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
