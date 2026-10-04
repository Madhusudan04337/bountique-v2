'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
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
  ZoomIn,
  ShoppingBag,
  Star,
  Lock,
  CreditCard,
  CheckCircle2
} from 'lucide-react'
import { useStore, formatMoney, Product, Review } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { PackagingModal } from '@/components/packaging-modal'
import { SizingGuideModal } from '@/components/sizing-guide-modal'
import { AtelierButton, AtelierBadge, SectionHeader, OrganicCard } from '@/components/ui-kit'

// ==========================================
// 1. COLLECTION PAGE
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
      {/* Header */}
      <section className="py-10 sm:py-16 border-b border-[#2a2825] bg-[#1a1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="mb-2">
              <AtelierBadge variant="gold">
                {arrivalsOnly ? 'Drop / New Arrivals' : 'The Four Wardrobe Pillars'}
              </AtelierBadge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
              {arrivalsOnly ? 'Fresh arrivals' : 'The collection'}
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#a7a297] max-w-md mt-2 leading-relaxed">
              Considered silhouettes in natural Belgian flax, mulberry silk, and tropical wool. Cut in limited atelier batches of thirty to fifty.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsProvenanceModalOpen(true)}
            className="flex items-center gap-2 text-xs font-mono text-[#c9b293] hover:underline cursor-pointer self-start md:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Read Textile Provenance</span>
          </button>
        </div>
      </section>

      {/* Toolbar & Category Switcher */}
      <section className="sticky top-[57px] z-30 bg-[#181716]/95 backdrop-blur-md border-b border-[#2b2926] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 border border-[#383530] text-[11px] font-mono uppercase text-[#c9b293] rounded-full bg-[#201f1c]"
          >
            <span>Filters</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#c9b293] text-[#181716] font-semibold'
                    : 'text-[#9c978f] hover:text-[#f4efe9] bg-[#201f1c]/60 sm:bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono shrink-0">
            <span className="text-[#7a766e] hidden lg:inline">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 items-start">
          {/* Sidebar (Desktop Filter) */}
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
                className="text-[10px] font-mono text-[#8a857d] hover:text-white cursor-pointer"
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
                    className={`py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
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

            <div className="pt-4 border-t border-[#302e2a] text-[11px] font-mono text-[#78746c] space-y-1">
              <p>✓ All items hand-numbered</p>
              <p>✓ Complimentary insured courier</p>
              <p>✓ Doorstep exchange in 14 days</p>
            </div>
          </aside>

          {/* Product Grid: 2-Col Mobile / 2-Col Tablet / 3-Col Desktop */}
          <div className="col-span-1 md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center border border-[#2b2926] bg-[#1f1e1b] rounded-3xl text-sm font-serif">
                No items match your selected filter.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} priority={idx < 4} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-xs bg-[#1d1c1a] border-l border-[#33312c] p-6 text-[#f4efe9] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#302e2a]">
                    <h2 id="mobile-filter-title" className="text-sm font-mono uppercase tracking-wider text-[#c9b293]">
                      Filters
                    </h2>
                    <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#a7a299] hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#a7a299] block">Category</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 text-xs font-mono rounded-full border ${
                            selectedCategory === cat
                              ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                              : 'border-[#383530] text-[#a7a299]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#a7a299] block">Size</span>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2 text-xs font-mono rounded-lg border ${
                            selectedSize === s
                              ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                              : 'border-[#383530] text-[#a7a299]'
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
                      className="w-full accent-[#c9b293]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#302e2a]">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full py-3 bg-[#c9b293] text-[#181716] font-mono text-xs uppercase tracking-widest font-semibold rounded-full"
                  >
                    View Results ({filteredProducts.length})
                  </button>
                </div>
              </motion.div>
            </div>
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
// 2. PRODUCT DETAIL PAGE
// ==========================================
function ProductPageInner({ slug }: { slug?: string }) {
  const params = useParams()
  const searchParams = useSearchParams()
  const {
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    setIsStylistDrawerOpen,
    setIsCartOpen
  } = useStore()

  const rawSlug = slug || (params?.slug as string) || searchParams?.get('item')
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
  const [showFullStory, setShowFullStory] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeChecked, setPincodeChecked] = useState(false)
  const [showStickyDock, setShowStickyDock] = useState(false)

  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    measurements: true,
    provenance: false,
    packaging: false,
    shipping: false,
    reviews: false
  })

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyDock(window.scrollY > 420)
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

  const activeMeasurements =
    (product.measurements && product.measurements[selectedSize]) ||
    (product.measurements && product.measurements['S']) ||
    (product.measurements && product.measurements[product.sizes[0]]) ||
    (product.measurements && Object.values(product.measurements)[0]) ||
    {}

  const isTopOrShirt = product.category === 'Tops & Shirts'
  const isBottom = product.category === 'Bottoms'
  const isDress = product.category === 'Silk Dresses'

  const measurementMetrics = useMemo(() => {
    if (!activeMeasurements) return []

    if (isBottom) {
      return [
        { label: 'WAIST', val: activeMeasurements.waist },
        { label: 'HIP', val: activeMeasurements.hip },
        { label: 'LENGTH', val: activeMeasurements.length }
      ].filter(m => m.val && m.val.cm > 0)
    }

    if (isDress) {
      return [
        { label: 'BUST', val: activeMeasurements.chest },
        { label: 'WAIST', val: activeMeasurements.waist },
        { label: 'LENGTH', val: activeMeasurements.length }
      ].filter(m => m.val && m.val.cm > 0)
    }

    if (isTopOrShirt) {
      return [
        { label: 'CHEST', val: activeMeasurements.chest },
        { label: 'SHOULDER', val: activeMeasurements.shoulder },
        { label: 'LENGTH', val: activeMeasurements.length }
      ].filter(m => m.val && m.val.cm > 0)
    }

    return [
      { label: 'CHEST', val: activeMeasurements.chest },
      { label: 'SHOULDER', val: activeMeasurements.shoulder },
      { label: 'LENGTH', val: activeMeasurements.length },
      { label: 'SLEEVE', val: activeMeasurements.sleeve }
    ].filter(m => m.val && m.val.cm > 0)
  }, [activeMeasurements, isBottom, isDress, isTopOrShirt])

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-8 sm:py-14 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Contextual Back Navigation */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#282622]">
          <div className="text-xs font-mono text-[#8a857d] flex items-center gap-1.5 sm:gap-2 truncate">
            <Link href="/collection" className="hover:text-[#c9b293] transition-colors">Catalog</Link>
            <span>/</span>
            <Link
              href={`/collection?category=${encodeURIComponent(product.category)}`}
              className="text-[#a7a297] hover:text-[#c9b293] transition-colors truncate"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#c9b293] truncate">{product.name}</span>
          </div>

          <Link
            href="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a7a297] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Catalog</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div
              className="relative aspect-[3/4] w-full bg-[#201f1c] border border-[#35332e] overflow-hidden rounded-t-[3rem] sm:rounded-t-[4rem] rounded-b-2xl shadow-2xl group cursor-zoom-in"
              onClick={() => setShowZoomModal(true)}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover filter brightness-[0.94] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Scarcity badge in corner */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-6 px-3 py-1 bg-[#181716]/90 border border-[#c9b293]/30 rounded-full text-[10px] font-mono text-[#c9b293] backdrop-blur-md">
                {product.batchNumber} · Only {product.stockRemaining} left
              </div>

              {/* Macro Loupe Indicator */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowZoomModal(true)
                }}
                className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 p-2 sm:p-2.5 bg-[#181716]/85 hover:bg-[#c9b293] hover:text-[#181716] border border-[#38352f] text-xs font-mono text-white rounded-full backdrop-blur-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider">Inspect Weave</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative aspect-[3/4] bg-[#201f1c] border rounded-xl sm:rounded-2xl overflow-hidden transition-all cursor-pointer ${
                    activeImage === src
                      ? 'border-[#c9b293] shadow-md scale-[1.02]'
                      : 'border-[#2f2d29] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Primary Purchasing Zone + Progressive Disclosure Accordions */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. PRIMARY TITLE, METADATA & PRICING */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#8a857d] mb-1">
                <span className="uppercase tracking-wider">{product.category} · {product.color}</span>
                <span className="text-[#c9b293]">{product.masterTailor}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif text-[#f4efe9] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-2 text-sm font-mono">
                <span className="text-2xl sm:text-3xl text-[#f4efe9] tabular-nums font-medium">
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

            {/* Concise Short Description with Progressive Disclosure Toggle */}
            <div className="text-xs sm:text-sm font-sans text-[#cfcac2] leading-relaxed">
              <p>
                {showFullStory ? product.description : `${product.description.slice(0, 140)}...`}
              </p>
              <button
                type="button"
                onClick={() => setShowFullStory(!showFullStory)}
                className="text-xs font-mono text-[#c9b293] hover:underline mt-1.5 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{showFullStory ? 'Show less' : 'Read full textile story →'}</span>
              </button>
            </div>

            {/* 2. SIZE SELECTION & MEASUREMENT MODAL TRIGGER */}
            <div className="space-y-2 pt-2 border-t border-[#292724]">
              <div className="flex justify-between text-xs font-mono text-[#a7a299]">
                <span>Select Size: <strong className="text-white">{selectedSize}</strong></span>
                <button
                  type="button"
                  onClick={() => setShowSizingModal(true)}
                  className="text-[#c9b293] hover:underline cursor-pointer"
                >
                  Size Guide →
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-mono border rounded-xl transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold shadow-md'
                        : 'border-[#35332e] bg-[#21201d] text-[#a7a299] hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PRIMARY PURCHASE ACTION & QUANTITY COUNTER */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-2.5 sm:gap-3">
                <div className="flex items-center border border-[#35332e] bg-[#1d1c1a] px-2 sm:px-3 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#9c978f] hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-mono tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#9c978f] hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <AtelierButton
                  onClick={() => {
                    addToCart(product, selectedSize, product.color, quantity)
                    setIsCartOpen(true)
                  }}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Add Size {selectedSize} to Bag
                </AtelierButton>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 sm:p-4 border rounded-full transition-all shrink-0 cursor-pointer ${
                    wishlisted
                      ? 'border-[#c9b293] bg-[#c9b293]/15 text-[#c9b293]'
                      : 'border-[#35332e] bg-[#21201d] text-[#a7a299] hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* VIP Stylist Consultation */}
              <button
                type="button"
                onClick={() => setIsStylistDrawerOpen(true)}
                className="w-full py-2.5 px-4 bg-[#23211e] hover:bg-[#2c2a25] border border-[#38352f] text-xs font-mono text-[#c9b293] rounded-full flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Unsure about proportions? Ask Stylist Ananya</span>
                </span>
                <span className="underline shrink-0">WhatsApp →</span>
              </button>
            </div>

            {/* 4. PROGRESSIVE DISCLOSURE ACCORDIONS */}
            <div className="pt-4 border-t border-[#292724] space-y-2">
              {/* Accordion 1: Tailoring & Dimensions */}
              <div className="border border-[#33312c] bg-[#1e1d1a] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('measurements')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[#f4efe9] hover:text-[#c9b293] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Ruler className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Tailoring Proportions &amp; Measurements</span>
                  </span>
                  {openAccordions.measurements ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordions.measurements && (
                  <div className="p-4 pt-0 space-y-3 text-xs font-mono border-t border-[#2b2926] animate-in fade-in">
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#8a857d]">Unit System:</span>
                      <div className="flex gap-1 p-0.5 bg-[#181716] rounded-lg border border-[#302e2a]">
                        <button
                          type="button"
                          onClick={() => setUnitMode('in')}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                            unitMode === 'in' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                          }`}
                        >
                          IN
                        </button>
                        <button
                          type="button"
                          onClick={() => setUnitMode('cm')}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                            unitMode === 'cm' ? 'bg-[#c9b293] text-[#181716] font-semibold' : 'text-[#8a857d]'
                          }`}
                        >
                          CM
                        </button>
                      </div>
                    </div>

                    <div className={`grid ${measurementMetrics.length === 3 ? 'grid-cols-3' : measurementMetrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-2 text-center`}>
                      {measurementMetrics.map((item) => (
                        <div key={item.label} className="p-2 bg-[#181716] rounded-xl border border-[#2d2b27]">
                          <span className="text-[9px] text-[#7d7971] block font-semibold">{item.label}</span>
                          <span className="text-xs sm:text-sm text-white font-medium">
                            {unitMode === 'in' ? `${item.val.in}"` : `${item.val.cm}cm`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1 flex justify-between items-center text-[#8a857d]">
                      <span>Drape Contour:</span>
                      <span className="text-[#c9b293]">{product.silhouetteFit}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Provenance & Care */}
              <div className="border border-[#33312c] bg-[#1e1d1a] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('provenance')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[#f4efe9] hover:text-[#c9b293] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Fabric Provenance &amp; Care Ritual</span>
                  </span>
                  {openAccordions.provenance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordions.provenance && (
                  <div className="p-4 pt-0 space-y-2 text-xs font-sans text-[#a7a297] border-t border-[#2b2926] animate-in fade-in">
                    <p className="pt-2"><strong>Origin: </strong>{product.origin}</p>
                    <p><strong>Fabric: </strong>{product.fabric}</p>
                    <p><strong>Care Ritual: </strong>{product.care}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Presentation & Packaging */}
              <div className="border border-[#33312c] bg-[#1e1d1a] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('packaging')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[#f4efe9] hover:text-[#c9b293] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Archival Unboxing &amp; Cedarwood Presentation</span>
                  </span>
                  {openAccordions.packaging ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordions.packaging && (
                  <div className="p-4 pt-0 space-y-3 text-xs font-sans text-[#a7a297] border-t border-[#2b2926] animate-in fade-in">
                    <p className="pt-2">
                      Every piece is folded in acid-free unbleached tissue, sealed in a custom rigid cedarwood case with a hand-stitched Belgian linen garment cover and numbered certificate.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPackagingModal(true)}
                      className="text-xs font-mono text-[#c9b293] hover:underline cursor-pointer block"
                    >
                      View Unboxing Ritual →
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 4: Estimated Courier Delivery */}
              <div className="border border-[#33312c] bg-[#1e1d1a] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[#f4efe9] hover:text-[#c9b293] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Complimentary Courier &amp; Pincode Check</span>
                  </span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordions.shipping && (
                  <div className="p-4 pt-0 space-y-3 text-xs font-mono border-t border-[#2b2926] animate-in fade-in">
                    <div className="pt-2 flex gap-2">
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
                        className="px-3 py-2 bg-[#2d2b26] hover:bg-[#38352f] text-[#c9b293] rounded-lg transition-colors cursor-pointer"
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
                )}
              </div>

              {/* Accordion 5: Client Notes & Reviews */}
              <div className="border border-[#33312c] bg-[#1e1d1a] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('reviews')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[#f4efe9] hover:text-[#c9b293] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Client Notes &amp; Reviews ({reviewsList.length})</span>
                  </span>
                  {openAccordions.reviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordions.reviews && (
                  <div className="p-4 pt-0 space-y-4 border-t border-[#2b2926] animate-in fade-in">
                    <div className="divide-y divide-[#2a2825]">
                      {reviewsList.map(r => (
                        <div key={r.id} className="py-3 space-y-1">
                          <div className="flex justify-between text-xs font-mono text-[#8f8a82]">
                            <strong className="text-[#f4efe9]">{r.author}</strong>
                            <span>{r.date}</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans text-[#cfcac2]">{r.comment}</p>
                        </div>
                      ))}
                    </div>

                    {submittedReview ? (
                      <p className="text-xs font-mono text-[#c9b293]">Thank you for your client note.</p>
                    ) : (
                      <form onSubmit={handleAddReview} className="space-y-2.5 text-xs font-mono pt-2 border-t border-[#2a2825]">
                        <input
                          type="text"
                          required
                          placeholder="Client name"
                          value={authorInput}
                          onChange={e => setAuthorInput(e.target.value)}
                          className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
                        />
                        <textarea
                          required
                          rows={2}
                          placeholder="Share your experience on fit, texture, and movement..."
                          value={commentInput}
                          onChange={e => setCommentInput(e.target.value)}
                          className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293] font-sans"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#c9b293] text-[#181716] uppercase tracking-wider font-semibold rounded-full hover:bg-[#dfcaa8] cursor-pointer"
                        >
                          Submit Note
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Purchase Dock on Scroll */}
      <AnimatePresence>
        {showStickyDock && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#1a1917]/95 backdrop-blur-lg border-t border-[#35332e] py-2.5 px-4 sm:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-12 sm:w-11 sm:h-14 bg-[#181716] rounded-lg overflow-hidden shrink-0 border border-[#33312c]">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-serif text-white truncate max-w-[120px] sm:max-w-xs">{product.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#c9b293] font-medium">{formatMoney(product.price)}</span>
                    <span className="text-[#78746c] hidden sm:inline">· {product.silhouetteFit}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsStylistDrawerOpen(true)}
                  className="p-2 rounded-full border border-[#38352f] bg-[#22211e] hover:border-[#c9b293] text-[#c9b293] transition-colors cursor-pointer"
                  aria-label="Stylist WhatsApp Consultation"
                  title="Ask Head Stylist"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>

                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="p-2 bg-[#201f1c] border border-[#38352f] text-xs font-mono rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                >
                  {product.sizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <AtelierButton
                  onClick={() => {
                    addToCart(product, selectedSize, product.color, quantity)
                    setIsCartOpen(true)
                  }}
                  variant="primary"
                  size="sm"
                >
                  Add {selectedSize}
                </AtelierButton>
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
                <button onClick={() => setShowZoomModal(false)} className="p-2 text-[#8a857d] hover:text-white cursor-pointer">
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
      <ProductPageInner slug={slug} />
    </React.Suspense>
  )
}

// ==========================================
// 3. CART PAGE
// ==========================================
export function CartPage() {
  const {
    cart,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon
  } = useStore()
  const [couponCode, setCouponCode] = useState('')

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (applyCoupon(couponCode)) {
      setCouponCode('')
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount)

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Shopping Bag"
          title="Your selected silhouettes."
          description="Complimentary insured courier delivery across India."
        />

        {cart.length === 0 ? (
          <div className="p-12 sm:p-16 text-center border border-[#33312c] bg-[#201f1c] rounded-3xl space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-[#c9b293]" />
            <h2 className="text-2xl font-serif">Your shopping bag is empty.</h2>
            <p className="text-xs sm:text-sm font-sans text-[#a7a297] max-w-sm mx-auto">
              Explore our unhurried limited editions cut from Belgian flax and Tamil Nadu mulberry silk.
            </p>
            <div className="pt-2">
              <AtelierButton href="/collection" variant="primary" size="md">
                Explore The Collection
              </AtelierButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {cart.map(item => (
                <div key={item.id} className="p-4 bg-[#21201d] border border-[#35332e] rounded-2xl flex gap-4 items-center">
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 bg-[#181716] rounded-xl overflow-hidden shrink-0 border border-[#302e29]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-serif text-white truncate max-w-[180px] sm:max-w-xs">
                          <Link href={`/product/${item.slug}`} className="hover:text-[#c9b293]">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-[11px] font-mono text-[#8a857d]">
                          {item.color} · Size: {item.size}
                        </p>
                      </div>
                      <span className="text-sm font-mono text-white tabular-nums font-semibold">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#36342f] bg-[#181716] rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2.5 text-[#9c978f] hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 text-xs font-mono tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2.5 text-[#9c978f] hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-mono text-[#8a857d] hover:text-[#e89069] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout Trigger */}
            <div className="lg:col-span-5 p-6 bg-[#21201d] border border-[#35332e] rounded-3xl space-y-5 shadow-xl">
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#c9b293] pb-2 border-b border-[#302e2a]">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#a7a297]">
                  <span>Subtotal</span>
                  <span className="text-white">{formatMoney(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#55e08b]">
                    <span>Privilege ({appliedCoupon})</span>
                    <span>-{formatMoney(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#a7a297]">
                  <span>Insured Courier</span>
                  <span className="text-[#55e08b]">Complimentary</span>
                </div>
                <div className="pt-3 border-t border-[#302e2a] flex justify-between text-sm text-white font-semibold">
                  <span>Total Amount</span>
                  <span className="text-base text-[#c9b293] tabular-nums">{formatMoney(finalTotal)}</span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Privilege code (e.g. AURORA15)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#181716] border border-[#36342f] rounded-xl text-xs font-mono uppercase text-white focus:outline-none focus:border-[#c9b293]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2a2825] hover:bg-[#38352f] text-[#c9b293] rounded-xl text-xs font-mono uppercase font-semibold cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </form>

              <AtelierButton href="/checkout" variant="primary" size="lg" fullWidth>
                Proceed to Checkout →
              </AtelierButton>
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
  const router = useRouter()
  const { cart, cartSubtotal, discountAmount, clearCart, showToast } = useStore()
  const [step, setStep] = useState<'shipping' | 'payment' | 'complete'>('shipping')
  const [formData, setFormData] = useState({
    name: 'Madhusudan',
    email: 'madhusudan@aurora.com',
    phone: '+91 98765 43210',
    address: '42, Khader Nawaz Khan Road, Nungambakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600006'
  })

  const finalTotal = Math.max(0, cartSubtotal - discountAmount)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('complete')
    clearCart()
    showToast('Order confirmed with Chennai atelier')
  }

  if (step === 'complete') {
    return (
      <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-lg w-full p-8 sm:p-12 bg-[#21201d] border border-[#38352f] rounded-3xl text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#55e08b]/15 border border-[#55e08b]/40 text-[#55e08b] flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <AtelierBadge variant="emerald">Order Confirmed</AtelierBadge>
          <h1 className="text-3xl font-serif text-white">Edition Reserved.</h1>
          <p className="text-xs sm:text-sm font-sans text-[#a7a297] leading-relaxed">
            Your piece is queued for hand-cutting and basted canvas assembly inside our Chennai atelier. A tracking itinerary has been sent to your email.
          </p>
          <div className="pt-4">
            <AtelierButton href="/" variant="primary" size="md">
              Return to Atelier Home
            </AtelierButton>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Secured Checkout"
          title="Complete your order."
          description="Complimentary insured courier delivery and cedarwood presentation box."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-[#21201d] border border-[#35332e] rounded-3xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pb-2 border-b border-[#302e2a]">
                1. Client &amp; Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="text"
                  required
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="text"
                  required
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="sm:col-span-2 p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="p-3 bg-[#181716] border border-[#35332e] rounded-xl text-white focus:outline-none focus:border-[#c9b293]"
                />
              </div>
            </div>

            <div className="p-6 bg-[#21201d] border border-[#35332e] rounded-3xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pb-2 border-b border-[#302e2a]">
                2. Payment Method
              </h2>
              <div className="p-4 border border-[#c9b293]/40 bg-[#181716] rounded-2xl flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#c9b293]" />
                  <span>UPI / Netbanking / Credit Card (Secured Razorpay)</span>
                </span>
                <span className="text-[#55e08b]">Active</span>
              </div>
              <AtelierButton type="submit" variant="primary" size="lg" fullWidth>
                Confirm &amp; Place Order ({formatMoney(finalTotal)})
              </AtelierButton>
            </div>
          </form>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#21201d] border border-[#35332e] rounded-3xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#c9b293] pb-2 border-b border-[#302e2a]">
                Order Items ({cart.length})
              </h2>
              <div className="divide-y divide-[#2a2825] max-h-60 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="truncate max-w-[180px]">{item.name} ({item.size}) × {item.quantity}</span>
                    <span className="text-white tabular-nums">{formatMoney(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#302e2a] flex justify-between text-sm font-mono text-white font-semibold">
                <span>Total Amount:</span>
                <span className="text-[#c9b293]">{formatMoney(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ==========================================
// 5. WISHLIST PAGE
// ==========================================
export function WishlistPage() {
  const { wishlist, products, toggleWishlist } = useStore()

  const wishlistedItems = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id))
  }, [products, wishlist])

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Curated Wishlist"
          title="Your saved silhouettes."
          description="Hand-selected pieces saved for your next atelier fitting or order."
        />

        {wishlistedItems.length === 0 ? (
          <div className="p-12 sm:p-16 text-center border border-[#33312c] bg-[#201f1c] rounded-3xl space-y-4">
            <Heart className="w-12 h-12 mx-auto text-[#c9b293]" />
            <h2 className="text-2xl font-serif">Your wishlist is empty.</h2>
            <p className="text-xs sm:text-sm font-sans text-[#a7a297] max-w-sm mx-auto">
              Tap the heart icon on any silhouette to reserve it in your personal lookbook.
            </p>
            <div className="pt-2">
              <AtelierButton href="/collection" variant="primary" size="md">
                Browse Silhouettes
              </AtelierButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {wishlistedItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
