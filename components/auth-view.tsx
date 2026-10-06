'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react'
import { useStore, BOUTIQUE_DEFAULT_PASSWORD } from '@/lib/store'

interface AuthViewProps {
  initialMode: 'login' | 'register'
}

export function AuthView({ initialMode }: AuthViewProps) {
  const router = useRouter()
  const { login, register, loginAsDemoUser } = useStore()

  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(BOUTIQUE_DEFAULT_PASSWORD)
  const [confirmPassword, setConfirmPassword] = useState(BOUTIQUE_DEFAULT_PASSWORD)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (mode === 'register') {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        setErrorMessage('Please fill in all required fields.')
        return
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.')
        return
      }
      register({
        firstName,
        lastName,
        email,
        password,
      })
      router.push('/account')
    } else {
      if (!email.trim()) {
        setErrorMessage('Please enter your client email address.')
        return
      }
      const success = login(email, password)
      if (success) {
        router.push('/account')
      } else {
        setErrorMessage(`Invalid boutique credentials. Use default password: "${BOUTIQUE_DEFAULT_PASSWORD}"`)
      }
    }
  }

  const handleOneClickDemo = () => {
    loginAsDemoUser()
    router.push('/account')
  }

  return (
    <div className="min-h-screen w-full bg-[#121110] text-[#f4efe9] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Subtle ambient luxury glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#c9b293]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar: Return to Boutique & Bespoke Brand Wordmark */}
      <div className="w-full max-w-[1040px] mb-4 flex items-center justify-between px-2 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#a7a297] hover:text-[#f4efe9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#c9b293]" />
          <span>Return to Flagship Boutique</span>
        </Link>

        <div className="flex flex-col items-end leading-none">
          <span className="font-sans text-lg font-medium tracking-[0.25em] text-[#f4efe9] uppercase">
            AURORA
          </span>
          <span className="mt-0.5 font-mono text-[8px] tracking-[0.2em] text-[#8a857d] uppercase">
            CHENNAI ATELIER
          </span>
        </div>
      </div>

      {/* Main Authentication Card - Two Columns Bespoke to AURORA */}
      <div className="w-full max-w-[1040px] bg-[#1c1b18] rounded-3xl sm:rounded-[2.25rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] border border-[#38352f]/90 overflow-hidden relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* LEFT COLUMN: Atelier Heritage & Signature 3-Photo Narrative */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#21201d]/90 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#302e2a]">
            <div>
              {/* Gold Kicker */}
              <p className="text-[#c9b293] font-mono font-medium text-xs uppercase tracking-[0.22em] mb-1">
                Atelier Private Circle
              </p>

              {/* Subtitle */}
              <p className="text-[#8a857d] font-sans font-medium text-xs uppercase tracking-wider mb-2">
                Bespoke Wardrobe &amp; Patronage
              </p>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe9] leading-[1.08] tracking-tight mb-4">
                Quiet forms. <br />
                <em className="text-[#c9b293] font-normal italic">Sculpted drape.</em>
              </h1>

              {/* Atelier Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-[#2a2824] text-[#cfcac2] border border-[#3d3a33]">
                  Micro-Batches (30–50)
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-[#2a2824] text-[#cfcac2] border border-[#3d3a33]">
                  Salon Fittings
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-[#2a2824] text-[#cfcac2] border border-[#3d3a33]">
                  Textile Provenance
                </span>
              </div>

              {/* 3-Photo Collage featuring real editorial craft & silhouettes */}
              <div className="grid grid-cols-2 gap-3 aspect-[4/3] sm:aspect-[16/11]">
                {/* Left tall photo: Mulberry Silk Bias Cut Slip */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-sm bg-[#161514] border border-[#35332e] group">
                  <Image
                    src="/images/real-dress.jpg"
                    alt="Mulberry Silk Bias Cut Slip Drape"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-[#c9b293] uppercase tracking-wider">
                    Silk Drape · 45°
                  </span>
                </div>

                {/* Right stacked photos: Tailored Blazer & Linen Weave */}
                <div className="grid grid-rows-2 gap-3 h-full">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm bg-[#161514] border border-[#35332e] group">
                    <Image
                      src="/images/real-blazer.jpg"
                      alt="Hand-Pressing Belgian Flax Linen Blazer"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#cfcac2] uppercase tracking-wider">
                      Flax Tailoring
                    </span>
                  </div>

                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm bg-[#161514] border border-[#35332e] group">
                    <Image
                      src="/images/real-linen-close.jpg"
                      alt="100% Belgian Dew-Retted Flanders Flax Linen Weave"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#cfcac2] uppercase tracking-wider">
                      185 GSM Flax
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Atelier Caption */}
            <div className="pt-6 mt-6 border-t border-[#302e2a] flex items-center justify-between text-xs text-[#8a857d] font-sans">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9b293]" />
                Chennai Atelier Flagship
              </span>
              <span className="font-mono text-[11px] text-[#c9b293]">Khader Nawaz Khan Rd</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Atelier Client Authentication Portal */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-[#1c1b18] flex flex-col justify-between">
            <div className="max-w-md w-full mx-auto">
              {/* Form Heading & Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe9] tracking-tight">
                  {mode === 'register' ? 'Enter the Atelier Circle' : 'Welcome Back, Patron'}
                </h2>
                <p className="text-[#a7a297] font-sans text-xs sm:text-sm mt-1 leading-relaxed">
                  {mode === 'register'
                    ? 'Register your client profile for bespoke orders, tailoring measurements, and private fittings.'
                    : 'Access your bespoke tailoring orders, salon fitting appointments, and silhouette records.'}
                </p>
              </div>

              {/* Mode Toggle Switcher */}
              <div className="grid grid-cols-2 p-1 bg-[#151413] rounded-full border border-[#302e2a] mb-5 sm:mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setErrorMessage('')
                  }}
                  className={`py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans uppercase tracking-wider rounded-full transition-all cursor-pointer font-medium ${
                    mode === 'login'
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
                    setErrorMessage('')
                  }}
                  className={`py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans uppercase tracking-wider rounded-full transition-all cursor-pointer font-medium ${
                    mode === 'register'
                      ? 'bg-[#c9b293] text-[#181716] font-semibold shadow'
                      : 'text-[#8a857d] hover:text-[#f4efe9]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-200 text-xs font-sans">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#252420] border border-[#38352f] text-sm font-sans text-[#f4efe9] placeholder:text-[#6a665f] focus:outline-none focus:border-[#c9b293] transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#252420] border border-[#38352f] text-sm font-sans text-[#f4efe9] placeholder:text-[#6a665f] focus:outline-none focus:border-[#c9b293] transition-all"
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
                    placeholder="test@aurora.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#252420] border border-[#38352f] text-sm font-sans text-[#f4efe9] placeholder:text-[#6a665f] focus:outline-none focus:border-[#c9b293] transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-sans font-medium text-[#cfcac2]">
                      Boutique Password
                    </label>
                    <span className="text-[11px] font-mono text-[#c9b293] bg-[#2a2824] px-2 py-0.5 rounded border border-[#3d3a33] flex items-center gap-1">
                      <KeyRound className="w-3 h-3 text-[#c9b293]" /> {BOUTIQUE_DEFAULT_PASSWORD}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={mode === 'register' ? 'Create a boutique password' : 'Enter your boutique password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#252420] border border-[#38352f] text-sm font-mono text-[#f4efe9] placeholder:text-[#6a665f] focus:outline-none focus:border-[#c9b293] transition-all"
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
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#252420] border border-[#38352f] text-sm font-mono text-[#f4efe9] placeholder:text-[#6a665f] focus:outline-none focus:border-[#c9b293] transition-all"
                    />
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-[#c9b293] hover:bg-[#dfcaa8] active:scale-[0.99] text-[#181716] font-sans font-semibold text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <span>{mode === 'register' ? 'Join Atelier Circle' : 'Access Patron Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </form>

              {/* One-Click Demo Access Button */}
              <div className="mt-3.5 pt-3.5 border-t border-[#302e2a]">
                <button
                  type="button"
                  onClick={handleOneClickDemo}
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl border border-dashed border-[#444038] hover:border-[#c9b293] bg-[#22211e] hover:bg-[#282622] text-[#cfcac2] hover:text-[#f4efe9] text-[10px] sm:text-xs font-mono transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9b293]" />
                  <span>One-Click Quick Login ({BOUTIQUE_DEFAULT_PASSWORD})</span>
                </button>
              </div>

              {/* Bottom Switch Link */}
              <div className="mt-6 text-center">
                {mode === 'register' ? (
                  <p className="text-xs sm:text-sm font-sans text-[#a7a297]">
                    Already have an atelier account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login')
                        setErrorMessage('')
                      }}
                      className="text-[#c9b293] font-semibold hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm font-sans text-[#a7a297]">
                    New to AURORA?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register')
                        setErrorMessage('')
                      }}
                      className="text-[#c9b293] font-semibold hover:underline cursor-pointer"
                    >
                      Join the Circle
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
