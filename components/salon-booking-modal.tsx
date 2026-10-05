'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, Calendar, Clock, MapPin, Check } from 'lucide-react'
import { useStore } from '@/lib/store'

export function SalonBookingModal() {
  const { isSalonModalOpen, setIsSalonModalOpen, bookSalonAppointment } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('2026-10-15')
  const [time, setTime] = useState('11:00 AM')
  const [category, setCategory] = useState('Bespoke Tailoring')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSalonModalOpen) {
        setIsSalonModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSalonModalOpen, setIsSalonModalOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) return

    bookSalonAppointment({
      name,
      email,
      phone,
      date,
      time,
      category,
      notes
    })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsSalonModalOpen(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isSalonModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="salon-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSalonModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="relative z-10 w-full max-w-2xl bg-[#201f1c] border border-[#3b3832] text-[#f4efe9] rounded-2xl shadow-2xl max-h-[90dvh] overflow-y-auto overscroll-contain modal-content"
              data-native-scroll="true"
            >
              {/* Header Visual */}
              <div className="relative h-44 w-full bg-[#181716] overflow-hidden">
                <Image
                  src="/images/real-salon.jpg"
                  alt="Aurora Salon Chennai"
                  fill
                  className="object-cover filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201f1c] via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={() => setIsSalonModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-[#181716]/80 text-[#f4efe9] hover:text-[#c9b293] rounded-full transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9b293] block">
                    Private Appointment
                  </span>
                  <h2 id="salon-modal-title" className="text-2xl font-serif text-[#f4efe9]">
                    Chennai Salon Fitting
                  </h2>
                </div>
              </div>

              {submitted ? (
                <div className="p-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#c9b293]/15 text-[#c9b293] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-xl font-serif text-[#f4efe9]">Appointment Confirmed</p>
                  <p className="text-xs font-sans text-[#a7a297] max-w-sm mx-auto">
                    Thank you, {name}. Our head draper will prepare the {category} edit for you on {date} at {time}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#a7a297] pb-2 border-b border-[#2e2c28]">
                    <MapPin className="w-3.5 h-3.5 text-[#c9b293]" />
                    <span>Khader Nawaz Khan Rd, Nungambakkam, Chennai</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#a7a297] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ananya Roy"
                        className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-lg focus:outline-none focus:border-[#c9b293]"
                      />
                    </div>
                    <div>
                      <label className="text-[#a7a297] block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-lg focus:outline-none focus:border-[#c9b293]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[#a7a297] block mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98400 12345"
                        className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-lg focus:outline-none focus:border-[#c9b293]"
                      />
                    </div>
                    <div>
                      <label className="text-[#a7a297] block mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-lg focus:outline-none focus:border-[#c9b293]"
                      />
                    </div>
                    <div>
                      <label className="text-[#a7a297] block mb-1">Time</label>
                      <select
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full p-2.5 bg-[#181716] border border-[#35332e] text-white rounded-lg focus:outline-none focus:border-[#c9b293]"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#a7a297] block mb-1">Fitting Focus</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Bespoke Tailoring', 'Silk Dresses', 'Complete Wardrobe'].map(item => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setCategory(item)}
                          className={`py-2 px-2 text-center text-[11px] rounded-lg border transition-all ${
                            category === item
                              ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold'
                              : 'border-[#35332e] bg-[#181716] text-[#a7a297] hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors mt-2"
                  >
                    Confirm Private Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
