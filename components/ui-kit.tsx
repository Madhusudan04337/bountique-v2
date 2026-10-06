'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, LucideIcon, Heart } from 'lucide-react'
import { formatMoney } from '@/lib/store'

// ==========================================
// 1. DESIGN SYSTEM: ATELIER BUTTON
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'dark'
  size?: 'xs' | 'sm' | 'md' | 'lg'
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
  const baseClasses = 'inline-flex items-center justify-center font-sans tracking-wide font-medium transition-all duration-200 rounded-full cursor-pointer select-none whitespace-nowrap active:scale-[0.98]'

  const sizeClasses = {
    xs: 'text-[10px] h-7 px-3 gap-1',
    sm: 'text-xs h-8 px-3.5 gap-1.5',
    md: 'text-xs h-9 px-4.5 gap-2',
    lg: 'text-xs sm:text-sm h-10 px-5 sm:px-6 gap-2'
  }[size]

  const variantClasses = {
    primary: 'bg-[#c9b293] hover:bg-[#dfcaa8] text-[#181716] shadow-sm hover:shadow-[0_4px_16px_rgba(201,178,147,0.2)]',
    secondary: 'bg-[#24221f] hover:bg-[#2e2b26] text-[#f4efe9] border border-[#3b3832] hover:border-[#c9b293] shadow-sm',
    outline: 'bg-transparent hover:bg-[#201f1c] text-[#f4efe9] border border-[#3d3a33] hover:border-[#c9b293]',
    ghost: 'bg-transparent hover:bg-[#252320]/60 text-[#c9b293] hover:text-[#dfcaa8]',
    glass: 'bg-[#181716] hover:bg-[#22201d] text-[#f4efe9] border border-[#3b3832] hover:border-[#c9b293] shadow-sm',
    dark: 'bg-[#181716] hover:bg-[#22201d] text-[#f4efe9] border border-[#33312c]'
  }[variant]

  const widthClass = fullWidth ? 'w-full' : ''
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
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
      {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
    </motion.button>
  )
}

// ==========================================
// 2. DESIGN SYSTEM: ICON BUTTON
// ==========================================
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: 'subtle' | 'primary' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
  label?: string
}

export function AtelierIconButton({
  icon: Icon,
  variant = 'glass',
  size = 'md',
  active = false,
  label,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 p-1',
    md: 'w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 p-1.5',
    lg: 'w-10 h-10 sm:w-11 sm:h-11 p-2'
  }[size]

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5'
  }[size]

  const variantClasses = {
    glass: active
      ? 'bg-[#c9b293] text-[#181716] border-[#c9b293] shadow-md'
      : 'bg-[#181716] text-[#a7a297] hover:text-white border-[#38352f] hover:border-[#c9b293]',
    primary: 'bg-[#c9b293] text-[#181716] border-transparent hover:bg-[#dfcaa8]',
    outline: 'bg-transparent text-[#a7a297] hover:text-white border-[#38352f] hover:border-[#c9b293]',
    subtle: 'bg-[#22201d] text-[#a7a297] hover:text-white border-[#33312c] hover:border-[#c9b293]'
  }[variant]

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      type="button"
      aria-label={label}
      className={`rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-sm ${sizeClasses} ${variantClasses} ${className}`}
      {...(props as any)}
    >
      <Icon className={iconSizes} />
    </motion.button>
  )
}

// ==========================================
// 3. DESIGN SYSTEM: ATELIER BADGE / TAG / PILL
// ==========================================
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
    gold: 'bg-[#1e1c19] border-[#c9b293]/40 text-[#c9b293]',
    subtle: 'bg-[#181716] border-[#38352f] text-[#a7a297]',
    scarcity: 'bg-[#2a1e17] border-[#8a4e32]/60 text-[#e89069]',
    emerald: 'bg-[#16241b] border-[#326941]/60 text-[#55e08b]',
    mono: 'bg-[#201f1c] border-[#38352f] text-[#f4efe9]'
  }[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-sans font-medium uppercase tracking-wider shadow-sm whitespace-nowrap ${variantStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  )
}

// ==========================================
// 4. DESIGN SYSTEM: PRICE TAG WITH PROPER SPACING
// ==========================================
export interface PriceTagProps {
  price: number
  originalPrice?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceTag({
  price,
  originalPrice,
  color,
  size = 'md',
  className = ''
}: PriceTagProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-lg sm:text-xl'
  }[size]

  return (
    <div className={`flex items-baseline justify-between font-mono gap-2 ${sizeClasses} ${className}`}>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[#f4efe9] font-medium tabular-nums">
          {formatMoney(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-[10px] text-[#78736b] line-through tabular-nums">
            {formatMoney(originalPrice)}
          </span>
        )}
      </div>
      {color && (
        <span className="text-[11px] text-[#8a857d] font-sans truncate">
          {color}
        </span>
      )}
    </div>
  )
}

// ==========================================
// 5. DESIGN SYSTEM: FILTER PILL
// ==========================================
export interface FilterPillProps {
  label: string
  active?: boolean
  onClick: () => void
  count?: number
}

export function FilterPill({ label, active = false, onClick, count }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 sm:h-9 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
        active
          ? 'border-[#c9b293] bg-[#c9b293] text-[#181716] font-semibold shadow-sm'
          : 'border-[#38352f] bg-[#201f1c]/70 text-[#a7a297] hover:text-white hover:border-[#524f46]'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-[#181716]/20 text-[#181716]' : 'bg-[#181716] text-[#8a857d]'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

// ==========================================
// 6. DESIGN SYSTEM: SECTION HEADER
// ==========================================
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
    <div className={`relative z-10 mb-6 sm:mb-10 flex flex-col ${align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end justify-between'} gap-3 sm:gap-4 ${className}`}>
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-xl'}>
        {kicker && (
          <div className="mb-2">
            <AtelierBadge variant="gold" icon={KickerIcon}>
              {kicker}
            </AtelierBadge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f4efe9] leading-tight tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm font-sans text-[#a7a297] mt-1.5 sm:mt-2.5 leading-relaxed prose-readable">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#c9b293] hover:text-[#f4efe9] transition-colors shrink-0 group self-start sm:self-auto cursor-pointer pb-0.5 border-b border-[#c9b293]/30 hover:border-[#c9b293]"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}

// ==========================================
// 7. DESIGN SYSTEM: REUSABLE CARD CONTAINER
// ==========================================
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
    'arch-top': 'rounded-2xl sm:rounded-3xl',
    'arch-diagonal': 'rounded-2xl sm:rounded-3xl',
    'pill': 'rounded-2xl sm:rounded-3xl',
    'soft': 'rounded-2xl sm:rounded-3xl'
  }[contour]

  return (
    <div
      onClick={onClick}
      className={`relative bg-[#21201d] border border-[#35332e] shadow-xl overflow-hidden ${contourClasses} ${glow ? 'shadow-[0_0_40px_rgba(201,178,147,0.06)]' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
