'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import productsData from '@/data/products.json'

export interface GarmentMeasurements {
  chest: { cm: number; in: number }
  shoulder: { cm: number; in: number }
  length: { cm: number; in: number }
  sleeve: { cm: number; in: number }
  waist?: { cm: number; in: number }
  hip?: { cm: number; in: number }
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  detailImage?: string
  tag?: string
  category: 'Tailoring' | 'Silk Dresses' | 'Tops & Shirts' | 'Bottoms'
  color: string
  colorHex: string
  sizes: string[]
  fabric: string
  origin: string
  description: string
  details: string[]
  care: string
  rating: number
  reviewsCount: number
  // Luxury Maison Provenance Specs
  batchNumber: string
  editionLimit: number
  stockRemaining: number
  masterTailor: string
  silhouetteFit: 'Sculpted Slim' | 'Natural Relaxed' | 'Fluid Oversized'
  measurements: Record<string, GarmentMeasurements>
}

export interface CartItem {
  id: string
  productId: string
  name: string
  slug: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

export interface Review {
  id: string
  author: string
  location: string
  rating: number
  date: string
  comment: string
  helpful: number
}

export interface StyledLook {
  id: string
  title: string
  subtitle: string
  image: string
  hotspots: {
    productId: string
    productName: string
    price: number
    top: string
    left: string
  }[]
  bundledProductIds: string[]
  bundleDiscountPercent: number
}

export interface SalonBooking {
  name: string
  email: string
  phone: string
  date: string
  time: string
  category: string
  notes?: string
}

export const initialProducts: Product[] = productsData as Product[]

export const styledLooks: StyledLook[] = [
  {
    id: 'look-coastal-tailoring',
    title: 'The Coastal Tailoring Edit',
    subtitle: 'Washed linen blazer paired with high-rise pleated trousers.',
    image: '/images/real-look1.jpg',
    hotspots: [
      {
        productId: 'linen-blazer-01',
        productName: 'The Linen Blazer',
        price: 6499,
        top: '36%',
        left: '46%'
      },
      {
        productId: 'pleat-trouser-04',
        productName: 'The Pleated Trouser',
        price: 4299,
        top: '72%',
        left: '52%'
      }
    ],
    bundledProductIds: ['linen-blazer-01', 'pleat-trouser-04'],
    bundleDiscountPercent: 10
  },
  {
    id: 'look-evening-slip',
    title: 'The Atelier Evening Edit',
    subtitle: 'Sandwashed mulberry silk slip paired with the raw silk draped wrap.',
    image: '/images/real-look2.jpg',
    hotspots: [
      {
        productId: 'silk-column-dress-02',
        productName: 'The Column Dress',
        price: 5899,
        top: '48%',
        left: '50%'
      },
      {
        productId: 'studio-wrap-top-05',
        productName: 'The Draped Top',
        price: 2899,
        top: '26%',
        left: '46%'
      }
    ],
    bundledProductIds: ['silk-column-dress-02', 'studio-wrap-top-05'],
    bundleDiscountPercent: 10
  },
  {
    id: 'look-studio-terrace',
    title: 'The Studio Drape & Terrace Edit',
    subtitle: 'Crisp organic cotton poplin shirt layered with the fluid midi skirt.',
    image: '/images/terrace-look.jpg',
    hotspots: [
      {
        productId: 'everyday-shirt-03',
        productName: 'The Everyday Shirt',
        price: 3499,
        top: '38%',
        left: '48%'
      },
      {
        productId: 'terrace-skirt-06',
        productName: 'The Midi Skirt',
        price: 3899,
        top: '70%',
        left: '50%'
      }
    ],
    bundledProductIds: ['everyday-shirt-03', 'terrace-skirt-06'],
    bundleDiscountPercent: 10
  }
]

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  wishlist: string[]
  isCartOpen: boolean
  isSearchOpen: boolean
  isSalonModalOpen: boolean
  isProvenanceModalOpen: boolean
  isStylistDrawerOpen: boolean
  giftPackaging: boolean
  cartSubtotal: number
  cartCount: number
  toastMessage: string | null
  setIsCartOpen: (open: boolean) => void
  setIsSearchOpen: (open: boolean) => void
  setIsSalonModalOpen: (open: boolean) => void
  setIsProvenanceModalOpen: (open: boolean) => void
  setIsStylistDrawerOpen: (open: boolean) => void
  setGiftPackaging: (val: boolean) => void
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void
  addBundleToCart: (productIds: string[]) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  showToast: (message: string) => void
  appliedCoupon: string | null
  discountAmount: number
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  salonBookings: SalonBooking[]
  bookSalonAppointment: (booking: SalonBooking) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSalonModalOpen, setIsSalonModalOpen] = useState(false)
  const [isProvenanceModalOpen, setIsProvenanceModalOpen] = useState(false)
  const [isStylistDrawerOpen, setIsStylistDrawerOpen] = useState(false)
  const [giftPackaging, setGiftPackaging] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [salonBookings, setSalonBookings] = useState<SalonBooking[]>([])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aurora_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      } else {
        setCart([
          {
            id: 'item-1',
            productId: 'linen-blazer-01',
            name: 'The Linen Blazer',
            slug: 'the-linen-blazer',
            price: 6499,
            image: '/images/real-blazer.jpg',
            size: 'S',
            color: 'Sand Tan',
            quantity: 1
          }
        ])
      }

      const savedWishlist = localStorage.getItem('aurora_wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('aurora_cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('aurora_wishlist', JSON.stringify(wishlist))
    } catch {}
  }, [wishlist])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const addToCart = (product: Product, size = 'S', color?: string, quantity = 1) => {
    const chosenColor = color || product.color
    const cartItemId = `${product.id}-${size}-${chosenColor}`

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId)
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          size,
          color: chosenColor,
          quantity
        }
      ]
    })

    showToast(`Added ${product.name} (${size}) to bag`)
    setIsCartOpen(true)
  }

  const addBundleToCart = (productIds: string[]) => {
    const itemsToAdd = products.filter(p => productIds.includes(p.id))
    itemsToAdd.forEach(p => {
      addToCart(p, 'S', p.color, 1)
    })
    setAppliedCoupon('LOOK10')
    showToast(`Added complete outfit look to bag (10% privilege applied)`)
    setIsCartOpen(true)
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId))
    showToast('Removed from bag')
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    setAppliedCoupon(null)
  }

  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId)
    setWishlist(prev => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId]
      try {
        localStorage.setItem('aurora_wishlist', JSON.stringify(next))
      } catch {}
      return next
    })
    const isCurrentlySaved = wishlist.includes(productId)
    showToast(isCurrentlySaved ? 'Removed from wishlist' : `Saved ${product ? product.name : 'piece'} to wishlist`)
  }

  const isWishlisted = (productId: string) => wishlist.includes(productId)

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const discountAmount =
    appliedCoupon === 'AURORA15'
      ? Math.round(cartSubtotal * 0.15)
      : appliedCoupon === 'LOOK10'
      ? Math.round(cartSubtotal * 0.10)
      : 0

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase()
    if (clean === 'AURORA15') {
      setAppliedCoupon('AURORA15')
      showToast('15% privilege code applied')
      return true
    }
    if (clean === 'LOOK10') {
      setAppliedCoupon('LOOK10')
      showToast('10% look styling privilege applied')
      return true
    }
    showToast('Invalid promo code')
    return false
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    showToast('Promo code removed')
  }

  const bookSalonAppointment = (booking: SalonBooking) => {
    setSalonBookings(prev => [booking, ...prev])
    showToast(`Fitting reserved for ${booking.name}`)
    setIsSalonModalOpen(false)
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        isSalonModalOpen,
        isProvenanceModalOpen,
        isStylistDrawerOpen,
        giftPackaging,
        cartSubtotal,
        cartCount,
        toastMessage,
        setIsCartOpen,
        setIsSearchOpen,
        setIsSalonModalOpen,
        setIsProvenanceModalOpen,
        setIsStylistDrawerOpen,
        setGiftPackaging,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        showToast,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        salonBookings,
        bookSalonAppointment
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export const formatMoney = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
