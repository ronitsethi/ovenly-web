import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
  </svg>
)
const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 4h4l1.6 4-2 1.4a13 13 0 0 0 6 6L16 13.4l4 1.6v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>
  </svg>
)
const IconInsta = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
  </svg>
)

export default function Footer() {
  const location = useLocation()
  const isMenuPage = location.pathname === '/menu'

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Red CTA area */}
      <div className="site-footer-cta">
        <div className="container">
          <p className="label-caps site-footer-eyebrow">
            {isMenuPage ? 'Ready to celebrate?' : 'Ready to order?'}
          </p>
          <h2 className="display-lg site-footer-headline">
            {isMenuPage ? (
              <>Call us for custom orders<br/><em>& celebrations!</em></>
            ) : (
              <>Desserts that<br/><em>sparkle just like you!</em></>
            )}
          </h2>

          {!isMenuPage && (
            <div className="site-footer-actions">
              <Link to="/menu" className="site-footer-btn">
                Browse the Menu <IconArrow width="14" height="14"/>
              </Link>
            </div>
          )}

          <div className="site-footer-social">
            <a href="tel:+919140223957" className="site-footer-link"><IconPhone width="13" height="13"/> +91 91402 23957</a>
            <span className="site-footer-dot">·</span>
            <a href="https://www.instagram.com/o.v.e.n.ly" className="site-footer-link" target="_blank" rel="noreferrer"><IconInsta width="13" height="13"/> @o.v.e.n.ly</a>
          </div>
        </div>
      </div>

      {/* Policy links strip */}
      <div className="site-footer-bottom">
        <div className="container">
          <div className="site-footer-policies">
            <Link to="/policies/refund-policy">Refund Policy</Link>
            <span>·</span>
            <Link to="/policies/privacy-policy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/policies/terms-of-service">Terms</Link>
            <span>·</span>
            <Link to="/policies/contact">Contact</Link>
          </div>
          <p className="site-footer-copy">© 2026 Oven'ly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
