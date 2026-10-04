'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Mail, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { useStore } from '@/lib/store'

export function ContactPage() {
  const { showToast } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setSubmitted(true)
    showToast('Your note has been received by our studio')
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-16 sm:py-24 selection:bg-[#c9b293] selection:text-[#181716]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-10 border-b border-[#2d2b27] mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201f1c] border border-[#38352f] text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Private Clienteling &amp; Care</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#f4efe9] leading-tight">
            Contact the <em>atelier.</em>
          </h1>
          <p className="text-sm sm:text-base font-sans text-[#a7a297] mt-3 max-w-xl leading-relaxed prose-readable">
            Personal guidance regarding sizing, bespoke hemline alterations, textile care, or scheduling your private salon visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form Section (H2) */}
          <section className="lg:col-span-7 p-6 sm:p-10 bg-gradient-to-b from-[#21201d] to-[#1c1b18] border border-[#38352f] rounded-[2.5rem] shadow-2xl" aria-labelledby="inquiry-form-heading">
            <h2 id="inquiry-form-heading" className="text-xs font-mono uppercase tracking-[0.2em] text-[#c9b293] mb-6 block">
              Send a Private Note
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center mx-auto border border-[#c9b293]/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-white">Thank you, {name}</h3>
                <p className="text-sm font-sans text-[#a7a297] max-w-sm mx-auto leading-relaxed">
                  Our senior concierge will respond to your inquiry via email within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a7a297] block mb-2">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3.5 bg-[#181716] border border-[#36342e] text-white text-sm rounded-xl focus:outline-none focus:border-[#c9b293] placeholder:text-[#68645c]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a7a297] block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-[#181716] border border-[#36342e] text-white text-sm rounded-xl focus:outline-none focus:border-[#c9b293] placeholder:text-[#68645c]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a7a297] block mb-2">
                    Inquiry Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How may our atelier assist you? (e.g. Fit consultation, bespoke request, appointment)"
                    className="w-full p-3.5 bg-[#181716] border border-[#36342e] text-white text-sm rounded-xl focus:outline-none focus:border-[#c9b293] font-sans leading-relaxed placeholder:text-[#68645c]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-[1.01] shadow-lg cursor-pointer"
                >
                  Send Inquiry Note
                </button>
              </form>
            )}
          </section>

          {/* Salon Details Section (H2 -> H3) */}
          <section className="lg:col-span-5 space-y-8 text-sm font-sans text-[#a7a297]" aria-labelledby="salon-details-heading">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#c9b293] block mb-2">
                Atelier Location
              </span>
              <h2 id="salon-details-heading" className="text-2xl sm:text-3xl font-serif text-white">
                Flagship Salon &amp; Concierge
              </h2>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-[#201f1c] border border-[#33312c] rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c9b293]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Concierge</span>
                </div>
                <p className="font-mono text-white text-sm">hello@aurorastudio.in</p>
                <p className="text-xs text-[#8a857d]">Direct response within 24 hours</p>
              </div>

              <div className="p-5 bg-[#201f1c] border border-[#33312c] rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c9b293]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Studio Telephone &amp; WhatsApp</span>
                </div>
                <p className="font-mono text-white text-sm">+91 44 2833 4900</p>
                <p className="text-xs text-[#8a857d]">Master Stylist available 10am–7pm IST</p>
              </div>

              <div className="p-5 bg-[#201f1c] border border-[#33312c] rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c9b293]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Chennai Salon Location</span>
                </div>
                <p className="text-white text-sm">Khader Nawaz Khan Road, Nungambakkam</p>
                <p className="text-xs text-[#8a857d]">Chennai, Tamil Nadu 600006</p>
                <p className="font-mono text-xs text-[#c9b293] pt-1">Mon–Sat / 10:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2e2c28] space-y-2 text-xs text-[#8a857d] leading-relaxed">
              <span className="font-mono uppercase tracking-wider text-[#c9b293] block">
                Complimentary Courier &amp; Doorstep Exchange
              </span>
              <p>
                All orders include insured doorstep delivery and complimentary 14-day reverse courier collection across India.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
