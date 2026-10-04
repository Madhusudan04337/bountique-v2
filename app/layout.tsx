import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import { SiteHeader } from '@/components/site-header'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchModal } from '@/components/search-modal'
import { ToastNotification } from '@/components/toast-notification'
import { SalonBookingModal } from '@/components/salon-booking-modal'
import { ProvenanceModal } from '@/components/provenance-modal'
import { VipStylistDrawer } from '@/components/vip-stylist-drawer'
import { FloatingVipStylist } from '@/components/floating-vip-stylist'
import { ReadingProgress } from '@/components/reading-progress'
import { MobileNav } from '@/components/mobile-nav'
import { SiteFooter } from '@/components/site-footer'

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-[#181716] text-[#f4efe9] min-h-screen flex flex-col font-sans selection:bg-[#c9b293]/30" suppressHydrationWarning>
        <StoreProvider>
          <ReadingProgress />
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
        </StoreProvider>
      </body>
    </html>
  )
}
