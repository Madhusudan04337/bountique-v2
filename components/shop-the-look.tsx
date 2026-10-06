'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sparkles,
  ShoppingBag,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Compass,
  ArrowRight
} from 'lucide-react'
import { styledLooks, useStore, formatMoney, Product } from '@/lib/store'
import { AtelierButton, AtelierBadge, SectionHeader } from '@/components/ui-kit'

export function ShopTheLookSection() {
  const { products, addToCart, addBundleToCart, showToast } = useStore()
  const [activeLookIndex, setActiveLookIndex] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [hoveredGarmentId, setHoveredGarmentId] = useState<string | null>(null)
  const [showHotspots, setShowHotspots] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [selectedHotspotSizes, setSelectedHotspotSizes] = useState<Record<string, string>>({})
  const [bundleSizes, setBundleSizes] = useState<Record<string, string>>({})
  const [justAddedHotspotId, setJustAddedHotspotId] = useState<string | null>(null)
  const [justAddedBundle, setJustAddedBundle] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)

  const currentLook = styledLooks[activeLookIndex] || styledLooks[0]
  const bundledProducts = products.filter(p => currentLook.bundledProductIds.includes(p.id))
  const bundleOriginalTotal = bundledProducts.reduce((sum, p) => sum + p.price, 0)
  const bundleDiscountedTotal = Math.round(
    bundleOriginalTotal * (1 - currentLook.bundleDiscountPercent / 100)
  )

  const lookShortNames = [
    { title: 'Coastal Tailoring', pieces: 'Blazer & Trousers' },
    { title: 'Atelier Evening', pieces: 'Silk Column & Wrap' },
    { title: 'Studio Terrace', pieces: 'Shirt & Midi Skirt' }
  ]

  const handleNextLook = () => {
    setActiveLookIndex((prev) => (prev + 1) % styledLooks.length)
    setActiveHotspot(null)
    setIsZoomed(false)
  }

  const handlePrevLook = () => {
    setActiveLookIndex((prev) => (prev - 1 + styledLooks.length) % styledLooks.length)
    setActiveHotspot(null)
    setIsZoomed(false)
  }

  const handleHotspotSizeSelect = (productId: string, size: string) => {
    setSelectedHotspotSizes(prev => ({ ...prev, [productId]: size }))
  }

  const handleBundleSizeSelect = (productId: string, size: string) => {
    setBundleSizes(prev => ({ ...prev, [productId]: size }))
  }

  const handleAddHotspotToCart = (product: Product) => {
    const size = selectedHotspotSizes[product.id] || product.sizes[0] || 'S'
    addToCart(product, size, product.color, 1)
    setJustAddedHotspotId(product.id)
    setTimeout(() => setJustAddedHotspotId(null), 1500)
  }

  const handleAddCustomBundleToCart = () => {
    bundledProducts.forEach(product => {
      const size = bundleSizes[product.id] || selectedHotspotSizes[product.id] || 'S'
      addToCart(product, size, product.color, 1)
    })
    setJustAddedBundle(true)
    showToast(`Added complete outfit look to bag (10% privilege code applied)`)
    setTimeout(() => setJustAddedBundle(false), 2000)
  }

  return (
    <section className="py-28 bg-[#191817] relative overflow-hidden" aria-labelledby="lookbook-heading">
      {/* Subtle Ambient Vignette */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Lookbook Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#c9b293] block">
                Cycle 4 · Interactive Lookbook Canvas
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c9b293]" />
              <span className="text-[10px] font-sans text-[#8a857d]">
                Hotspot Micro-Interactions
              </span>
            </div>
            <h2 id="lookbook-heading" className="text-3xl sm:text-5xl font-serif text-[#f4efe9]">
              Shop the <em>interactive lookbook.</em>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#a7a297] max-w-lg leading-relaxed">
              Explore curated editorial silhouettes in motion. Tap interactive garment pins to inspect hand-stitched weaves, choose proportions, and bundle ensembles with exclusive privileges.
            </p>
          </div>

          {/* Look Switcher Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 p-1.5 bg-[#201f1c] rounded-2xl sm:rounded-full border border-[#36342e] shadow-xl relative z-20 self-start lg:self-auto">
            {styledLooks.map((look, idx) => {
              const isActive = activeLookIndex === idx
              const shortInfo = lookShortNames[idx] || { title: `Look 0${idx + 1}`, pieces: '' }

              return (
                <button
                  key={look.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveLookIndex(idx)
                    setActiveHotspot(null)
                    setIsZoomed(false)
                  }}
                  className={`px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs font-sans rounded-xl sm:rounded-full transition-all cursor-pointer flex items-center gap-1.5 select-none shrink-0 ${
                    isActive
                      ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-medium shadow-md'
                      : 'border-transparent text-[#a7a297] hover:text-white hover:bg-[#282622]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#181716]' : 'bg-[#c9b293]'}`} />
                  <span className="font-medium tracking-normal">{shortInfo.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Visual with Hotspots */}
          <div
            ref={canvasRef}
            className="lg:col-span-7 relative w-full h-[400px] sm:h-[540px] lg:h-[660px] bg-[#1a1917] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-[#35332e] shadow-2xl group select-none"
            onClick={(e) => {
              // Close hotspot if clicked directly on canvas background
              if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'IMG') {
                setActiveHotspot(null)
              }
            }}
          >
            {/* Editorial Look Image with Zoom Animation */}
            <motion.div
              key={currentLook.image}
              initial={{ opacity: 0.75, scale: 0.98 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.35 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={currentLook.image}
                alt={currentLook.title}
                fill
                className="object-cover object-top filter brightness-[0.93] contrast-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

            {/* Look Active Header Overlay */}
            <div className="absolute top-6 left-6 flex items-center gap-2.5 z-10">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#181716]/95 rounded-full border border-[#3d3a33] text-[11px] font-sans font-medium text-[#c9b293] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55e08b]" />
                <span>{currentLook.title}</span>
              </div>
            </div>

            {/* Canvas Interactive Controls (Top Right) */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
              {/* Hotspot Toggle */}
              <button
                type="button"
                onClick={() => setShowHotspots(!showHotspots)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-sans font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  showHotspots
                    ? 'bg-[#22211e] border-[#c9b293] text-[#c9b293]'
                    : 'bg-[#181716] border-[#38352f] text-[#8a857d] hover:text-white'
                }`}
                title={showHotspots ? 'Hide interactive pins' : 'Show interactive pins'}
              >
                {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-xs">
                  {showHotspots ? 'Pins' : 'Clean'}
                </span>
              </button>

              {/* Texture Loupe Zoom */}
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-sans font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  isZoomed
                    ? 'bg-[#c9b293] border-[#c9b293] text-[#181716] font-medium'
                    : 'bg-[#181716] border-[#38352f] text-[#8a857d] hover:text-white'
                }`}
                title={isZoomed ? 'Reset zoom' : 'Inspect fabric & drape zoom'}
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-xs">
                  {isZoomed ? 'Reset' : 'Zoom'}
                </span>
              </button>
            </div>

            {/* Left/Right Look Navigation Arrows directly on canvas */}
            <button
              type="button"
              onClick={handlePrevLook}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181716]/90 hover:bg-[#181716] border border-[#38352f] hover:border-[#c9b293] text-[#cfcac2] hover:text-white transition-all z-10 cursor-pointer shadow-lg"
              aria-label="Previous look"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextLook}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181716]/90 hover:bg-[#181716] border border-[#38352f] hover:border-[#c9b293] text-[#cfcac2] hover:text-white transition-all z-10 cursor-pointer shadow-lg"
              aria-label="Next look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom Hint Ribbon */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-[#a7a297] pointer-events-none z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#181716]/95 rounded-full border border-[#33312c]">
                <Sparkles className="w-3.5 h-3.5 text-[#c9b293]" />
                <span>Tap pin to inspect details</span>
              </div>
              <span className="hidden sm:inline px-3 py-1 bg-[#181716]/95 rounded-full border border-[#33312c] text-[#8a857d]">
                Atelier Handcrafted Edition
              </span>
            </div>

            {/* Hotspot Micro-Interactions */}
            <AnimatePresence>
              {showHotspots && currentLook.hotspots.map((hotspot) => {
                const isOpen = activeHotspot === hotspot.productId
                const isHoveredInList = hoveredGarmentId === hotspot.productId
                const product = products.find(p => p.id === hotspot.productId)
                const selectedSize = (product && selectedHotspotSizes[product.id]) || (product?.sizes[0] || 'S')
                const isJustAdded = justAddedHotspotId === hotspot.productId

                return (
                  <div
                    key={hotspot.productId}
                    className="absolute z-20"
                    style={{ top: hotspot.top, left: hotspot.left }}
                  >
                    {/* Hotspot Pin Button with Radar Ring */}
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveHotspot(isOpen ? null : hotspot.productId)
                        }}
                        className={`relative group p-1 focus:outline-none cursor-pointer transition-transform duration-300 ${
                          isOpen || isHoveredInList ? 'scale-125 z-30' : 'hover:scale-115'
                        }`}
                        aria-label={`View ${hotspot.productName}`}
                      >
                        {/* Concentric Radar Ring */}
                        <span
                          className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                            isOpen || isHoveredInList
                              ? 'bg-[#c9b293]/50 animate-ping opacity-90'
                              : 'bg-[#c9b293]/30 animate-pulse opacity-60'
                          }`}
                        />

                        {/* Outer Glow Halo */}
                        <span className="absolute -inset-1 rounded-full bg-[#c9b293]/40" />

                        {/* Gold Jewel Core Pin */}
                        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#dfcaa8] to-[#9c8466] text-[#181716] shadow-2xl font-mono text-sm font-bold border border-white/50">
                          {isOpen ? '✕' : '+'}
                        </span>
                      </button>

                      {/* Micro Pill Tag (visible when not open, highlighted on hover) */}
                      {!isOpen && (
                        <div
                          className={`absolute left-9 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 whitespace-nowrap ${
                            isHoveredInList
                              ? 'opacity-100 translate-x-0 scale-105'
                              : 'opacity-85 sm:opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`}
                        >
                          <div className="px-2.5 py-1 bg-[#181716]/95 border border-[#3d3a33] text-xs font-sans text-[#f4efe9] rounded-full shadow-lg flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c9b293]" />
                            <span>{hotspot.productName}</span>
                            <span className="text-[#c9b293] font-medium">{formatMoney(hotspot.price)}</span>
                          </div>
                        </div>
                      )}

                      {/* Hotspot Floating Atelier Card Modal */}
                      {isOpen && product && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 8 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-2 sm:left-8 -top-16 w-64 sm:w-72 max-w-[80vw] p-3.5 sm:p-4 bg-[#1b1a18] border border-[#444038] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40"
                        >
                          {/* Card Header with Close Icon */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-[#c9b293]/15 border border-[#c9b293]/30 text-[#c9b293] text-[9px] font-mono uppercase tracking-wider rounded-full">
                                {product.category}
                              </span>
                              <span className="text-[10px] font-mono text-[#8a857d]">
                                {product.batchNumber || 'Chennai Atelier'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              className="text-[#8a857d] hover:text-white p-1 cursor-pointer"
                              aria-label="Close garment card"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Garment Preview & Specs */}
                          <div className="flex gap-3 items-center mb-3">
                            <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-[#242320] shrink-0 border border-[#38352f]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-serif text-[#f4efe9] font-medium leading-tight">
                                {product.name}
                              </h4>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-sm font-mono text-[#c9b293] font-semibold">
                                  {formatMoney(product.price)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[11px] font-mono text-[#78736b] line-through">
                                    {formatMoney(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-[#99948a] block mt-0.5 truncate">
                                {product.fabric}
                              </span>
                            </div>
                          </div>

                          {/* Quick Size Pills */}
                          <div className="space-y-1.5 mb-3">
                            <div className="flex justify-between text-[10px] font-mono text-[#8a857d]">
                              <span>Choose Size</span>
                              <span className="text-[#c9b293]">Selected: {selectedSize}</span>
                            </div>
                            <div className="flex gap-1.5">
                              {product.sizes.map((sz) => (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => handleHotspotSizeSelect(product.id, sz)}
                                  className={`flex-1 py-1 text-[10px] font-mono rounded-lg border transition-all cursor-pointer ${
                                    selectedSize === sz
                                      ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                                      : 'border-[#35332e] bg-[#22211e] text-[#a7a297] hover:text-white'
                                  }`}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1.5 sm:gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddHotspotToCart(product)}
                              className={`flex-1 py-2 px-3 text-xs font-sans font-medium rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                                isJustAdded
                                  ? 'bg-[#55e08b] text-[#181716]'
                                  : 'bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716]'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Add to Bag</span>
                                </>
                              )}
                            </button>

                            <Link
                              href={`/product/${product.slug}`}
                              className="py-2 px-3 bg-[#24231f] hover:bg-[#2e2d27] text-[#cfcac2] hover:text-white text-xs font-sans font-medium rounded-xl border border-[#38352f] transition-colors flex items-center justify-center"
                            >
                              Specs
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Details & Complete Look Purchase Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-sans font-medium uppercase tracking-wider text-[#c9b293] block">
                  The Coordinated Ensemble
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#f4efe9]">
                {currentLook.title}
              </h3>
              <p className="text-sm font-sans text-[#a7a297] mt-2 leading-relaxed">
                {currentLook.subtitle}
              </p>
            </div>

            {/* List of Pieces in this Look with Bidirectional Hover Highlight */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-sans text-[#8a857d]">
                <span>Garments in this Look ({bundledProducts.length} Pieces)</span>
                <span className="hidden sm:inline">Tap card to locate</span>
              </div>

              {bundledProducts.map(item => {
                const isHovered = hoveredGarmentId === item.id
                const isPinActive = activeHotspot === item.id
                const currentChosenSize = bundleSizes[item.id] || selectedHotspotSizes[item.id] || 'S'

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredGarmentId(item.id)}
                    onMouseLeave={() => setHoveredGarmentId(null)}
                    onClick={() => {
                      setActiveHotspot(item.id)
                      setShowHotspots(true)
                    }}
                    className={`p-3.5 rounded-2xl flex flex-col gap-3 transition-all cursor-pointer border ${
                      isHovered || isPinActive
                        ? 'bg-[#262420] border-[#c9b293] shadow-lg shadow-black/40 -translate-y-0.5'
                        : 'bg-[#201f1c] border-[#32302b] hover:border-[#c9b293]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#181716] shrink-0 border border-[#33312c]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-[#f4efe9] flex items-center gap-2">
                            <span>{item.name}</span>
                            {(isHovered || isPinActive) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9b293]" />
                            )}
                          </h4>
                          <p className="text-xs font-sans text-[#8a857d]">{item.fabric}</p>
                          <span className="text-[11px] font-sans text-[#c9b293] mt-0.5 block">
                            {item.origin}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono text-white block font-medium">
                          {formatMoney(item.price)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(item, currentChosenSize, item.color, 1)
                          }}
                          className="text-xs font-sans font-medium text-[#c9b293] hover:underline cursor-pointer mt-1 block"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>

                    {/* Integrated Size Selection for Bundle */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#2e2c27] text-xs font-sans">
                      <span className="text-[#8a857d]">Size:</span>
                      <div className="flex gap-1">
                        {item.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBundleSizeSelect(item.id, sz)
                            }}
                            className={`px-2 py-0.5 rounded-md border text-xs font-sans transition-all cursor-pointer ${
                              currentChosenSize === sz
                                ? 'bg-[#c9b293] text-[#181716] border-[#c9b293] font-medium'
                                : 'bg-[#181716] text-[#8a857d] border-[#302e29] hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bundle Complete Look Card */}
            <div className="p-5 bg-gradient-to-br from-[#24231f] to-[#1c1b19] border border-[#c9b293]/40 rounded-2xl space-y-3.5 shadow-xl">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-sans uppercase tracking-wider text-[#c9b293] flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Ensemble</span>
                </span>
                <span className="text-xs font-sans font-medium text-[#c9b293] bg-[#c9b293]/10 px-2 py-0.5 rounded-full border border-[#c9b293]/20">
                  {currentLook.bundleDiscountPercent}% Privilege Applied
                </span>
              </div>

              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-serif text-white tabular-nums">
                  {formatMoney(bundleDiscountedTotal)}
                </span>
                {bundleDiscountedTotal < bundleOriginalTotal && (
                  <span className="text-sm font-mono text-[#78736b] line-through">
                    {formatMoney(bundleOriginalTotal)}
                  </span>
                )}
                <span className="text-xs font-sans text-[#8a857d] ml-auto">
                  Save {formatMoney(bundleOriginalTotal - bundleDiscountedTotal)}
                </span>
              </div>

              <AtelierButton
                onClick={handleAddCustomBundleToCart}
                variant="primary"
                size="md"
                fullWidth
                icon={justAddedBundle ? Check : ShoppingBag}
                iconPosition="left"
              >
                {justAddedBundle ? 'Added to Bag' : 'Add Ensemble to Bag'}
              </AtelierButton>

              <div className="flex justify-between items-center text-xs font-sans text-[#8a857d] pt-1">
                <span>Includes Cedarwood Box</span>
                <span className="text-[#c9b293]">Code: LOOK10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
