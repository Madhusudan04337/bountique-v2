'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { prefersReducedMotion } from '@/lib/motion'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Editorial Smooth Scroll Provider using official Lenis React wrapper.
 * Selectively activates on editorial routes (Home, Our Story, Journal).
 * Preserves native scrolling on commerce, checkout, account, cart, and overlay dialogs.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Only enable Lenis on editorial routes per specification
  const isEditorialRoute =
    pathname === '/' ||
    pathname === '/story' ||
    pathname.startsWith('/story/') ||
    pathname === '/journal' ||
    pathname.startsWith('/journal/')

  // Fallback to native scrolling if not editorial route or user prefers reduced motion
  if (!isEditorialRoute || reducedMotion) {
    return <div data-native-scroll="true">{children}</div>
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        prevent: (node: HTMLElement) =>
          node.closest('[data-native-scroll]') !== null ||
          node.closest("[role='dialog']") !== null ||
          node.classList?.contains('modal-content'),
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
