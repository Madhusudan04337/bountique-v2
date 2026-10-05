# Implementation Plan — AURORA Motion & Typography Architecture

Implement the refined editorial typography and three-tier motion architecture for the AURORA premium fashion flagship, honoring the exact motion tokens, font pairings, Lenis smooth-scroll boundaries, and reduced-motion compliance.

---

## 1. Typography & Font System (`next/font/google`)

### Font Loaders in `app/layout.tsx`
Replace all CSS `@import` font calls with zero-layout-shift `next/font/google` instances:
- **Cormorant Garamond**:
  - Subsets: `["latin"]`
  - Weights: `["400", "500", "600", "700"]`
  - Styles: `["normal", "italic"]`
  - Variable: `--font-cormorant`
  - Usage: Hero headlines, editorial titles, pull quotes, page titles, and selected product names.
- **Manrope**:
  - Subsets: `["latin"]`
  - Weights: `["300", "400", "500", "600", "700"]`
  - Variable: `--font-manrope`
  - Usage: Navigation, body copy, catalog filters, forms, buttons, account pages, and checkout.
- **DM Mono**:
  - Subsets: `["latin"]`
  - Weights: `["400", "500"]`
  - Variable: `--font-dm-mono`
  - Usage: Utility text only — prices, order IDs, SKUs, fabric composition, delivery estimates, edition labels.

### HTML Element & CSS Variables Mapping
- Set `className={`${cormorant.variable} ${manrope.variable} ${dmMono.variable}`}` on `<html>`.
- Map in `app/globals.css`:
  ```css
  :root {
    --font-serif: var(--font-cormorant), Georgia, serif;
    --font-sans: var(--font-manrope), Arial, sans-serif;
    --font-mono: var(--font-dm-mono), monospace;

    --text-display: clamp(3.5rem, 9vw, 9rem);
    --text-h1: clamp(2.75rem, 6vw, 6rem);
    --text-h2: clamp(2rem, 4vw, 4rem);
    --text-h3: clamp(1.5rem, 2.5vw, 2.5rem);
    --text-body: 1rem;
    --text-small: 0.8125rem;
    --tracking-label: 0.14em;
    --tracking-wordmark: 0.25em;
  }

  @theme {
    --font-serif: var(--font-cormorant), Georgia, serif;
    --font-sans: var(--font-manrope), Arial, sans-serif;
    --font-mono: var(--font-dm-mono), monospace;
  }
  ```

---

## 2. Wordmark & Header Modernization

Update the AURORA brand mark in `components/site-header.tsx`:
```tsx
<div className="flex flex-col leading-none">
  <span className="font-sans text-xl font-medium tracking-[0.25em] text-[#f4efe9] group-hover:text-[#c9b293] transition-colors">
    AURORA
  </span>
  <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-[#8a857d] uppercase">
    ATELIER
  </span>
</div>
```
- Keep uppercase styling restricted to navigation labels, buttons, metadata, and small editorial tags.

---

## 3. Motion System & Tokens (`lib/motion.ts`)

### Animation Layering
1. **Layer 1: CSS Transitions**: Color changes, link underlines, opacity changes, focus rings, simple button hovers.
2. **Layer 2: Motion (`motion/react`)**: Cart drawer, modals, dropdowns, accordions, wishlist heart, product card hovers, toasts, and route transitions.
3. **Layer 3: GSAP ScrollTrigger**: Hero parallax, pinned Our Story chapters, horizontal Journal gallery, scroll progress. (Never used for simple buttons/modals).

### Motion Tokens & Easing Constants (`lib/motion.ts`)
```ts
export const motionTokens = {
  instant: 0.15,
  fast: 0.25,
  standard: 0.45,
  editorial: 0.7,
  cinematic: 1.1,
  stagger: 0.08,
}

export const easing = {
  luxury: [0.19, 1, 0.22, 1],
  standard: [0.4, 0, 0.2, 1],
}

export const productCardMotion = {
  imageHoverScale: 1.03,
  cardHoverY: -4,
  duration: 0.6,
  ease: [0.19, 1, 0.22, 1],
}
```

### MotionConfig
Wrap app root in `app/layout.tsx` with:
```tsx
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

---

## 4. Selective Lenis Smooth Scrolling

### Packages
Install `lenis`, `gsap`, and `@gsap/react`.

### Provider (`components/smooth-scroll-provider.tsx`)
- Activate Lenis **strictly on editorial routes**: `/` (homepage), `/story` (Our Story), and `/journal`.
- Preserve **native scrolling** for `/collection`, cart, checkout, account, contact, modal overlays, and long forms.
- Configure options:
  - `autoRaf: true`
  - `duration: 1.2`
  - `smoothWheel: true`
  - `syncTouch: false`
  - `anchors: true`
  - `prevent: (node) => node.closest('[data-native-scroll]') !== null || node.closest("[role='dialog']") !== null`
- Single RAF loop guarantee (no duplicate RAF loops).

### Modals & Drawers Containment
- On open/close: stop Lenis for the main viewport when overlay is active.
- Modal container styles:
  ```css
  overflow-y: auto;
  overscroll-behavior: contain;
  max-height: 90dvh;
  ```
- Focus trapping and Escape key listeners with focus restoration.

---

## 5. GSAP Storytelling Components

1. **`components/storytelling/hero-parallax.tsx`**:
   - Subtle parallax on the background image (within 8% section height).
   - Text moves upward by max 12px.
   - Scrub between 0.8 and 1.2.
   - Clean sequential reveal: image first, then headline, subtitle, and CTA.
   - Uses `gsap.context()` for clean React cleanup.
2. **`components/storytelling/pinned-story.tsx`**:
   - Pinned narrative chapters for the Our Story page.
   - Clean chapter transitions without abrupt scroll snapping.
3. **`components/storytelling/horizontal-gallery.tsx`**:
   - Horizontal editorial gallery for the Journal page.
   - Responsive fallback: Native horizontal scroll on touch/mobile devices.

---

## 6. Full `prefers-reduced-motion` Enforcement

- GSAP ScrollTrigger: Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If true, set all elements with `clearProps: 'all'` and disable animations.
- Lenis: Disable momentum when reduced motion is preferred.
- Motion: `MotionConfig reducedMotion="user"` collapses animated transitions to instant/accessible states.

---

## 7. Implementation Order & Verification

1. Install `lenis`, `gsap`, `@gsap/react`.
2. Configure `next/font/google` in `app/layout.tsx` and CSS mappings in `app/globals.css`.
3. Create `lib/motion.ts` with tokens, easings, and reduced-motion checks.
4. Update `components/site-header.tsx` with the clean letterspaced wordmark.
5. Create `components/smooth-scroll-provider.tsx` with selective route matching.
6. Build GSAP components (`HeroParallax`, `PinnedStorySection`, `HorizontalGallery`) with `gsap.context()`.
7. Update PDP product card hover to match the exact 1.03 scale and -4px vertical lift.
8. Run verification:
   - `npm run lint`
   - `npm run typecheck` (or `compile_applet`)
   - `npm run build`
9. Validate responsive behavior on desktop, tablet, and mobile.
