/**
 * AURORA Motion System Tokens & Utilities
 * Restrained editorial motion architecture with strict prefers-reduced-motion support.
 */

export const motionTokens = {
  instant: 0.15,
  fast: 0.25,
  standard: 0.45,
  editorial: 0.7,
  cinematic: 1.1,
  stagger: 0.08,
} as const

export const easing = {
  luxury: [0.19, 1, 0.22, 1] as const, // Custom unhurried cubic-bezier
  standard: [0.4, 0, 0.2, 1] as const,
}

export const productCardMotion = {
  imageHoverScale: 1.03,
  cardHoverY: -4,
  duration: 0.6,
  ease: easing.luxury,
}

export const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.editorial,
      ease: easing.luxury,
    },
  },
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTokens.stagger,
      delayChildren: 0.05,
    },
  },
}

/**
 * Returns true if the client environment prefers reduced motion.
 * Returns false on SSR.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
