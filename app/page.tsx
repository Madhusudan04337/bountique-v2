'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'

const products = [
  { name: 'The Linen Blazer', price: '₹6,499', image: '/images/linen-fashion.png', tag: 'Bestseller' },
  { name: 'The Column Dress', price: '₹4,999', image: '/images/editorial-fashion.png', tag: 'New in' },
  { name: 'The Everyday Shirt', price: '₹3,499', image: '/images/linen-fashion.png', tag: 'Essential' },
  { name: 'The Pleat Trouser', price: '₹4,299', image: '/images/lookbook-fashion.png', tag: 'New in' },
]

const categories = [
  { name: 'Women', image: '/images/editorial-fashion.png' },
  { name: 'Festive & Ethnic', image: '/images/editorial-fashion.png' },
  { name: 'Accessories', image: '/images/lookbook-fashion.png' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <div className="announcement">Complimentary shipping on orders over ₹3,000 <span>·</span> Chennai, India</div>
    <header className="site-header">
      <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
      <nav className="desktop-nav"><Link href="/collection">Shop</Link><Link href="#story">Our story</Link><Link href="#journal">Journal</Link></nav>
      <Link href="/" className="wordmark">[ AURORA ]</Link>
      <div className="header-actions"><button className="icon-button" aria-label="Search"><Search /></button><Link className="icon-button desktop-only" href="/wishlist" aria-label="Wishlist"><Heart /></Link><Link className="icon-button" href="/cart" aria-label="Shopping bag"><ShoppingBag /><sup>0</sup></Link></div>
    </header>
    {menuOpen && <div className="mobile-menu"><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button><span className="eyebrow">Navigate</span><Link href="/collection" onClick={() => setMenuOpen(false)}>Shop all</Link><Link href="/collection/new-arrivals" onClick={() => setMenuOpen(false)}>New arrivals</Link><Link href="#story" onClick={() => setMenuOpen(false)}>Our story</Link><Link href="#journal" onClick={() => setMenuOpen(false)}>Journal</Link></div>}
  </>
}

function ProductCard({ product, large = false }: { product: typeof products[number], large?: boolean }) {
  const [liked, setLiked] = useState(false)
  return <article className={`product-card ${large ? 'product-card-large' : ''}`}>
    <div className="product-image"><Link href={product.name === 'The Linen Blazer' ? '/product/the-linen-blazer' : `/product?item=${encodeURIComponent(product.name.toLowerCase().replaceAll(' ', '-'))}`} aria-label={`View ${product.name}`}><Image src={product.image} alt={product.name} fill sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'} /></Link><span className="product-tag">{product.tag}</span><button className="quick-add" aria-label={`Quick add ${product.name}`}>Add to bag</button><button className="wishlist-button" aria-label={`Add ${product.name} to wishlist`} onClick={() => setLiked(!liked)}><Heart fill={liked ? 'currentColor' : 'none'} /></button></div>
    <div className="product-meta"><div><h3>{product.name}</h3><p>Chennai studio / 01</p></div><strong>{product.price}</strong></div>
  </article>
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('New arrivals')
  const tabs = ['New arrivals', 'Bestsellers', 'Just dropped']
  return <main>
    <Header />
    <section className="hero">
      <Image src="/images/hero-fashion.png" alt="Aurora summer edit model in soft tailoring" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-copy"><span className="eyebrow light">Summer edit / 2026</span><h1>Essential<br /><em>summer</em> edit</h1><p>Quiet forms. Considered textiles.<br />Made for all-day elegance.</p><Link href="/collection" className="button button-light">Explore the collection <ArrowRight /></Link></div>
      <div className="hero-bottom"><span>Scroll to discover</span><span className="scroll-line" /><span>01 / 04</span></div>
    </section>
    <section className="trust-bar"><div><Sparkles /><span><b>Made in Chennai</b><small>Thoughtful, local production</small></span></div><div><span className="trust-mark">↗</span><span><b>Easy returns</b><small>14 days, no questions asked</small></span></div><div><span className="trust-mark">○</span><span><b>Slow fashion</b><small>Quality over quantity</small></span></div></section>
    <section className="section category-section" id="shop"><div className="section-heading"><div><span className="eyebrow">01 / Curated categories</span><h2>Shop by category</h2></div><Link href="/collection" className="text-link">View all <ArrowRight /></Link></div><div className="category-grid">{categories.map((category) => <Link className="category-card" href="/collection" key={category.name}><Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 33vw, 33vw" /><span>{category.name}</span><ArrowRight /></Link>)}</div></section>
    <section className="section fresh-section" id="fresh"><div className="section-heading"><div><span className="eyebrow">02 / Current drops</span><h2>Fresh arrivals</h2></div><Link href="/collection/new-arrivals" className="filter-link">View all arrivals <ArrowRight /></Link></div><div className="tabs">{tabs.map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="product-grid"><div className="product-card-link"><ProductCard product={products[0]} large /></div><div className="product-stack"><ProductCard product={products[1]} /><ProductCard product={products[2]} /></div><div className="product-stack"><ProductCard product={products[3]} /><ProductCard product={products[1]} /></div></div></section>
    <section className="editorial-banner"><div className="editorial-copy"><span className="eyebrow">03 / The everyday edit</span><h2>Your everyday style,<br /><em>redefined.</em></h2><p>Crafted in Chennai using lightweight, sustainable textiles designed for all-day elegance.</p><Link href="/collection" className="button button-dark">Explore collection <ArrowRight /></Link></div><div className="editorial-image"><Image src="/images/editorial-portrait.png" alt="Aurora everyday edit" fill sizes="(max-width: 768px) 100vw, 50vw" /></div></section>
    <section className="section story-section" id="story"><div className="story-image"><Image src="/images/linen-fashion.png" alt="Soft tailoring detail" fill sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="story-copy"><span className="eyebrow">04 / Our point of view</span><h2>Clothes with<br /><em>a point of view.</em></h2><p>Aurora is a study in the everyday. A wardrobe of intelligent silhouettes, natural textures and easy confidence, designed in Chennai and made to move with you.</p><p>We believe getting dressed should feel like a small act of self-expression — never a compromise.</p><Link href="#journal" className="text-link">Read our story <ArrowRight /></Link></div></section>
    <section className="lookbook" id="journal"><div className="lookbook-heading"><span className="eyebrow">05 / The lookbook</span><h2>Quiet confidence,<br /><em>in every frame.</em></h2><p>Discover the pieces that make an entrance without trying.</p></div><div className="lookbook-images"><Image src="/images/lookbook-fashion.png" alt="Monochrome Aurora look" width={520} height={650} /><Image src="/images/editorial-fashion.png" alt="Aurora atelier look" width={420} height={520} /></div></section>
    <section className="newsletter"><span className="eyebrow">The Aurora letter</span><h2>15% off your first order.</h2><p>Notes on new collections, early access and stories from the studio.</p><form><input type="email" placeholder="Your email address" aria-label="Your email address" /><button type="submit">Subscribe <ArrowRight /></button></form></section>
    <footer><div className="footer-brand"><Link href="/" className="wordmark">[ AURORA ]</Link><p>Everyday elegance,<br />considered in Chennai.</p></div><div><span className="footer-title">Collections</span><Link href="/collection">New arrivals</Link><Link href="/collection">The essentials</Link><Link href="/collection">Festive edit</Link></div><div><span className="footer-title">Customer care</span><Link href="#">Delivery & returns</Link><Link href="#">Size guide</Link><Link href="mailto:hello@aurora.example">Contact us</Link></div><div><span className="footer-title">Connect</span><Link href="#">Instagram</Link><Link href="#">Pinterest</Link><Link href="#">Journal</Link></div><div className="footer-end">© 2026 Aurora. All rights reserved.</div></footer>
    <nav className="bottom-nav"><Link href="/"><span>⌂</span>Home</Link><Link href="/collection"><span>⌕</span>Shop</Link><Link href="/wishlist"><span>♡</span>Saved</Link><Link href="/cart"><span>□</span>Bag</Link></nav>
  </main>
}

// Decorative editorial copy uses CSS and local assets from the supplied reference archive.

                    
