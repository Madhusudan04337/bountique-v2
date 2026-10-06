'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileNav } from '@/components/mobile-nav'
import { FloatingVipStylist } from '@/components/floating-vip-stylist'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchModal } from '@/components/search-modal'
import { SalonBookingModal } from '@/components/salon-booking-modal'
import { ProvenanceModal } from '@/components/provenance-modal'
import { VipStylistDrawer } from '@/components/vip-stylist-drawer'
import { ToastNotification } from '@/components/toast-notification'
import { useStore } from '@/lib/store'

interface LayoutShellProps {
  children: React.ReactNode
}

/**
 * Distraction-Free Shell.
 * Excludes SiteHeader, SiteFooter, MobileNav, and Floating widgets on authentication routes (/login, /register, and unauthenticated /account).
 */
export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname()
  const { user } = useStore()
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register' ||
    (pathname === '/account' && !user)

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#121110] text-[#f4efe9]">
        <ToastNotification />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    )
  }

  return (
    <>
      <SiteHeader />
      <CartDrawer />
      <SearchModal />
      <SalonBookingModal />
      <ProvenanceModal />
      <VipStylistDrawer />
      <FloatingVipStylist />
      <ToastNotification />
      <div className="flex-1 pb-16 md:pb-0">{children}</div>
      <MobileNav />
      <SiteFooter />
    </>
  )
}
