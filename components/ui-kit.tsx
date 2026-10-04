'use client'

import React from 'react'
import Link from 'next/link'
import { motion, HTMLMotionProps } from 'motion/react'
import { ArrowRight, LucideIcon } from 'lucide-react'

// 1. REUSABLE ATELIER BUTTON
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  href?: string
  fullWidth?: boolean
}

export function AtelierButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  href,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-mono uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full cursor-pointer select-none'

  const sizeClasses = {
    sm: 'text-[10px] py-2 px-3.5 gap-1.5 min-h-[38px]',
    md: 'text-xs py-3 px-5 sm:px-6 gap-2 min-h-[44px]',
    lg: 'text-xs sm:text-sm py-3.5 sm:py-4 px-6 sm:px-8 gap-2.5 min-h-[48px]'
  }[size]

  const variantClasses = {
    primary: 'bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] shadow-lg hover:shadow-[0_10px_25px_rgba(201,178,147,0.25)] hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-[#252320] hover:bg-[#302d28] text-[#f4efe9] border border-[#3d3a33] hover:border-[#c9b293] shadow-md active:scale-[0.98]',
    outline: 'bg-transparent hover:bg-[#201f1c] text-[#f4efe9] border border-[#3d3a33] hover:border-[#c9b293] active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-[#252320]/60 text-[#c9b293] hover:text-[#dfcaa8]',
    glass: 'bg-[#181716]/80 hover:bg-[#1f1e1b] text-[#f4efe9] border border-[#3b3832] backdrop-blur-md shadow-md active:scale-[0.98]'
  }[variant]

  const widthClass = fullWidth ? 'w-full' : ''
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 shrink-0" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 shrink-0" />}
      </Link>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={combinedClasses}
      disabled={disabled}
      {...(props as any)}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 shrink-0" />}
    </motion.button>
  )
}

// 2. REUSABLE ATELIER BADGE / TAG
export interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'subtle' | 'scarcity' | 'emerald' | 'mono'
  icon?: LucideIcon
  className?: string
}

export function AtelierBadge({
  children,
  variant = 'gold',
  icon: Icon,
  className = ''
}: BadgeProps) {
  const variantStyles = {
    gold: 'bg-[#1e1c19]/90 border-[#c9b293]/40 text-[#c9b293]',
    subtle: 'bg-[#181716]/80 border-[#38352f] text-[#a7a297]',
    scarcity: 'bg-[#2a1e17]/90 border-[#8a4e32]/60 text-[#e89069]',
    emerald: 'bg-[#16241b]/90 border-[#326941]/60 text-[#55e08b]',
    mono: 'bg-[#201f1c] border-[#38352f] text-[#f4efe9]'
  }[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-sm ${variantStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  )
}

// 3. REUSABLE SECTION HEADER
export interface SectionHeaderProps {
  kicker?: string
  kickerIcon?: LucideIcon
  title: React.ReactNode
  description?: string
  actionHref?: string
  actionLabel?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  kicker,
  kickerIcon: KickerIcon,
  title,
  description,
  actionHref,
  actionLabel,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`relative z-10 mb-8 sm:mb-12 flex flex-col ${align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end justify-between'} gap-4 ${className}`}>
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-xl'}>
        {kicker && (
          <div className="mb-2">
            <AtelierBadge variant="gold" icon={KickerIcon}>
              {kicker}
            </AtelierBadge>
          </div>
        )}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#f4efe9] leading-tight tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm font-sans text-[#a7a297] mt-2 sm:mt-3 leading-relaxed prose-readable">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#c9b293] hover:text-[#f4efe9] transition-colors shrink-0 group self-start sm:self-auto cursor-pointer"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}

// 4. REUSABLE ORGANIC SURFACE CARD
export interface OrganicCardProps {
  children: React.ReactNode
  contour?: 'arch-top' | 'arch-diagonal' | 'pill' | 'soft'
  glow?: boolean
  className?: string
  onClick?: () => void
}

export function OrganicCard({
  children,
  contour = 'soft',
  glow = false,
  className = '',
  onClick
}: OrganicCardProps) {
  const contourClasses = {
    'arch-top': 'rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-2xl sm:rounded-b-3xl',
    'arch-diagonal': 'rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl',
    'pill': 'rounded-[2.5rem] sm:rounded-[3rem]',
    'soft': 'rounded-2xl sm:rounded-3xl'
  }[contour]

  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-b from-[#22211e]/95 via-[#1e1d1a]/90 to-[#191817] border border-[#35332e] shadow-xl backdrop-blur-md overflow-hidden ${contourClasses} ${glow ? 'shadow-[0_0_50px_rgba(201,178,147,0.08)]' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
