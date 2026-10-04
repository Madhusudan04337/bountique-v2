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
    { title: 'Coastal Tailoring', pieces: 'Blazer & Trousers', code: 'LOOK #01' },
    { title: 'Atelier Evening', pieces: 'Silk Column & Wrap', code: 'LOOK #02' },
    { title: 'Studio Terrace', pieces: 'Shirt & Midi Skirt', code: 'LOOK #03' }
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
    <section className="py-24 bg-[#191817] border-y border-[#2a2825]" aria-labelledby="lookbook-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Lookbook Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block">
                Cycle 4 · Interactive Lookbook Canvas
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c9b293]" />
              <span className="text-[10px] font-mono text-[#8a857d]">
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
          <div
            className="flex flex-wrap sm:flex-nowrap gap-2 p-1.5 bg-[#201f1c] rounded-full border border-[#36342e] w-fit shadow-xl relative z-20"
            role="tablist"
            aria-label="Lookbook Outfits"
          >
            {styledLooks.map((look, idx) => {
              const isActive = activeLookIndex === idx
              const shortInfo = lookShortNames[idx] || { title: `Look 0${idx + 1}`, pieces: '', code: `LOOK #0${idx + 1}` }

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
                  className={`px-4 sm:px-5 py-2.5 text-xs font-mono rounded-full transition-all cursor-pointer flex items-center gap-2 select-none ${
                    isActive
                      ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold shadow-[0_0_20px_rgba(201,178,147,0.35)] scale-[1.02]'
                      : 'border-transparent text-[#a7a297] hover:text-white hover:bg-[#282723]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#181716]' : 'bg-[#c9b293]'}`} />
                  <span className="font-semibold tracking-wider">{shortInfo.code}</span>
                  <span className={`hidden sm:inline text-[11px] font-normal ${isActive ? 'text-[#181716]' : 'text-[#7e7970]'}`}>
                    · {shortInfo.title}
                  </span>
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
            className="lg:col-span-7 relative w-full h-[540px] sm:h-[680px] bg-[#1a1917] rounded-[3rem] overflow-hidden border border-[#35332e] shadow-2xl group select-none"
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
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#181716]/90 backdrop-blur-md rounded-full border border-[#3d3a33] text-[10px] font-mono uppercase tracking-widest text-[#c9b293] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55e08b] animate-pulse" />
                <span>Look 0{activeLookIndex + 1} of 03 · {currentLook.title}</span>
              </div>
            </div>

            {/* Canvas Interactive Controls (Top Right) */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
              {/* Hotspot Toggle */}
              <button
                type="button"
                onClick={() => setShowHotspots(!showHotspots)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  showHotspots
                    ? 'bg-[#22211e]/90 border-[#c9b293] text-[#c9b293]'
                    : 'bg-[#181716]/80 border-[#38352f] text-[#8a857d] hover:text-white'
                }`}
                title={showHotspots ? 'Hide interactive pins' : 'Show interactive pins'}
              >
                {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                  {showHotspots ? 'Pins Active' : 'Pure Photo'}
                </span>
              </button>

              {/* Texture Loupe Zoom */}
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  isZoomed
                    ? 'bg-[#c9b293] border-[#c9b293] text-[#181716] font-semibold'
                    : 'bg-[#181716]/80 border-[#38352f] text-[#8a857d] hover:text-white'
                }`}
                title={isZoomed ? 'Reset zoom' : 'Inspect fabric & drape zoom'}
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                  {isZoomed ? 'Reset' : 'Zoom Drape'}
                </span>
              </button>
            </div>

            {/* Left/Right Look Navigation Arrows directly on canvas */}
            <button
              type="button"
              onClick={handlePrevLook}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181716]/75 hover:bg-[#181716] border border-[#38352f] hover:border-[#c9b293] text-[#cfcac2] hover:text-white backdrop-blur-md transition-all z-10 cursor-pointer shadow-lg"
              aria-label="Previous look"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextLook}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181716]/75 hover:bg-[#181716] border border-[#38352f] hover:border-[#c9b293] text-[#cfcac2] hover:text-white backdrop-blur-md transition-all z-10 cursor-pointer shadow-lg"
              aria-label="Next look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom Hint Ribbon */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-[#a7a297] pointer-events-none z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#181716]/85 backdrop-blur-md rounded-full border border-[#33312c]">
                <Sparkles className="w-3 h-3 text-[#c9b293]" />
                <span>Tap any gold pin to inspect craft details or select sizes</span>
              </div>
              <span className="hidden sm:inline px-3 py-1 bg-[#181716]/85 backdrop-blur-md rounded-full border border-[#33312c] text-[#8a857d]">
                100% Raw Fiber Atelier Tailoring
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
                        <span className="absolute -inset-1 rounded-full bg-[#c9b293]/40 blur-xs" />

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
                          <div className="px-2.5 py-1 bg-[#181716]/90 border border-[#3d3a33] text-[9px] font-mono text-[#f4efe9] rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#c9b293]" />
                            <span>{hotspot.productName}</span>
                            <span className="text-[#c9b293] font-semibold">{formatMoney(hotspot.price)}</span>
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
                          className="absolute left-8 -top-16 w-72 p-4 bg-[#1b1a18]/95 border border-[#444038] backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40"
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
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddHotspotToCart(product)}
                              className={`flex-1 py-2 px-3 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                                isJustAdded
                                  ? 'bg-[#55e08b] text-[#181716]'
                                  : 'bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716]'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added to Bag</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Add Piece ({selectedSize})</span>
                                </>
                              )}
                            </button>

                            <Link
                              href={`/product/${product.slug}`}
                              className="py-2 px-3 bg-[#24231f] hover:bg-[#2e2d27] text-[#cfcac2] hover:text-white text-[10px] font-mono uppercase tracking-wider rounded-xl border border-[#38352f] transition-colors flex items-center justify-center"
                            >
                              Specs →
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
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                  The Coordinated Ensemble
                </span>
                <span className="text-[10px] font-mono text-[#8a857d]">
                  · Look 0{activeLookIndex + 1}
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
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-[#8a857d]">
                <span>Garments in this Look ({bundledProducts.length} Pieces)</span>
                <span>Hover card to locate pin</span>
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
                          <p className="text-[11px] font-mono text-[#8a857d]">{item.fabric}</p>
                          <span className="text-[10px] font-mono text-[#c9b293] mt-0.5 block">
                            {item.origin}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono text-white block font-semibold">
                          {formatMoney(item.price)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(item, currentChosenSize, item.color, 1)
                          }}
                          className="text-[10px] font-mono text-[#c9b293] hover:underline cursor-pointer mt-1 block"
                        >
                          + Add piece
                        </button>
                      </div>
                    </div>

                    {/* Integrated Size Selection for Bundle */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#2e2c27] text-[10px] font-mono">
                      <span className="text-[#8a857d]">Ensemble Size:</span>
                      <div className="flex gap-1">
                        {item.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBundleSizeSelect(item.id, sz)
                            }}
                            className={`px-2 py-0.5 rounded-md border text-[9px] transition-all cursor-pointer ${
                              currentChosenSize === sz
                                ? 'bg-[#c9b293] text-[#181716] border-[#c9b293] font-bold'
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
                <span className="text-xs font-mono uppercase tracking-wider text-[#c9b293] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Coordinated Ensemble Privilege</span>
                </span>
                <span className="text-[10px] font-mono text-[#c9b293] bg-[#c9b293]/10 px-2 py-0.5 rounded-full border border-[#c9b293]/20">
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
                <span className="text-xs font-mono text-[#8a857d] ml-auto">
                  Save {formatMoney(bundleOriginalTotal - bundleDiscountedTotal)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomBundleToCart}
                className={`w-full py-4 font-mono text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  justAddedBundle
                    ? 'bg-[#55e08b] text-[#181716]'
                    : 'bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716]'
                }`}
              >
                {justAddedBundle ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ensemble Added to Bag! (LOOK10 Applied)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Complete Look ({bundledProducts.length} Pieces) to Bag</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#8a857d] pt-1">
                <span>Includes Cedarwood Box &amp; Linen Dust Cover</span>
                <span className="text-[#c9b293]">Promo Code: LOOK10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
