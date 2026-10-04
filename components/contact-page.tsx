'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
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
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page H1 */}
        <div className="pb-8 border-b border-[#292724] mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block mb-1">
            Care &amp; Inquiries
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#f4efe9]">
            Contact the studio
          </h1>
          <p className="text-sm font-sans text-[#a7a299] mt-2">
            Questions regarding sizing, fabric, or visiting our Chennai salon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Inquiry Form Section (H2) */}
          <section className="p-6 sm:p-8 bg-[#201f1c] border border-[#2f2d29] rounded-3xl" aria-labelledby="inquiry-form-heading">
            <h2 id="inquiry-form-heading" className="text-xs font-mono uppercase tracking-wider text-[#c9b293] mb-4">
              Send an Inquiry
            </h2>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif text-white">Thank you, {name}</h3>
                <p className="text-xs font-sans text-[#a7a299]">
                  We will reply to your note within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#a7a299] block mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 bg-[#181716] border border-[#33312c] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="text-[#a7a299] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#181716] border border-[#33312c] text-white rounded-xl focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="text-[#a7a299] block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you need assistance with..."
                    className="w-full p-3 bg-[#181716] border border-[#33312c] text-white rounded-xl focus:outline-none focus:border-[#c9b293] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-semibold uppercase tracking-wider rounded-full transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>

          {/* Salon Details Section (H2 -> H3) */}
          <section className="space-y-6 text-xs font-sans text-[#a7a299]" aria-labelledby="salon-details-heading">
            <h2 id="salon-details-heading" className="text-xs font-mono uppercase tracking-wider text-[#c9b293]">
              Flagship Salon &amp; Concierge
            </h2>

            <div className="space-y-1">
              <h3 className="text-sm font-serif text-white block">Email Concierge</h3>
              <p className="font-mono text-[#c9b293]">hello@aurorastudio.in</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-serif text-white block">Studio Telephone</h3>
              <p className="font-mono text-[#c9b293]">+91 44 2833 4900</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-serif text-white block">Chennai Salon Location</h3>
              <p>Khader Nawaz Khan Road, Nungambakkam</p>
              <p>Chennai, Tamil Nadu 600006</p>
              <p className="font-mono text-[11px] text-[#78736b] pt-1">Mon–Sat / 10am–7pm</p>
            </div>

            <div className="pt-4 border-t border-[#292724] space-y-2 text-xs">
              <h3 className="text-sm font-serif text-white block">Returns &amp; Courier Exchanges</h3>
              <p>
                We accept exchanges and returns within 14 days of receipt. Doorstep pickup is complimentary across India.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
