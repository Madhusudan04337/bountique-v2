'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X, Minus, Plus, Trash2, ArrowRight, Gift } from 'lucide-react'
import { useStore, formatMoney } from '@/lib/store'

const FREE_SHIPPING_THRESHOLD = 3000

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon
  } = useStore()

  const [couponInput, setCouponInput] = useState('')

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal)
  const finalTotal = Math.max(0, cartSubtotal - discountAmount)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponInput) return
    if (applyCoupon(couponInput)) setCouponInput('')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-6">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="w-screen max-w-md bg-[#1d1c1a] border-l border-[#33312c] text-[#f4efe9] flex flex-col shadow-2xl"
            >
              {/* Header (H2 Dialog Title) */}
              <div className="px-6 py-4 border-b border-[#302e2a] flex items-center justify-between">
                <h2 id="cart-drawer-title" className="text-lg font-serif text-[#f4efe9]">
                  Shopping Bag ({cart.reduce((n, i) => n + i.quantity, 0)})
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#a7a299] hover:text-white"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shipping tracker */}
              <div className="px-6 py-2.5 bg-[#23221f] text-xs font-mono text-[#a7a299]">
                {remainingForFree === 0
                  ? '✓ Free shipping unlocked'
                  : `Add ${formatMoney(remainingForFree)} more for free shipping`}
              </div>

              {/* Items List (H3 items) */}
              <div data-native-scroll="true" className="flex-1 overflow-y-auto overscroll-contain modal-content px-6 py-4 space-y-4 divide-y divide-[#2a2824]">
                {cart.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-center text-sm text-[#8c877f]">
                    <p className="font-serif">Your bag is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="pt-4 flex gap-4 items-start">
                      <div className="relative w-16 h-20 bg-[#161514] border border-[#302e2a] shrink-0 overflow-hidden rounded-xl">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-serif text-[#f4efe9] truncate">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="hover:text-[#c9b293]"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <span className="text-xs font-mono tabular-nums">
                            {formatMoney(item.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-[#8a857d]">
                          {item.color} · Size: {item.size}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#36342f] bg-[#1a1917] rounded-full">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2 text-[#9c978f] hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1 text-xs font-mono tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 text-[#9c978f] hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#7c776f] hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary Footer */}
              {cart.length > 0 && (
                <div className="px-6 py-4 border-t border-[#302e2a] bg-[#22211e] space-y-3 text-xs font-mono">
                  {/* Gift & Monogram Toggle */}
                  <div className="p-2.5 bg-[#1a1917] rounded-xl border border-[#302e2a] flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-white">
                      <Gift className="w-3.5 h-3.5 text-[#c9b293]" />
                      <span>Complimentary Gift Box &amp; Monogram</span>
                    </span>
                    <span className="text-[#c9b293]">Included</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex justify-between text-[#c9b293]">
                      <span>Code {appliedCoupon} (-15%)</span>
                      <button onClick={removeCoupon} className="hover:underline">Remove</button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (AURORA15)"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-[#181716] border border-[#36342f] text-white focus:outline-none focus:border-[#c9b293] rounded-lg"
                      />
                      <button type="submit" className="px-3 py-1.5 bg-[#312f2a] text-[#f4efe9] hover:bg-[#3d3b35] rounded-lg">
                        Apply
                      </button>
                    </form>
                  )}

                  <div className="space-y-1 text-[#9c978f]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#f4efe9]">{formatMoney(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#c9b293]">
                        <span>Discount</span>
                        <span>-{formatMoney(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{remainingForFree === 0 ? 'Free' : '₹250'}</span>
                    </div>
                    <div className="pt-2 border-t border-[#302e2a] flex justify-between text-sm font-serif text-[#f4efe9]">
                      <span>Total</span>
                      <span className="font-mono text-[#c9b293] font-medium">
                        {formatMoney(finalTotal + (remainingForFree === 0 ? 0 : 250))}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-sans text-xs font-medium flex items-center justify-between px-5 transition-colors rounded-full shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
