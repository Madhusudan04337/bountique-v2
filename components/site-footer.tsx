import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/" className="wordmark">[ AURORA ]</Link>
        <p>Everyday elegance,<br />considered in Chennai.</p>
      </div>
      <div>
        <span className="footer-title">Collections</span>
        <Link href="/collection">New arrivals</Link>
        <Link href="/collection">The essentials</Link>
        <Link href="/collection">Festive edit</Link>
      </div>
      <div>
        <span className="footer-title">Customer care</span>
        <Link href="/contact">Delivery & returns</Link>
        <Link href="/contact">Size guide</Link>
        <Link href="/contact">Contact us</Link>
      </div>
      <div>
        <span className="footer-title">Connect</span>
        <Link href="/journal">Instagram</Link>
        <Link href="/journal">Pinterest</Link>
        <Link href="/journal">Journal</Link>
      </div>
      <div className="footer-meta">© 2026 Aurora. All rights reserved.</div>
    </footer>
  )
}
