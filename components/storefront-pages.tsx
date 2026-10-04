'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Trash2,
  X,
  Check,
  Compass,
  Calendar,
  Sparkles,
  MessageSquare,
  Gift,
  Truck,
  Ruler,
  ShieldCheck,
  ZoomIn
} from 'lucide-react'
import { useStore, formatMoney, Product, Review } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { PackagingModal } from '@/components/packaging-modal'
import { SizingGuideModal } from '@/components/sizing-guide-modal'

// ==========================================
// 1. COLLECTION PAGE (4-PILLAR TAXONOMY)
// ==========================================
function CollectionPageContent({ arrivalsOnly = false }: { arrivalsOnly?: boolean }) {
  const { products, setIsProvenanceModalOpen } = useStore()
  const searchParams = useSearchParams()
  const initialCategory = searchParams?.get('category') || 'All'

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const categories = ['All', 'Tailoring', 'Silk Dresses', 'Tops & Shirts', 'Bottoms']
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL']

  const filteredProducts = useMemo(() => {
    let list = products

    if (arrivalsOnly) {
      list = list.filter(p => p.tag === 'New in')
    }

    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory)
    }

    if (selectedSize !== 'All') {
      list = list.filter(p => p.sizes.includes(selectedSize))
    }

    list = list.filter(p => p.price <= maxPrice)

    if (sortBy === 'low-high') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'high-low') {
      list = [...list].sort((a, b) => b.price - a.price)
    }

    return list
  }, [products, arrivalsOnly, selectedCategory, selectedSize, maxPrice, sortBy])

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen">
      {/* Header (Page H1) */}
      <section className="py-16 sm:py-20 border-b border-[#2a2825] bg-[#1a1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-2">
              {arrivalsOnly ? 'Drop / New Arrivals' : 'The Four Wardrobe Pillars'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#f4efe9]">
              {arrivalsOnly ? 'Fresh arrivals' : 'The collection'}
            </h1>
            <p className="text-sm font-sans text-[#a7a297] max-w-md mt-2">
              Considered silhouettes in natural Belgian flax, mulberry silk, and tropical wool. Cut in limited atelier batches of thirty to fifty.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsProvenanceModalOpen(true)}
            className="flex items-center gap-2 text-xs font-mono text-[#c9b293] hover:underline"
          >
            <Compass className="w-4 h-4" />
            <span>Read Textile Provenance</span>
          </button>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[57px] z-30 bg-[#181716]/95 backdrop-blur-md border-b border-[#2b2926] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 border border-[#383530] text-xs font-mono uppercase text-[#c9b293] rounded-full"
          >
            <span>Filters</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#c9b293] text-[#181716] font-semibold'
                    : 'text-[#9c978f] hover:text-[#f4efe9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#7a766e] hidden sm:inline">
              {filteredProducts.length} limited editions
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#21201d] border border-[#36342f] text-[#f4efe9] px-3 py-1.5 text-xs font-mono rounded-full focus:outline-none focus:border-[#c9b293]"
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Grid with Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Sidebar (H2 Filter) */}
          <aside className="hidden md:block col-span-1 p-6 bg-[#21201d] border border-[#35332e] rounded-3xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#302e2a]">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293]">
                Filter Catalog
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedSize('All')
                  setMaxPrice(10000)
                }}
                className="text-[10px] font-mono text-[#8a857d] hover:text-white"
              >
                Reset
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#a7a299] block">Size</span>
              <div className="grid grid-cols-3 gap-1.5">
                {sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 text-xs font-mono rounded-lg border transition-all ${
                      selectedSize === s
                        ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                        : 'border-[#35332e] bg-[#181716] text-[#9c978f] hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#a7a299]">
                <span>Max price</span>
                <span className="text-white">{formatMoney(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c9b293] bg-[#2b2926]"
              />
            </div>

            <div className="pt-4 border-t border-[#302e2a] text-[11px] font-mono text-[#78746c]">
              <p>✓ All items hand-numbered</p>
              <p className="mt-1">✓ Doorstep exchange in 14 days</p>
            </div>
          </aside>

          {/* Grid */}
          <div className="col-span-1 md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center border border-[#2b2926] bg-[#1f1e1b] rounded-3xl text-sm font-serif">
                No items match your selected filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-[#21201d] border-t border-[#36342f] p-6 max-h-[80vh] overflow-y-auto space-y-5 rounded-t-3xl"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#302e2a]">
                <h2 className="font-serif text-lg text-white">Filter Catalog</h2>
                <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#8f8a82]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#a7a299]">Pillar</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3.5 py-1.5 text-xs font-mono rounded-full border ${
                        selectedCategory === c
                          ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                          : 'border-[#36342f] text-[#9c978f]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#a7a299]">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 text-xs font-mono rounded-full border ${
                        selectedSize === s
                          ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                          : 'border-[#36342f] text-[#9c978f]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full"
              >
                Show {filteredProducts.length} pieces
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export function CollectionPage(props: { arrivalsOnly?: boolean }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#181716]" />}>
      <CollectionPageContent {...props} />
    </React.Suspense>
  )
}

// ==========================================
// 2. PRODUCT DETAIL PAGE WITH ATELIER MATRIX & STICKY BUY DOCK
// ==========================================
function ProductPageContent({ slugProp }: { slugProp?: string }) {
  const params = useParams()
  const searchParams = useSearchParams()
  const {
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    setIsSalonModalOpen,
    setIsProvenanceModalOpen,
    setIsStylistDrawerOpen
  } = useStore()

  const rawSlug = slugProp || (params?.slug as string) || searchParams?.get('item')
  const product =
    products.find(p => p.slug === rawSlug || p.id === rawSlug) ||
    products[0]

  const [activeImage, setActiveImage] = useState(product.image)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'S')

  useEffect(() => {
    setActiveImage(product.image)
    setSelectedSize(product.sizes[0] || 'S')
  }, [product.id, product.image])
  const [quantity, setQuantity] = useState(1)
  const [unitMode, setUnitMode] = useState<'in' | 'cm'>('in')
  const [showPackagingModal, setShowPackagingModal] = useState(false)
  const [showSizingModal, setShowSizingModal] = useState(false)
  const [showZoomModal, setShowZoomModal] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeChecked, setPincodeChecked] = useState(false)
  const [showStickyDock, setShowStickyDock] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky dock when scrolled past 480px
      setShowStickyDock(window.scrollY > 480)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      author: 'Priya S.',
      location: 'Kolkata',
      rating: 5,
      date: 'March 2026',
      comment: 'Really beautiful texture. Unlined and breathes easily in warm weather. Fits true to size with elegant ease.',
      helpful: 12
    },
    {
      id: 'rev-2',
      author: 'Ananya R.',
      location: 'Chennai',
      rating: 5,
      date: 'February 2026',
      comment: 'The shoulders sit softly and the drape is effortless. The packaging in cedarwood was extraordinary.',
      helpful: 8
    }
  ])

  const [authorInput, setAuthorInput] = useState('')
  const [commentInput, setCommentInput] = useState('')
  const [submittedReview, setSubmittedReview] = useState(false)

  const gallery = [
    product.image,
    product.detailImage || '/images/real-detail-weave.jpg',
    '/images/real-craft.jpg'
  ]

  const wishlisted = isWishlisted(product.id)

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorInput || !commentInput) return

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorInput,
      location: 'Verified purchase',
      rating: 5,
      date: 'Just now',
      comment: commentInput,
      helpful: 0
    }

    setReviewsList([newRev, ...reviewsList])
    setAuthorInput('')
    setCommentInput('')
    setSubmittedReview(true)
    showToast('Client review submitted')
  }

  const activeMeasurements = product.measurements[selectedSize] || product.measurements['S']

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-10 sm:py-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-[#8a857d] mb-6 flex items-center gap-2">
          <Link href="/collection" className="hover:text-white">Shop</Link>
          <span>/</span>
          <span className="text-[#a7a297]">{product.category}</span>
          <span>/</span>
          <span className="text-[#c9b293]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery with Organic Arch and Macro Loupe Trigger */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-[#201f1c] border border-[#35332e] overflow-hidden rounded-t-[4rem] rounded-b-2xl shadow-2xl group cursor-zoom-in" onClick={() => setShowZoomModal(true)}>
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover filter brightness-[0.94] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Scarcity badge in corner */}
              <div className="absolute top-5 left-6 px-3 py-1 bg-[#181716]/90 border border-[#c9b293]/30 rounded-full text-[10px] font-mono text-[#c9b293] backdrop-blur-md">
                {product.batchNumber} · Only {product.stockRemaining} remain
              </div>

              {/* Macro Loupe Indicator */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowZoomModal(true)
                }}
                className="absolute bottom-5 right-5 p-2.5 bg-[#181716]/85 hover:bg-[#c9b293] hover:text-[#181716] border border-[#38352f] text-xs font-mono text-white rounded-full backdrop-blur-md transition-colors flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider">Inspect Weave</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative aspect-[3/4] bg-[#201f1c] border rounded-2xl overflow-hidden transition-all ${
                    activeImage === src
                      ? 'border-[#c9b293] shadow-md'
                      : 'border-[#2f2d29] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </div>

          {/* Details, Fit Matrix & Purchase (Page H1) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#8a857d] mb-1">
                <span className="uppercase tracking-wider">{product.category} · {product.color}</span>
                <span className="text-[#c9b293]">{product.masterTailor}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-2 text-sm font-mono">
                <span className="text-2xl text-[#f4efe9] tabular-nums font-medium">
                  {formatMoney(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#78736b] line-through">
                    {formatMoney(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-[#8a857d] ml-auto">
                  Edition of {product.editionLimit} pieces
                </span>
              </div>
            </div>

            <p className="text-sm font-sans text-[#a7a297] leading-relaxed">
              {product.description}
            </p>

            {/* ATELIER FIT & MEASUREMENT MATRIX */}
            <div className="p-4 sm:p-5 bg-[#201f1c] border border-[#35332e] rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#c9b293]">
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">Garment Measurements</span>
                </div>
                <div className="flex gap-1 p-0.5 bg-[#181716] rounded-lg border border-[#302e2a]">
                  <button
                    type="button"
                    onClick={() => setUnitMode('in')}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      unitMode === 'in' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                    }`}
                  >
                    IN
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitMode('cm')}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      unitMode === 'cm' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {/* Exact dimensions for selected size */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono">
                {activeMeasurements.chest.cm > 0 && (
                  <div className="p-2 bg-[#181716] rounded-xl border border-[#2d2b27]">
                    <span className="text-[9px] text-[#7d7971] block">CHEST</span>
                    <span className="text-xs text-white">
                      {unitMode === 'in' ? `${activeMeasurements.chest.in}"` : `${activeMeasurements.chest.cm}cm`}
                    </span>
                  </div>
                )}
                {activeMeasurements.shoulder.cm > 0 && (
                  <div className="p-2 bg-[#181716] rounded-xl border border-[#2d2b27]">
                    <span className="text-[9px] text-[#7d7971] block">SHOULDER</span>
                    <span className="text-xs text-white">
                      {unitMode === 'in' ? `${activeMeasurements.shoulder.in}"` : `${activeMeasurements.shoulder.cm}cm`}
                    </span>
                  </div>
                )}
                {activeMeasurements.length.cm > 0 && (
                  <div className="p-2 bg-[#181716] rounded-xl border border-[#2d2b27]">
                    <span className="text-[9px] text-[#7d7971] block">LENGTH</span>
                    <span className="text-xs text-white">
                      {unitMode === 'in' ? `${activeMeasurements.length.in}"` : `${activeMeasurements.length.cm}cm`}
                    </span>
                  </div>
                )}
                {activeMeasurements.waist && activeMeasurements.waist.cm > 0 && (
                  <div className="p-2 bg-[#181716] rounded-xl border border-[#2d2b27]">
                    <span className="text-[9px] text-[#7d7971] block">WAIST</span>
                    <span className="text-xs text-white">
                      {unitMode === 'in' ? `${activeMeasurements.waist.in}"` : `${activeMeasurements.waist.cm}cm`}
                    </span>
                  </div>
                )}
              </div>

              {/* Silhouette Drape Scale */}
              <div className="pt-2 text-xs font-mono flex justify-between items-center text-[#8a857d]">
                <span>Drape Profile:</span>
                <span className="text-[#c9b293] font-semibold">{product.silhouetteFit}</span>
              </div>
            </div>

            {/* Size selection */}
            <div className="space-y-2 pt-1 border-t border-[#292724]">
              <div className="flex justify-between text-xs font-mono text-[#a7a299]">
                <span>Select Size</span>
                <button
                  type="button"
                  onClick={() => setShowSizingModal(true)}
                  className="text-[#c9b293] hover:underline"
                >
                  Size &amp; Proportion Guide →
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-mono border rounded-xl transition-all ${
                      selectedSize === size
                        ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                        : 'border-[#35332e] bg-[#21201d] text-[#a7a299] hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Add to Bag + VIP Stylist */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-[#35332e] bg-[#1d1c1a] px-3 rounded-full">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#9c978f] hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-mono tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#9c978f] hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, selectedSize, product.color, quantity)}
                  className="flex-1 py-4 px-6 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-widest font-semibold transition-colors rounded-full shadow-xl"
                >
                  Add to Bag
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border rounded-full transition-all ${
                    wishlisted
                      ? 'border-[#c9b293] bg-[#c9b293]/15 text-[#c9b293]'
                      : 'border-[#35332e] bg-[#21201d] text-[#a7a299] hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* VIP Stylist Trigger */}
              <button
                type="button"
                onClick={() => setIsStylistDrawerOpen(true)}
                className="w-full py-3 px-4 bg-[#23211e] hover:bg-[#2c2a25] border border-[#38352f] text-xs font-mono text-[#c9b293] rounded-2xl flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Unsure about fit? Consult Head Stylist Ananya</span>
                </span>
                <span className="underline">WhatsApp →</span>
              </button>

              {/* Packaging Preview Trigger */}
              <div className="p-3 bg-[#1e1d1a] border border-[#302e2a] rounded-2xl flex items-center justify-between text-xs font-mono text-[#a7a297]">
                <span className="flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-[#c9b293]" />
                  <span>Includes Cedarwood Box &amp; Linen Dust Cover</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPackagingModal(true)}
                  className="text-[#c9b293] hover:underline"
                >
                  Unboxing Ritual →
                </button>
              </div>

              {/* Courier Delivery Estimator */}
              <div className="p-3.5 bg-[#1e1d1a] border border-[#302e2a] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <Truck className="w-3.5 h-3.5 text-[#c9b293]" />
                  <span>Estimated Courier Arrival</span>
                </div>
                <div className="flex gap-2 text-xs font-mono">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={e => {
                      setPincode(e.target.value)
                      setPincodeChecked(false)
                    }}
                    className="flex-1 p-2 bg-[#181716] border border-[#33312c] rounded-lg text-white focus:outline-none focus:border-[#c9b293]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (pincode.length >= 6) setPincodeChecked(true)
                    }}
                    className="px-3 py-2 bg-[#2d2b26] hover:bg-[#38352f] text-[#c9b293] rounded-lg transition-colors"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <p className="text-[11px] font-mono text-[#55e08b]">
                    ✓ Dispatches tomorrow from Chennai atelier · Delivery estimated by Thursday, Oct 8
                  </p>
                )}
              </div>
            </div>

            {/* Care & Provenance */}
            <div className="pt-4 border-t border-[#292724] text-xs font-sans text-[#8a857d] space-y-1">
              <p><strong>Textile Origin: </strong>{product.origin}</p>
              <p><strong>Care Ritual: </strong>{product.care}</p>
            </div>
          </div>
        </div>

        {/* Client Reviews Section (H2) */}
        <section className="mt-20 pt-10 border-t border-[#292724] max-w-2xl" aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="text-2xl font-serif text-[#f4efe9] mb-4">
            Client Notes ({reviewsList.length})
          </h2>

          <div className="divide-y divide-[#2a2825] mb-8">
            {reviewsList.map(r => (
              <div key={r.id} className="py-4 space-y-1">
                <div className="flex justify-between text-xs font-mono text-[#8f8a82]">
                  <strong className="text-[#f4efe9]">{r.author}</strong>
                  <span>{r.date}</span>
                </div>
                <p className="text-sm font-sans text-[#cfcac2]">{r.comment}</p>
              </div>
            ))}
          </div>

          {submittedReview ? (
            <p className="text-xs font-mono text-[#c9b293]">Thank you for your client note.</p>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-3 text-xs font-mono">
              <input
                type="text"
                required
                placeholder="Client name"
                value={authorInput}
                onChange={e => setAuthorInput(e.target.value)}
                className="w-full p-3 bg-[#21201d] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
              />
              <textarea
                required
                rows={3}
                placeholder="Share your experience on fit, texture, and movement..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                className="w-full p-3 bg-[#21201d] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293] font-sans"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c9b293] text-[#181716] uppercase tracking-wider font-semibold rounded-full hover:bg-[#dfcaa8]"
              >
                Submit Client Review
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Sticky Bottom Purchase Dock on Scroll */}
      <AnimatePresence>
        {showStickyDock && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#1a1917]/95 backdrop-blur-lg border-t border-[#35332e] py-3 px-4 sm:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-13 sm:w-12 sm:h-16 bg-[#181716] rounded-xl overflow-hidden shrink-0 border border-[#33312c]">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-serif text-white truncate max-w-[140px] sm:max-w-xs">{product.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#c9b293] font-medium">{formatMoney(product.price)}</span>
                    <span className="text-[#78746c] hidden sm:inline">· {product.silhouetteFit}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* VIP Stylist Trigger inside dock */}
                <button
                  type="button"
                  onClick={() => setIsStylistDrawerOpen(true)}
                  className="p-2.5 rounded-full border border-[#38352f] bg-[#22211e] hover:border-[#c9b293] text-[#c9b293] transition-colors"
                  aria-label="Stylist WhatsApp Consultation"
                  title="Ask Head Stylist"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {/* Sizing Guide Quick Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setShowSizingModal(true)}
                  className="hidden md:flex items-center gap-1 text-[11px] font-mono text-[#a7a297] hover:text-white px-2 py-1"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#c9b293]" />
                  <span>Size Matrix</span>
                </button>

                {/* Size Pills */}
                <div className="hidden sm:flex gap-1 bg-[#181716] p-1 rounded-xl border border-[#33312c]">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                        selectedSize === s
                          ? 'bg-[#c9b293] text-[#181716] font-semibold'
                          : 'text-[#8a857d] hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Mobile Size Dropdown */}
                <div className="sm:hidden">
                  <select
                    value={selectedSize}
                    onChange={e => setSelectedSize(e.target.value)}
                    className="p-2 bg-[#201f1c] border border-[#38352f] text-xs font-mono rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                  >
                    {product.sizes.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart(product, selectedSize, product.color, quantity)
                    setIsCartOpen(true)
                  }}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap shadow-xl"
                >
                  Add Size {selectedSize}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packaging Modal */}
      <PackagingModal
        isOpen={showPackagingModal}
        onClose={() => setShowPackagingModal(false)}
      />

      {/* Sizing Guide Modal */}
      <SizingGuideModal
        isOpen={showSizingModal}
        onClose={() => setShowSizingModal(false)}
        category={product.category}
        currentSize={selectedSize}
        onSelectSize={(size) => {
          setSelectedSize(size)
          showToast(`Applied Size ${size} based on your proportions`)
        }}
      />

      {/* Textile Zoom Loupe Modal */}
      <AnimatePresence>
        {showZoomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#1b1a18] border border-[#3b3832] rounded-3xl overflow-hidden p-6 space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#2d2b27]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#c9b293]">Atelier Fabric Loupe</span>
                  <h3 className="text-xl font-serif text-white">{product.name} · {product.fabric}</h3>
                </div>
                <button onClick={() => setShowZoomModal(false)} className="p-2 text-[#8a857d] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#33312c]">
                <Image
                  src={activeImage}
                  alt={`${product.name} macro weave`}
                  fill
                  className="object-cover scale-150 transform transition-transform duration-500"
                />
              </div>

              <div className="flex justify-between text-xs font-mono text-[#8a857d] pt-2">
                <span>Natural slub grain &amp; unbroken filament texture</span>
                <span className="text-[#c9b293]">{product.origin}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export function ProductPage({ slug }: { slug?: string }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#181716]" />}>
      <ProductPageContent slugProp={slug} />
    </React.Suspense>
  )
}

