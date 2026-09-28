import './Header.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header({ nav, phone, brand }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Alpine Ascents home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark__peak" />
          </span>
          <span>{brand}</span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {nav.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="header-phone">
          {phone}
        </a>
      </div>
    </header>
  )
}
