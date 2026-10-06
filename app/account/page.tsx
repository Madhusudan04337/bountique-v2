'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Package,
  Calendar,
  Ruler,
  MapPin,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Copy,
  Clock,
  Edit3,
  Plus,
  Trash2,
  X,
  Check,
  User as UserIcon,
  ShoppingBag,
  ExternalLink
} from 'lucide-react'
import { useStore, formatMoney, UserAddress, UserMeasurements } from '@/lib/store'
import { AuthView } from '@/components/auth-view'

export default function AccountPage() {
  const {
    user,
    logout,
    salonBookings,
    setIsSalonModalOpen,
    updateUserProfile,
    updateMeasurements,
    saveAddress,
    deleteAddress,
    showToast,
    wishlist,
    cartCount
  } = useStore()

  // Main active section: 'orders' | 'measurements' | 'addresses' | 'appointments' | 'profile'
  const [activeSection, setActiveSection] = useState<'orders' | 'measurements' | 'addresses' | 'appointments' | 'profile'>('orders')
  const [copiedCode, setCopiedCode] = useState(false)

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || 'Default',
    lastName: user?.lastName || 'User',
    email: user?.email || 'test@aurora.com',
    phone: user?.phone || '+91 98401 00000'
  })

  // Measurements Form State
  const [measurementsForm, setMeasurementsForm] = useState<UserMeasurements>({
    shoulder: user?.measurements?.shoulder || '42 cm / 16.5 in',
    bustOrChest: user?.measurements?.bustOrChest || '98 cm / 38.5 in',
    waist: user?.measurements?.waist || '80 cm / 31.5 in',
    hips: user?.measurements?.hips || '94 cm / 37.0 in',
    sleeve: user?.measurements?.sleeve || '62 cm / 24.4 in',
    inseam: user?.measurements?.inseam || '78 cm / 30.7 in',
    preferredLength: user?.measurements?.preferredLength || 'Standard Floor Drape (102 cm)',
    fitPreference: user?.measurements?.fitPreference || 'Natural Relaxed'
  })

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null)
  const [addressForm, setAddressForm] = useState<UserAddress>({
    label: 'Home Delivery Address',
    street: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: ''
  })

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '+91 98401 00000'
      })
      if (user.measurements) {
        setMeasurementsForm(user.measurements)
      }
    }
  }, [user])

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(user?.privilegeCode || 'AURORA15')
    setCopiedCode(true)
    showToast('Privilege discount code AURORA15 copied')
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile({
      firstName: profileForm.firstName.trim(),
      lastName: profileForm.lastName.trim(),
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim()
    })
    setActiveSection('orders')
  }

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault()
    updateMeasurements(measurementsForm)
  }

  const handleOpenAddAddress = () => {
    setEditingAddressIndex(null)
    setAddressForm({
      label: 'Home Delivery Address',
      street: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: ''
    })
    setIsAddressModalOpen(true)
  }

  const handleOpenEditAddress = (idx: number) => {
    const target = user?.savedAddresses?.[idx]
    if (!target) return
    setEditingAddressIndex(idx)
    setAddressForm({ ...target })
    setIsAddressModalOpen(true)
  }

  const handleSaveAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveAddress(addressForm, editingAddressIndex !== null ? editingAddressIndex : undefined)
    setIsAddressModalOpen(false)
  }

  // If user is not logged in, render the clean, distraction-free authentication card (no header/footer)
  if (!user) {
    return <AuthView initialMode="login" />
  }

  return (
    <main className="bg-[#181716] text-[#f4efe9] min-h-screen py-8 sm:py-12 selection:bg-[#c9b293] selection:text-[#181716]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* 1. TOP CUSTOMER HEADER (Clean, real-world e-commerce profile card) */}
        <section className="bg-[#21201d] border border-[#35332e] rounded-2xl p-5 sm:p-7 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Initials Avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2a2824] border border-[#c9b293]/40 text-[#c9b293] font-serif text-xl sm:text-2xl flex items-center justify-center shrink-0">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-xl sm:text-2xl font-serif text-[#f4efe9]">
                    Hello, {user.firstName} {user.lastName}
                  </h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2c2a25] text-[#c9b293] border border-[#c9b293]/30">
                    {user.tier}
                  </span>
                </div>

                <p className="text-xs font-sans text-[#a7a297]">
                  {user.email} · {user.phone || '+91 98401 00000'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveSection(activeSection === 'profile' ? 'orders' : 'profile')}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#282622] hover:bg-[#322f2a] border border-[#3c3933] text-[10px] sm:text-xs font-sans text-[#cfcac2] hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9b293]" />
                <span>{activeSection === 'profile' ? 'View Account' : 'Edit Profile'}</span>
              </button>

              <button
                type="button"
                onClick={logout}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#282622] hover:bg-red-950/40 border border-[#3c3933] hover:border-red-800 text-[10px] sm:text-xs font-sans text-[#a7a297] hover:text-red-300 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Member 15% Voucher Bar */}
          <div className="mt-5 pt-4 border-t border-[#2e2c28] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#cfcac2]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Your Exclusive Member Discount:</span>
              <strong className="font-mono text-[#c9b293] tracking-wider text-sm">{user.privilegeCode}</strong>
              <span className="text-[#8a857d]">(15% off atelier orders)</span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs font-mono text-[#c9b293] hover:text-white flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              {copiedCode ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 2. REAL-WORLD ACCOUNT TILES (Amazon / Blinkit Style Navigation Hub) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Orders */}
          <button
            type="button"
            onClick={() => setActiveSection('orders')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSection === 'orders'
                ? 'bg-[#2a2824] border-[#c9b293] shadow-md ring-1 ring-[#c9b293]/30'
                : 'bg-[#21201d] border-[#33312c] hover:border-[#524e47]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Package className={`w-5 h-5 ${activeSection === 'orders' ? 'text-[#c9b293]' : 'text-[#8a857d]'}`} />
              <span className="font-mono text-xs text-[#a7a297]">{user.orders.length}</span>
            </div>
            <div>
              <h3 className="text-sm font-sans font-medium text-[#f4efe9]">Your Orders</h3>
              <p className="text-[11px] font-sans text-[#8a857d] mt-0.5">Track, return &amp; buy again</p>
            </div>
          </button>

          {/* Card 2: Tailoring Measurements */}
          <button
            type="button"
            onClick={() => setActiveSection('measurements')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSection === 'measurements'
                ? 'bg-[#2a2824] border-[#c9b293] shadow-md ring-1 ring-[#c9b293]/30'
                : 'bg-[#21201d] border-[#33312c] hover:border-[#524e47]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Ruler className={`w-5 h-5 ${activeSection === 'measurements' ? 'text-[#c9b293]' : 'text-[#8a857d]'}`} />
              <span className="font-mono text-[10px] text-[#c9b293]">Bespoke</span>
            </div>
            <div>
              <h3 className="text-sm font-sans font-medium text-[#f4efe9]">Tailoring Sizes</h3>
              <p className="text-[11px] font-sans text-[#8a857d] mt-0.5">Your chest, waist &amp; length</p>
            </div>
          </button>

          {/* Card 3: Saved Addresses */}
          <button
            type="button"
            onClick={() => setActiveSection('addresses')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSection === 'addresses'
                ? 'bg-[#2a2824] border-[#c9b293] shadow-md ring-1 ring-[#c9b293]/30'
                : 'bg-[#21201d] border-[#33312c] hover:border-[#524e47]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <MapPin className={`w-5 h-5 ${activeSection === 'addresses' ? 'text-[#c9b293]' : 'text-[#8a857d]'}`} />
              <span className="font-mono text-xs text-[#a7a297]">{user.savedAddresses?.length || 0}</span>
            </div>
            <div>
              <h3 className="text-sm font-sans font-medium text-[#f4efe9]">Addresses</h3>
              <p className="text-[11px] font-sans text-[#8a857d] mt-0.5">Shipping destinations</p>
            </div>
          </button>

          {/* Card 4: Salon Appointments */}
          <button
            type="button"
            onClick={() => setActiveSection('appointments')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeSection === 'appointments'
                ? 'bg-[#2a2824] border-[#c9b293] shadow-md ring-1 ring-[#c9b293]/30'
                : 'bg-[#21201d] border-[#33312c] hover:border-[#524e47]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Calendar className={`w-5 h-5 ${activeSection === 'appointments' ? 'text-[#c9b293]' : 'text-[#8a857d]'}`} />
              <span className="font-mono text-[10px] text-emerald-400">Chennai</span>
            </div>
            <div>
              <h3 className="text-sm font-sans font-medium text-[#f4efe9]">Salon Fittings</h3>
              <p className="text-[11px] font-sans text-[#8a857d] mt-0.5">Flagship appointments</p>
            </div>
          </button>
        </section>

        {/* 3. ACTIVE CONTENT SECTION */}

        {/* SECTION A: YOUR ORDERS */}
        {activeSection === 'orders' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-[#f4efe9]">Your Recent Orders</h2>
              <span className="text-xs font-mono text-[#8a857d]">{user.orders.length} order placed</span>
            </div>

            {user.orders.map(order => (
              <div
                key={order.id}
                className="bg-[#21201d] border border-[#35332e] rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Order Top Strip */}
                <div className="bg-[#1c1b18] px-5 py-3.5 border-b border-[#2e2c28] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="block text-[10px] font-sans text-[#8a857d] uppercase">Order Placed</span>
                      <span className="font-mono text-[#cfcac2]">{order.date}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-sans text-[#8a857d] uppercase">Total</span>
                      <span className="font-mono font-medium text-[#f4efe9]">{formatMoney(order.total)}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] font-sans text-[#8a857d] uppercase">Order ID</span>
                    <span className="font-mono text-[#c9b293] font-semibold">{order.id}</span>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="px-5 py-3 bg-[#242320] border-b border-[#2e2c28] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-sans font-medium text-[#f4efe9]">{order.status}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#8a857d]">
                    Tracking: <strong className="text-[#cfcac2]">{order.trackingCode}</strong>
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-5 space-y-4">
                  {order.items.map(item => (
                    <div key={item.sku} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[#181716] border border-[#33312c] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-[#f4efe9]">{item.name}</h4>
                          <p className="text-xs font-sans text-[#8a857d] mt-0.5">{item.fabric}</p>
                          <p className="text-[11px] font-mono text-[#cfcac2] mt-1">
                            Size: {item.size} · Color: {item.color} · SKU: {item.sku}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#f4efe9] shrink-0">
                        {formatMoney(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SECTION B: TAILORING MEASUREMENTS */}
        {activeSection === 'measurements' && (
          <section className="bg-[#21201d] border border-[#35332e] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-serif text-[#f4efe9]">Your Body Measurements for Tailoring</h2>
              <p className="text-xs font-sans text-[#8a857d] mt-1">
                Save your body measurements so our master cutters in Chennai cut your garments to fit you comfortably.
              </p>
            </div>

            <form onSubmit={handleSaveMeasurements} className="space-y-5">
              {/* Fit Preference Pills */}
              <div>
                <label className="block text-xs font-sans font-medium text-[#cfcac2] mb-2">
                  How do you like your clothes to fit?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Sculpted Slim', 'Natural Relaxed', 'Fluid Oversized'] as const).map(fit => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setMeasurementsForm({ ...measurementsForm, fitPreference: fit })}
                      className={`py-2 px-3 rounded-xl border text-xs font-sans font-medium transition-all cursor-pointer ${
                        measurementsForm.fitPreference === fit
                          ? 'bg-[#c9b293] text-[#181716] border-[#c9b293] font-semibold shadow'
                          : 'bg-[#252420] text-[#a7a297] border-[#36342e] hover:border-[#524e47]'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Chest / Bust Size
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.bustOrChest}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, bustOrChest: e.target.value })}
                    placeholder="e.g. 98 cm / 38.5 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Waist Size
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.waist}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, waist: e.target.value })}
                    placeholder="e.g. 80 cm / 31.5 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Hips Size
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.hips}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, hips: e.target.value })}
                    placeholder="e.g. 94 cm / 37.0 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Shoulder Breadth
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.shoulder}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, shoulder: e.target.value })}
                    placeholder="e.g. 42 cm / 16.5 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Sleeve Length
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.sleeve}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, sleeve: e.target.value })}
                    placeholder="e.g. 62 cm / 24.4 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                    Trouser Inseam / Length
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.inseam}
                    onChange={e => setMeasurementsForm({ ...measurementsForm, inseam: e.target.value })}
                    placeholder="e.g. 78 cm / 30.7 in"
                    className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#cfcac2] mb-1">
                  Hemline Drape Preference
                </label>
                <input
                  type="text"
                  value={measurementsForm.preferredLength}
                  onChange={e => setMeasurementsForm({ ...measurementsForm, preferredLength: e.target.value })}
                  placeholder="e.g. Standard Floor Drape (102 cm) or Ankle Grazing"
                  className="w-full px-3.5 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                />
              </div>

              <button
                type="submit"
                className="py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow"
              >
                Save Measurements
              </button>
            </form>
          </section>
        )}

        {/* SECTION C: SAVED ADDRESSES */}
        {activeSection === 'addresses' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-serif text-[#f4efe9]">Your Delivery Addresses</h2>
                <p className="text-[11px] sm:text-xs font-sans text-[#8a857d] mt-0.5">Where your orders will be shipped.</p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddAddress}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] text-[10px] sm:text-xs font-sans font-medium flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.savedAddresses && user.savedAddresses.length > 0 ? (
                user.savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="bg-[#21201d] border border-[#35332e] rounded-xl p-5 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-sans font-semibold text-sm text-[#f4efe9]">{addr.label}</span>
                        {idx === 0 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2a2824] text-[#c9b293] border border-[#c9b293]/30">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-sans text-[#a7a297] leading-relaxed">
                        {addr.street} <br />
                        {addr.city}, {addr.state} <br />
                        PIN Code: {addr.postalCode}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#2e2c28] text-xs">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAddress(idx)}
                        className="text-[#c9b293] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      {user.savedAddresses && user.savedAddresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteAddress(idx)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 text-center bg-[#21201d] border border-[#35332e] rounded-xl text-xs text-[#8a857d]">
                  No delivery addresses saved yet. Click &quot;Add Address&quot; above.
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION D: SALON APPOINTMENTS */}
        {activeSection === 'appointments' && (
          <section className="bg-[#21201d] border border-[#35332e] rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif text-[#f4efe9]">Flagship Fitting Appointments</h2>
                <p className="text-xs font-sans text-[#8a857d] mt-1">
                  Private consultations at Khader Nawaz Khan Road, Chennai.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSalonModalOpen(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] text-[10px] sm:text-xs font-sans font-medium cursor-pointer self-start sm:self-auto"
              >
                Book a Fitting
              </button>
            </div>

            {/* Current Appointment Card */}
            <div className="p-4 rounded-xl bg-[#1c1b18] border border-[#302e29] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-medium text-emerald-400">Confirmed Booking</span>
                </div>
                <h4 className="text-sm font-serif text-[#f4efe9]">Private Atelier Consultation</h4>
                <p className="text-xs font-sans text-[#a7a297]">
                  14/2 Khader Nawaz Khan Road, Nungambakkam, Chennai 600006
                </p>
                <p className="text-xs font-mono text-[#c9b293] pt-1">
                  Date: 15 Oct 2026 · Time: 11:00 AM
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSalonModalOpen(true)}
                className="text-xs font-sans text-[#a7a297] hover:text-[#c9b293] underline cursor-pointer self-start sm:self-auto"
              >
                Reschedule
              </button>
            </div>
          </section>
        )}

        {/* SECTION E: EDIT PROFILE DETAILS */}
        {activeSection === 'profile' && (
          <section className="bg-[#21201d] border border-[#35332e] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-serif text-[#f4efe9]">Your Personal Details</h2>
              <p className="text-xs font-sans text-[#8a857d] mt-1">
                Update your name, email, and contact phone number.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.firstName}
                    onChange={e => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.lastName}
                    onChange={e => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#cfcac2] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#cfcac2] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                />
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="submit"
                  className="py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('orders')}
                  className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-[#282622] text-[#a7a297] text-[10px] sm:text-xs font-sans hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* 4. ADDRESS ADD / EDIT POPUP MODAL */}
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-[#21201d] border border-[#38352f] rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#2e2c28]">
                <h3 className="text-base font-serif text-[#f4efe9]">
                  {editingAddressIndex !== null ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="p-1 text-[#8a857d] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveAddressSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">Address Label</label>
                  <input
                    type="text"
                    required
                    value={addressForm.label}
                    onChange={e => setAddressForm({ ...addressForm, label: e.target.value })}
                    placeholder="e.g. Home, Office, Studio"
                    className="w-full px-3 py-2 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={addressForm.street}
                    onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                    placeholder="House/flat number, street name"
                    className="w-full px-3 py-2 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans text-[#cfcac2] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full px-3 py-2 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#cfcac2] mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full px-3 py-2 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#cfcac2] mb-1">PIN / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={addressForm.postalCode}
                    onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    placeholder="e.g. 600006"
                    className="w-full px-3 py-2 bg-[#262420] border border-[#38352f] rounded-xl text-xs font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl bg-[#282622] text-[#a7a297] text-[10px] sm:text-xs font-sans hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] text-[10px] sm:text-xs font-sans font-semibold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
