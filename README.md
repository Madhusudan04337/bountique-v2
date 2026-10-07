# AURORA — Boutique Flagship

> **Everyday elegance, considered in Chennai.**  
> A boutique luxury e-commerce experience crafted with tactile editorial storytelling, interactive garment hotspots, seamless cart orchestration, and private salon concierge services.

---

## ✦ Overview

**AURORA** is a luxury fashion and atelier digital flagship celebrating slow, considered wardrobe essentials tailored in Chennai. Built on Next.js 15+, React 19, Tailwind CSS v4, and Motion, AURORA pairs high-fidelity visual design with smooth, responsive interactions.

---

## ✦ Key Features

### 1. Interactive "Shop the Look" Editorial Suite
- **Hotspot garment discovery**: Tap interactive coordinate pins to preview materials, tailored cut details, and real-time inventory.
- **Texture loupe zoom**: Examine high-resolution weave patterns and natural fabric finishes.
- **Bundle & individual purchasing**: Add individual curated pieces or the entire outfit coordinate directly to your shopping bag with 1-click bundle savings.
- **Dynamic looks carousel**: Seamless transition between runway and editorial sets with persistent selection memory.

### 2. Digital Atelier & Storytelling
- **Runway & Editorial Parallax**: Smooth, physics-based scroll choreography driven by Lenis & Motion.
- **Provenance & Sustainability Portal**: Interactive modals exploring organic Belgian flax, hand-reeled mulberry silk, and Chennai heritage master-tailoring.
- **Curated Journal & Press Room**: Editorial archives, styling notes, and publications featuring the atelier.

### 3. VIP Stylist Concierge & Salon Appointments
- **Floating VIP Stylist**: In-context personal stylist consultation drawer with instant guidance on sizing, silhouettes, and wardrobe curation.
- **Private Salon Fitting Booking**: Real-time appointment scheduling for in-person bespoke fittings at the Khader Nawaz Khan Road flagship salon.

### 4. Seamless Shopping & Checkout Flow
- **Side-Dock Cart Drawer**: Slide-over bag with free shipping milestones, promo code redemption, size/quantity adjustments, and quick item removal.
- **Full-Featured Checkout**: Multi-step order flow with real-time address validation, shipping methods, promo application, and order summaries.
- **Wishlist & Client Accounts**: Persistent favorites list and private account dashboard with order history tracking.

---

## ✦ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15+ (App Router)** | Hybrid server & client architecture, optimized routing, metadata API |
| **React 19** | Component hierarchy, hooks, and modern client primitives |
| **TypeScript 5.7+** | End-to-end type safety across store, catalog, and UI components |
| **Tailwind CSS v4** | Utility-first styling with modern CSS variables and zero-pill discipline |
| **Motion (`motion/react`)** | Fluid layout transitions, spring physics, and animated drawers |
| **Lenis & GSAP** | Inertial smooth scrolling and parallax performance |
| **Lucide React** | Consistent, high-clarity iconography |

---

## ✦ Design System & Aesthetic

AURORA follows an architectural, warm-noir visual identity:

- **Color Palette**:
  - `Canvas / Deep Dark`: `#181716`, `#141312`
  - `Card / Surface`: `#201f1c`, `#24221e`
  - `Borders & Rules`: `#38352f`, `#302e2a`
  - `Champagne Gold / Accents`: `#c9b293`, `#dfcaa8`
  - `Text & Contrast`: `#f5f2eb` (Primary), `#a8a29e` (Secondary)
- **Typography**:
  - **Editorial Headings**: *Cormorant Garamond* (Serif elegance)
  - **Interface & Body**: *Manrope* (Clean geometric legibility)
  - **Technical & Metrics**: *DM Mono* (Tailoring specifications & sizing)

---

## ✦ Project Structure

```
.
├── app/
│   ├── account/          # Client account & order history
│   ├── cart/             # Dedicated full-page cart
│   ├── checkout/         # Multi-step checkout & payment
│   ├── collection/       # Catalog & category filters
│   ├── contact/          # Flagship location, map & contact
│   ├── journal/          # Editorial stories & articles
│   ├── login/ & register/# Authentication views
│   ├── product/[id]/     # Comprehensive Product Detail Page (PDP)
│   ├── story/            # Atelier heritage & sustainability
│   ├── wishlist/         # Saved wardrobe items
│   ├── globals.css       # Tailwind v4 configuration & base styles
│   ├── layout.tsx        # Root layout with fonts & providers
│   └── page.tsx          # Flagship homepage & editorial showcase
├── components/
│   ├── shop-the-look.tsx # Interactive lookbook & hotspot engine
│   ├── runway-carousel.tsx# Full-bleed runway showcase
│   ├── product-card.tsx  # Product card with quick-add & wishlist
│   ├── storefront-pages.tsx # PDP, Collection, Checkout & Account UI
│   ├── site-header.tsx   # Responsive top navigation & search trigger
│   ├── site-footer.tsx   # Atelier footer & newsletter
│   ├── cart-drawer.tsx   # Flyout mini-bag & order summary
│   ├── vip-stylist-drawer.tsx # Personal styling consultation
│   ├── salon-booking-modal.tsx # Chennai salon fitting scheduler
│   ├── sizing-guide-modal.tsx # Bespoke sizing & measurements
│   ├── ui-kit.tsx        # Buttons, badges, inputs & modals
│   └── storytelling/     # Parallax and editorial components
├── data/
│   └── products.json     # Master catalog, materials, & look definitions
└── lib/
    ├── store.tsx         # Global shopping cart, wishlist & auth context
    ├── motion.ts         # Animation presets & ease curves
    └── utils.ts          # Class utilities & formatting helpers
```

---

## ✦ Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or bun

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd aurora-boutique
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the boutique flagship.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ✦ Scripts

- `npm run dev`: Starts the Next.js development server on port 3000.
- `npm run build`: Compiles and optimizes the app for production deployment.
- `npm run start`: Serves the built production app.
- `npm run lint`: Validates TypeScript and ESLint rules.

---

## ✦ Flagship Salon & Concierge

**AURORA Flagship Atelier**  
No. 42, Khader Nawaz Khan Road,  
Nungambakkam, Chennai, Tamil Nadu 600006  
*Private fittings available Tuesday through Sunday by appointment.*