// ==========================================
// 3. CART PAGE WITH GIFTING & MONOGRAMMING
// ==========================================
export function CartPage() {
  const { cart, cartSubtotal, removeFromCart, updateQuantity, discountAmount } = useStore()
  const [giftNote, setGiftNote] = useState('')
  const [monogram, setMonogram] = useState('')
  const [showGiftOptions, setShowGiftOptions] = useState(false)

  const freeShipping = cartSubtotal >= 3000
  const finalTotal = Math.max(0, cartSubtotal - discountAmount)

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] pb-4 border-b border-[#292724] mb-8">
          Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="font-serif text-lg text-[#a7a299]">Your bag is currently empty.</p>
            <Link
              href="/collection"
              className="inline-block px-7 py-3 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase font-semibold rounded-full"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="divide-y divide-[#2a2825] border-y border-[#2a2825]">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-[#21201d] shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-base text-[#f4efe9]">{item.name}</h2>
                    <p className="text-xs font-mono text-[#8a857d]">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#35332e] bg-[#1a1917] rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 text-[#9c978f] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1 text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 text-[#9c978f] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#78736b] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-mono tabular-nums">
                    {formatMoney(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Gifting & Monogramming Privilege Box */}
            <div className="p-5 bg-[#201f1c] border border-[#35332e] rounded-2xl space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Gift className="w-4 h-4 text-[#c9b293]" />
                  <span>Complimentary Calligraphy Gift Note &amp; Monogramming</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGiftOptions(!showGiftOptions)}
                  className="text-[#c9b293] underline"
                >
                  {showGiftOptions ? 'Hide' : 'Add Note / Monogram +'}
                </button>
              </div>

              {showGiftOptions && (
                <div className="pt-2 space-y-3 border-t border-[#2e2c28]">
                  <div>
                    <label className="text-[#8a857d] block mb-1">Handwritten Calligraphy Message on Cotton Parchment</label>
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={e => setGiftNote(e.target.value)}
                      placeholder="Write your note for the recipient..."
                      className="w-full p-2.5 bg-[#181716] border border-[#33312c] rounded-xl text-white font-sans focus:outline-none focus:border-[#c9b293]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8a857d] block mb-1">Blind-Embossed Initials (Up to 3 Letters, e.g. M.R.)</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={monogram}
                      onChange={e => setMonogram(e.target.value.toUpperCase())}
                      placeholder="A.S."
                      className="w-36 p-2 bg-[#181716] border border-[#33312c] rounded-xl text-white font-mono focus:outline-none focus:border-[#c9b293]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary (H2) */}
            <div className="p-6 bg-[#201f1c] border border-[#302e2a] rounded-3xl space-y-3 text-xs font-mono">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pb-1">
                Order Summary
              </h2>
              <div className="flex justify-between text-[#8a857d]">
                <span>Subtotal</span>
                <span className="text-white">{formatMoney(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#8a857d]">
                <span>Insured Courier Dispatch</span>
                <span>{freeShipping ? 'Complimentary Insured' : '₹250'}</span>
              </div>
              <div className="pt-2 border-t border-[#302e2a] flex justify-between text-base font-serif text-[#f4efe9]">
                <span>Total</span>
                <span className="font-mono text-[#c9b293] font-medium">
                  {formatMoney(finalTotal + (freeShipping ? 0 : 250))}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold block text-center rounded-full mt-4 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// ==========================================
// 4. CHECKOUT PAGE
// ==========================================
export function CheckoutPage() {
  const { cart, cartSubtotal, discountAmount, clearCart } = useStore()
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const freeShipping = cartSubtotal >= 3000
  const finalTotal = Math.max(0, cartSubtotal - discountAmount) + (freeShipping ? 0 : 250)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
    clearCart()
  }

  if (confirmed) {
    return (
      <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-24 text-center px-4">
        <div className="max-w-md mx-auto p-10 bg-[#21201d] border border-[#35332e] space-y-4 rounded-3xl shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">Order Confirmed</h1>
          <p className="text-xs font-sans text-[#a7a297] leading-relaxed">
            Thank you, {name || 'valued client'}. Your atelier order has been received. Master Draper Ramanathan will begin preparing your archival cedarwood box. A tracking number will be dispatched to {email || 'your email'}.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-7 py-3 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase font-semibold rounded-full"
          >
            Return to Storefront
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-serif text-[#f4efe9] mb-8 pb-3 border-b border-[#292724]">
          Client Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pb-1">
            Shipping &amp; Contact Details
          </h2>

          <div>
            <label className="text-[#a7a299] block mb-1">Email for tracking</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-[#201f1c] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
            />
          </div>

          <div>
            <label className="text-[#a7a299] block mb-1">Client Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 bg-[#201f1c] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
            />
          </div>

          <div>
            <label className="text-[#a7a299] block mb-1">Delivery Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-3 bg-[#201f1c] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
            />
          </div>

          <div className="p-5 bg-[#201f1c] border border-[#35332e] rounded-2xl flex justify-between text-sm font-serif">
            <span>Total Payable</span>
            <span className="font-mono text-[#c9b293] font-medium">{formatMoney(finalTotal)}</span>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-full transition-colors"
          >
            Authorize Payment &amp; Place Order
          </button>
        </form>
      </div>
    </main>
  )
}

// ==========================================
// 5. WISHLIST PAGE
// ==========================================
export function WishlistPage() {
  const { wishlist, products } = useStore()
  const savedProducts = products.filter(p => wishlist.includes(p.id))

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] pb-4 border-b border-[#292724] mb-8">
          Saved Pieces ({savedProducts.length})
        </h1>

        {savedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-lg text-[#a7a299]">Your wishlist is empty.</p>
            <Link
              href="/collection"
              className="inline-block mt-4 px-7 py-3 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase font-semibold rounded-full"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
