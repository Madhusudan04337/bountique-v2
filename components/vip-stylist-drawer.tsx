'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, MessageSquare, Sparkles, Send, ShieldCheck, Check } from 'lucide-react'
import { useStore } from '@/lib/store'

export function VipStylistDrawer() {
  const { isStylistDrawerOpen, setIsStylistDrawerOpen, showToast } = useStore()
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [occasion, setOccasion] = useState('Occasion Styling')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isStylistDrawerOpen) {
        setIsStylistDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isStylistDrawerOpen, setIsStylistDrawerOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientPhone) return

    setSubmitted(true)
    showToast('Our Senior Stylist will contact you via WhatsApp shortly')
    setTimeout(() => {
      setSubmitted(false)
      setIsStylistDrawerOpen(false)
    }, 2500)
  }

  return (
    <AnimatePresence>
      {isStylistDrawerOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stylist-drawer-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsStylistDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-6">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="w-screen max-w-md bg-[#1e1d1a] border-l border-[#33312c] text-[#f4efe9] flex flex-col shadow-2xl justify-between overflow-y-auto overscroll-contain modal-content max-h-screen"
              data-native-scroll="true"
            >
              <div>
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#302e2a] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block">
                      Private Clienteling
                    </span>
                    <h2 id="stylist-drawer-title" className="text-xl font-serif text-[#f4efe9]">
                      VIP Stylist Concierge
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsStylistDrawerOpen(false)}
                    className="p-1.5 text-[#a7a299] hover:text-white"
                    aria-label="Close concierge drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Stylist Profile Bar */}
                <div className="p-5 bg-[#252420] border-b border-[#302e2a] flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#c9b293]/40 shrink-0">
                    <Image
                      src="/images/real-hero.jpg"
                      alt="Head Stylist Ananya"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif text-white">Ananya Sundaram</h3>
                    <p className="text-[11px] font-mono text-[#c9b293]">
                      Head of Private Styling &amp; Atelier Draper
                    </p>
                    <p className="text-[10px] font-mono text-[#8a857d] mt-0.5">
                      Available now · Typical response within 15 mins
                    </p>
                  </div>
                </div>

                {/* Form or Instant WhatsApp */}
                <div className="p-6 space-y-6">
                  {/* WhatsApp Quick Button */}
                  <div>
                    <a
                      href="https://wa.me/919840012345?text=Hello%20Aurora%20Salon%2C%20I%20am%20interested%20in%20private%20styling%20advice%20and%20silhouette%20recommendations."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#55e08b] font-mono text-xs uppercase tracking-wider font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Direct WhatsApp Consultation</span>
                    </a>
                    <p className="text-[10px] font-mono text-center text-[#7e7a72] mt-2">
                      Instant sizing recommendations &amp; private garment reservations.
                    </p>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-[#302e2a]"></div>
                    <span className="flex-shrink mx-3 text-[10px] font-mono uppercase text-[#736f67]">
                      Or request a stylist call
                    </span>
                    <div className="flex-grow border-t border-[#302e2a]"></div>
                  </div>

                  {submitted ? (
                    <div className="p-8 text-center space-y-3 bg-[#24231f] border border-[#c9b293]/30 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-[#c9b293]/20 text-[#c9b293] flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-serif text-white">Concierge Dispatched</h4>
                      <p className="text-xs font-sans text-[#a7a297]">
                        Ananya will review your measurements and reach out to {clientPhone}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                      <div>
                        <label className="text-[#a7a299] block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={e => setClientName(e.target.value)}
                          placeholder="Devika Nambiar"
                          className="w-full p-3 bg-[#181716] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
                        />
                      </div>

                      <div>
                        <label className="text-[#a7a299] block mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={e => setClientPhone(e.target.value)}
                          placeholder="+91 98400 98765"
                          className="w-full p-3 bg-[#181716] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
                        />
                      </div>

                      <div>
                        <label className="text-[#a7a299] block mb-1">Styling Focus</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Sizing & Fit Advice', 'Occasion Pairing', 'Bespoke Alteration', 'Wardrobe Capsule'].map(item => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setOccasion(item)}
                              className={`py-2 px-2 text-center text-[10px] rounded-lg border transition-all ${
                                occasion === item
                                  ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                                  : 'border-[#35332e] bg-[#181716] text-[#a7a297] hover:text-white'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[#a7a299] block mb-1">Specific Garment / Question (Optional)</label>
                        <textarea
                          rows={2}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="E.g. I am 5'4, will the Linen Blazer sleeves need shortening?"
                          className="w-full p-3 bg-[#181716] border border-[#35332e] text-white rounded-xl focus:outline-none focus:border-[#c9b293] font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-sans text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Callback</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Bottom Reassurance */}
              <div className="p-5 border-t border-[#302e2a] bg-[#1a1917] flex items-center gap-3 text-[11px] font-mono text-[#8a857d]">
                <ShieldCheck className="w-4 h-4 text-[#c9b293] shrink-0" />
                <span>Strict privacy guaranteed · No automated bots</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
