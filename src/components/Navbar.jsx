import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link to="/" className="nav-logo-link" aria-label="Oven'ly Home">
          <img src="/Logo.png" alt="Oven'ly Logo" className="nav-logo" />
        </Link>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Menu
          </NavLink>
          <Link to="/menu" className="nav-link nav-order-btn">
            Order
          </Link>
        </div>
      </div>
    </nav>
  )
}
