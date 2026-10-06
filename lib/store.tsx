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

export interface UserOrderItem {
  name: string
  size: string
  color: string
  price: number
  image: string
  sku: string
  fabric: string
}

export interface UserOrder {
  id: string
  date: string
  total: number
  status: 'Tailoring in Chennai' | 'Hand Finishing' | 'Dispatched' | 'Delivered'
  trackingCode: string
  items: UserOrderItem[]
}

export interface UserMeasurements {
  shoulder: string
  bustOrChest: string
  waist: string
  hips: string
  sleeve: string
  inseam: string
  preferredLength: string
  fitPreference: 'Sculpted Slim' | 'Natural Relaxed' | 'Fluid Oversized'
}

export interface UserAddress {
  label: string
  street: string
  city: string
  state: string
  postalCode: string
}

export interface User {
  id: string
  salutation?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  tier: 'Circle Patron' | 'Atelier Member' | 'VIP Connoisseur'
  memberSince: string
  privilegeCode: string
  fabricPreference?: string
  notes?: string
  measurements: UserMeasurements
  savedAddresses?: UserAddress[]
  orders: UserOrder[]
}

export const BOUTIQUE_DEFAULT_PASSWORD = 'Test @1234'

export const DEFAULT_USER: User = {
  id: 'usr_aurora_default_01',
  salutation: 'Mx.',
  firstName: 'Default',
  lastName: 'User',
  email: 'test@aurora.com',
  phone: '+91 98401 00000',
  tier: 'Atelier Member',
  memberSince: '2026',
  privilegeCode: 'AURORA15',
  fabricPreference: 'Belgian Flax Linen & Sandwashed Silk',
  notes: 'Standard atelier fitting preferences.',
  measurements: {
    shoulder: '42 cm / 16.5 in',
    bustOrChest: '98 cm / 38.5 in',
    waist: '80 cm / 31.5 in',
    hips: '94 cm / 37.0 in',
    sleeve: '62 cm / 24.4 in',
    inseam: '78 cm / 30.7 in',
    preferredLength: 'Standard Floor Drape (102 cm)',
    fitPreference: 'Natural Relaxed'
  },
  savedAddresses: [
    {
      label: 'Home Delivery Address',
      street: '14/2 Khader Nawaz Khan Road, Nungambakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600006'
    }
  ],
  orders: [
    {
      id: 'AUR-2026-8842',
      date: '02 Oct 2026',
      total: 10398,
      status: 'Tailoring in Chennai',
      trackingCode: 'CH-ATELIER-0842-TN',
      items: [
        {
          name: 'The Linen Blazer',
          size: 'M',
          color: 'Sand Tan',
          price: 6499,
          image: '/images/real-blazer.jpg',
          sku: 'SKU-LNB-01-M',
          fabric: '100% Belgian Dew-Retted Flax'
        },
        {
          name: 'The Pleated Trouser',
          size: '32',
          color: 'Raw Ecru',
          price: 3899,
          image: '/images/real-pants.jpg',
          sku: 'SKU-PLT-04-32',
          fabric: 'Flanders Flax Linen'
        }
      ]
    },
    {
      id: 'AUR-2026-6190',
      date: '18 Aug 2026',
      total: 7299,
      status: 'Delivered',
      trackingCode: 'CH-DELIVERED-6190',
      items: [
        {
          name: 'The Mulberry Silk Slip',
          size: 'S',
          color: 'Midnight Noir',
          price: 7299,
          image: '/images/real-dress.jpg',
          sku: 'SKU-SLK-02-S',
          fabric: '100% Pure Tamil Nadu Mulberry Silk'
        }
      ]
    }
  ]
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
  user: User | null
  isAuthModalOpen: boolean
  authModalMode: 'signin' | 'register'
  setIsAuthModalOpen: (open: boolean) => void
  setAuthModalMode: (mode: 'signin' | 'register') => void
  login: (email: string, password?: string) => boolean
  loginAsDemoUser: () => void
  register: (data: { firstName: string; lastName: string; email: string; password?: string }) => void
  logout: () => void
  updateUserProfile: (data: Partial<User>) => void
  updateMeasurements: (measurements: UserMeasurements) => void
  saveAddress: (address: UserAddress, editIndex?: number) => void
  deleteAddress: (index: number) => void
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
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin')

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aurora_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      } else {
        setCart([])
      }

      const savedWishlist = localStorage.getItem('aurora_wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }

      const savedUser = localStorage.getItem('aurora_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
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

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('aurora_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('aurora_user')
      }
    } catch {}
  }, [user])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const login = (email: string, password?: string) => {
    const cleanPassword = password?.trim()
    if (cleanPassword && cleanPassword !== BOUTIQUE_DEFAULT_PASSWORD) {
      showToast('Incorrect boutique password. Use: Test @1234')
      return false
    }

    const loggedInUser: User = {
      ...DEFAULT_USER,
      email: email.trim() || DEFAULT_USER.email,
    }
    setUser(loggedInUser)
    showToast(`Welcome back, ${loggedInUser.firstName}`)
    setIsAuthModalOpen(false)
    return true
  }

  const loginAsDemoUser = () => {
    setUser(DEFAULT_USER)
    showToast(`Welcome back, ${DEFAULT_USER.firstName}`)
    setIsAuthModalOpen(false)
  }

  const register = (data: { firstName: string; lastName: string; email: string; password?: string }) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      firstName: data.firstName.trim() || 'Atelier',
      lastName: data.lastName.trim() || 'Client',
      email: data.email.trim(),
      tier: 'Atelier Member',
      memberSince: 'October 2026',
      privilegeCode: 'AURORA15',
      measurements: {
        shoulder: '42 cm / 16.5 in',
        bustOrChest: '96 cm / 37.8 in',
        waist: '80 cm / 31.5 in',
        hips: '94 cm / 37.0 in',
        preferredLength: 'Standard Floor Drape (102 cm)'
      },
      orders: [
        {
          id: `AUR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          date: 'Just Now',
          total: 6499,
          status: 'Tailoring in Chennai',
          trackingCode: 'CH-ATELIER-NEW-TN',
          items: [
            {
              name: 'The Linen Blazer',
              size: 'M',
              color: 'Sand Tan',
              price: 6499,
              image: '/images/real-blazer.jpg',
              sku: 'SKU-LNB-01-M',
              fabric: '100% Belgian Dew-Retted Flax'
            }
          ]
        }
      ]
    }
    setUser(newUser)
    showToast(`Welcome to the Atelier Circle, ${newUser.firstName}`)
    setIsAuthModalOpen(false)
  }

  const logout = () => {
    setUser(null)
    showToast('Signed out of boutique account')
  }

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return
    setUser(prev => (prev ? { ...prev, ...data } : null))
    showToast('Patron profile details updated')
  }

  const updateMeasurements = (measurements: UserMeasurements) => {
    if (!user) return
    setUser(prev => (prev ? { ...prev, measurements } : null))
    showToast('Atelier tailoring measurements saved')
  }

  const saveAddress = (address: UserAddress, editIndex?: number) => {
    if (!user) return
    setUser(prev => {
      if (!prev) return null
      const current = prev.savedAddresses || []
      let updated: UserAddress[]
      if (editIndex !== undefined && editIndex >= 0 && editIndex < current.length) {
        updated = current.map((a, i) => (i === editIndex ? address : a))
      } else {
        updated = [...current, address]
      }
      return { ...prev, savedAddresses: updated }
    })
    showToast('Delivery address saved')
  }

  const deleteAddress = (index: number) => {
    if (!user) return
    setUser(prev => {
      if (!prev) return null
      const current = prev.savedAddresses || []
      const updated = current.filter((_, i) => i !== index)
      return { ...prev, savedAddresses: updated }
    })
    showToast('Delivery address removed')
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
        bookSalonAppointment,
        user,
        isAuthModalOpen,
        authModalMode,
        setIsAuthModalOpen,
        setAuthModalMode,
        login,
        loginAsDemoUser,
        register,
        logout,
        updateUserProfile,
        updateMeasurements,
        saveAddress,
        deleteAddress
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
