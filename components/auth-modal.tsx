'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, ShieldCheck, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react'
import { useStore, BOUTIQUE_DEFAULT_PASSWORD } from '@/lib/store'
import { AtelierButton, AtelierBadge } from '@/components/ui-kit'

export function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    loginAsDemoUser,
  } = useStore()

  const [mode, setMode] = useState<'signin' | 'register'>('register')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(BOUTIQUE_DEFAULT_PASSWORD)
  const [confirmPassword, setConfirmPassword] = useState(BOUTIQUE_DEFAULT_PASSWORD)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setMode(authModalMode)
    setErrorMsg('')
  }, [authModalMode, isAuthModalOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAuthModalOpen, setIsAuthModalOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (mode === 'register') {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        setErrorMsg('Please complete all fields.')
        return
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.')
        return
      }
      register({
        firstName,
        lastName,
        email,
        password,
      })
    } else {
      if (!email.trim()) {
        setErrorMsg('Please provide your email address.')
        return
      }
      const success = login(email, password)
      if (!success) {
        setErrorMsg(`Incorrect boutique password. Use "${BOUTIQUE_DEFAULT_PASSWORD}"`)
      }
    }
  }

  const handleQuickDemoAccess = () => {
    loginAsDemoUser()
  }

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <div className="min-h-screen px-3 sm:px-6 flex items-center justify-center py-8 sm:py-12">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="relative z-10 w-full max-w-4xl bg-[#1c1b18] border border-[#38352f] text-[#f4efe9] rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] overflow-y-auto overscroll-contain modal-content"
              data-native-scroll="true"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#181716]/80 border border-[#3b3832] text-[#a7a297] hover:text-white transition-colors cursor-pointer"
                aria-label="Close authentication window"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* LEFT COLUMN: Editorial Community Showcase (Inspired by design reference) */}
                <div className="lg:col-span-6 p-6 sm:p-10 bg-[#21201d]/90 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#302e2a]">
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-xs text-[#c9b293] uppercase tracking-[0.2em] font-medium block">
                        Join Our Community
                      </span>
                      <p className="font-mono text-[10px] text-[#8a857d] uppercase tracking-wider mt-0.5">
                        Unlock Atelier Privileges
                      </p>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] leading-tight">
                      Discover <br />
                      <span className="text-[#c9b293] italic font-normal">New Horizons</span>
                    </h2>

                    {/* Filter / Category Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="text-[11px] font-sans font-medium px-3 py-1 rounded-full bg-[#2a2824] border border-[#3d3a33] text-[#cfcac2]">
                        Exclusive Editions
                      </span>
                      <span className="text-[11px] font-sans font-medium px-3 py-1 rounded-full bg-[#2a2824] border border-[#3d3a33] text-[#cfcac2]">
                        Salon Fittings
                      </span>
                      <span className="text-[11px] font-sans font-medium px-3 py-1 rounded-full bg-[#2a2824] border border-[#3d3a33] text-[#cfcac2]">
                        Textile Archives
                      </span>
                    </div>

                    {/* Photo Grid Layout: 1 tall on left, 2 stacked on right */}
                    <div className="grid grid-cols-2 gap-2.5 pt-3">
                      {/* Tall photo on left */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#38352f]">
                        <Image
                          src="/images/real-dress.jpg"
                          alt="Mulberry Silk Bias Cut Slip"
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-[#c9b293] uppercase tracking-wider">
                          Silk Drape
                        </span>
                      </div>

                      {/* 2 stacked photos on right */}
                      <div className="flex flex-col gap-2.5">
                        <div className="relative h-[calc(50%-5px)] rounded-xl overflow-hidden border border-[#38352f]">
                          <Image
                            src="/images/real-blazer.jpg"
                            alt="Belgian Linen Blazer Tailoring"
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#cfcac2] uppercase tracking-wider">
                            Atelier Cut
                          </span>
                        </div>

                        <div className="relative h-[calc(50%-5px)] rounded-xl overflow-hidden border border-[#38352f]">
                          <Image
                            src="/images/real-linen-close.jpg"
                            alt="100% Belgian Dew-Retted Flax"
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#cfcac2] uppercase tracking-wider">
                            Flax Weave
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#302e2a] flex items-center justify-between text-[11px] font-mono text-[#8a857d]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c9b293]" />
                      Boutique Secure
                    </span>
                    <span>Chennai Atelier · 2026</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Authentication Form */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <h3 id="auth-modal-title" className="text-2xl sm:text-3xl font-serif text-[#f4efe9]">
                        {mode === 'register' ? 'Create Account' : 'Welcome Back'}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#a7a297] mt-1">
                        {mode === 'register'
                          ? "It's free and only takes a minute"
                          : 'Sign in to access your bespoke orders and measurements'}
                      </p>
                    </div>

                    {/* Mode Selector Tabs */}
                    <div className="grid grid-cols-2 p-1 bg-[#151413] rounded-full border border-[#302e2a] mb-5 sm:mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin')
                          setAuthModalMode('signin')
                          setErrorMsg('')
                        }}
                        className={`py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                          mode === 'signin'
                            ? 'bg-[#c9b293] text-[#181716] font-semibold shadow'
                            : 'text-[#8a857d] hover:text-[#f4efe9]'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register')
                          setAuthModalMode('register')
                          setErrorMsg('')
                        }}
                        className={`py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                          mode === 'register'
                            ? 'bg-[#c9b293] text-[#181716] font-semibold shadow'
                            : 'text-[#8a857d] hover:text-[#f4efe9]'
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    {/* Error Banner */}
                    {errorMsg && (
                      <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-200 text-xs font-sans">
                        {errorMsg}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {mode === 'register' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-sans font-medium text-[#cfcac2] mb-1.5">
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="First Name"
                              value={firstName}
                              onChange={e => setFirstName(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-sm font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293] transition-colors placeholder:text-[#6a665f]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-sans font-medium text-[#cfcac2] mb-1.5">
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Last Name"
                              value={lastName}
                              onChange={e => setLastName(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-sm font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293] transition-colors placeholder:text-[#6a665f]"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-sans font-medium text-[#cfcac2] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-sm font-sans text-[#f4efe9] focus:outline-none focus:border-[#c9b293] transition-colors placeholder:text-[#6a665f]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-sans font-medium text-[#cfcac2]">
                            Password
                          </label>
                          <span className="font-mono text-[10px] text-[#c9b293] flex items-center gap-1">
                            <KeyRound className="w-3 h-3" /> Default: {BOUTIQUE_DEFAULT_PASSWORD}
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Boutique password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-sm font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293] transition-colors placeholder:text-[#6a665f]"
                        />
                      </div>

                      {mode === 'register' && (
                        <div>
                          <label className="block text-xs font-sans font-medium text-[#cfcac2] mb-1.5">
                            Confirm Password
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#252420] border border-[#38352f] rounded-xl text-sm font-mono text-[#f4efe9] focus:outline-none focus:border-[#c9b293] transition-colors placeholder:text-[#6a665f]"
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full mt-2 py-2 sm:py-3 px-4 sm:px-6 bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] font-sans font-semibold rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        <span>{mode === 'register' ? 'Sign Up' : 'Access Account'}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </form>

                    {/* Quick Demo Access Bar */}
                    <div className="mt-4 pt-3.5 border-t border-[#302e2a]">
                      <button
                        type="button"
                        onClick={handleQuickDemoAccess}
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-[#262420] hover:bg-[#2e2c27] border border-[#423e37] text-[#cfcac2] hover:text-[#f4efe9] text-[10px] sm:text-xs font-mono rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9b293]" />
                        <span>One-Click Demo Login ({BOUTIQUE_DEFAULT_PASSWORD})</span>
                      </button>
                    </div>
                  </div>

                  {/* Switch Footer */}
                  <div className="pt-6 mt-4 text-center">
                    {mode === 'register' ? (
                      <p className="text-xs font-sans text-[#a7a297]">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signin')
                            setAuthModalMode('signin')
                            setErrorMsg('')
                          }}
                          className="text-[#c9b293] hover:underline font-medium cursor-pointer"
                        >
                          Log in
                        </button>
                      </p>
                    ) : (
                      <p className="text-xs font-sans text-[#a7a297]">
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('register')
                            setAuthModalMode('register')
                            setErrorMsg('')
                          }}
                          className="text-[#c9b293] hover:underline font-medium cursor-pointer"
                        >
                          Sign up
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
