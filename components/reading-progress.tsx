'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9b293] via-[#dfcaa8] to-[#f4efe9] z-50 pointer-events-none shadow-[0_0_8px_rgba(201,178,147,0.6)]"
      aria-hidden="true"
    />
  )
}
