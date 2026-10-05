'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AtelierButton, AtelierBadge } from '@/components/ui-kit'
import { useStore } from '@/lib/store'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { setIsProvenanceModalOpen } = useStore()

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        // Reduced motion: show content immediately without animation
        gsap.set([imageRef.current, contentRef.current], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        })
        return
      }

      // Initial sequential entrance reveal: image first, then headline, subtitle, CTA
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      entranceTl
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.1 }
        )
        .fromTo(
          contentRef.current?.querySelectorAll('.hero-anim-item') || [],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.6'
        )

      // Parallax scroll effect: image movement within 8% section height, text upward ~12px
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0, // Scrub between 0.8 and 1.2 per spec
        },
      })

      if (imageRef.current) {
        parallaxTl.to(
          imageRef.current,
          {
            yPercent: 8, // Strictly within 8% of section height
            ease: 'none',
          },
          0
        )
      }

      if (contentRef.current) {
        parallaxTl.to(
          contentRef.current,
          {
            y: -12, // Text upward by ~12px
            opacity: 0.82,
            ease: 'none',
          },
          0
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-[78vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pb-28"
    >
      {/* Background Image with Layered Vignette and Subtle Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/real-hero.jpg"
          alt="AURORA High Summer Silk & Linen Editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] filter brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/35 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8">
        <div
          ref={contentRef}
          className="max-w-xl space-y-5 sm:space-y-6"
        >
          <div className="hero-anim-item">
            <AtelierBadge variant="gold" icon={Sparkles}>
              High Summer Edit · 2026
            </AtelierBadge>
          </div>

          <h1 className="hero-anim-item text-4xl sm:text-6xl lg:text-7xl font-serif text-[#f4efe9] leading-[1.05] tracking-tight">
            Quiet forms. <br />
            <em className="text-[#c9b293] font-normal italic">Sculpted drape.</em>
          </h1>

          <p className="hero-anim-item text-sm sm:text-base font-sans text-[#cfcac2] max-w-md leading-relaxed prose-readable">
            Belgian flax linen and raw mulberry silk, cut in unhurried limited editions inside our Chennai atelier.
          </p>

          <div className="hero-anim-item pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-stretch sm:items-center">
            <AtelierButton
              href="/collection"
              variant="primary"
              size="md"
              icon={ArrowRight}
            >
              Explore Silhouettes
            </AtelierButton>

            <AtelierButton
              onClick={() => setIsProvenanceModalOpen(true)}
              variant="glass"
              size="md"
              icon={Compass}
              iconPosition="left"
            >
              Textile Provenance
            </AtelierButton>
          </div>
        </div>
      </div>

      {/* Decorative Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#181716] to-transparent pointer-events-none z-10" />
    </section>
  )
}
