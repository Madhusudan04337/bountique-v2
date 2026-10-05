import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope, DM_Mono } from 'next/font/google'
import './globals.css'
import { MotionConfig } from 'motion/react'
import { StoreProvider } from '@/lib/store'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { SiteHeader } from '@/components/site-header'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchModal } from '@/components/search-modal'
import { ToastNotification } from '@/components/toast-notification'
import { SalonBookingModal } from '@/components/salon-booking-modal'
import { ProvenanceModal } from '@/components/provenance-modal'
import { VipStylistDrawer } from '@/components/vip-stylist-drawer'
import { FloatingVipStylist } from '@/components/floating-vip-stylist'
import { MobileNav } from '@/components/mobile-nav'
import { SiteFooter } from '@/components/site-footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AURORA — Chennai Boutique Flagship',
  description: 'Considered silhouettes, natural Belgian flax, and mulberry silk tailored in Chennai.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#181716',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${manrope.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#181716] text-[#f4efe9] min-h-screen flex flex-col font-sans selection:bg-[#c9b293]/30" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">
          <StoreProvider>
            <SmoothScrollProvider>
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
            </SmoothScrollProvider>
          </StoreProvider>
        </MotionConfig>
      </body>
    </html>
  )
}
