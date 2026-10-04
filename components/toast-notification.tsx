'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'

export function ToastNotification() {
  const { toastMessage } = useStore()

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#16161e] border border-[#d4af37]/40 text-[#f5f5f7] shadow-2xl rounded-sm backdrop-blur-md max-w-sm"
        >
          <div className="w-6 h-6 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37] shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-serif leading-snug">{toastMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
