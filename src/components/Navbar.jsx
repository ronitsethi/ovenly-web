import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCustomer } from '../context/CustomerContext'
import SearchOverlay from './SearchOverlay'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalQuantity, setIsCartOpen, notification } = useCart()
  const { isLoggedIn } = useCustomer()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo-link" aria-label="Oven'ly Home">
            <img src="/Logo.png" alt="Oven'ly Logo" className="nav-logo" />
          </Link>
          <div className="nav-links">

            <NavLink
              to="/menu"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Menu
            </NavLink>

            {/* Search */}
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              id="nav-search-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>

            {/* Account */}
            <Link
              to={isLoggedIn ? '/account' : '/login'}
              className="nav-icon-btn"
              aria-label={isLoggedIn ? 'My account' : 'Login'}
              id="nav-account-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {isLoggedIn && <span className="nav-logged-dot" />}
            </Link>

            {/* Cart */}
            <button
              className="nav-icon-btn nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${totalQuantity} items)`}
              id="nav-cart-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalQuantity > 0 && (
                <span className="nav-cart-badge">{totalQuantity}</span>
              )}
            </button>
          </div>
        </div>

        {/* Cart notification toast */}
        {notification && (
          <div className="nav-toast" key={notification}>
            {notification}
          </div>
        )}
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
