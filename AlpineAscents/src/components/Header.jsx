import './Header.css'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import VisitorCounter from './VisitorCounter'

export default function Header({ nav, phone, brand, visitorSeed }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const location = useLocation()
  const exploreItems = nav.filter((item) => item.group === 'explore')
  const primaryItems = nav.filter((item) => item.group !== 'explore')

  return (
    <header
      className="site-header"
      onKeyDownCapture={(event) => {
        if (event.key === 'Escape') {
          setMenuOpen(false)
          setExploreOpen(false)
        }
      }}
    >
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Alpine Ascents home">
          <span>{brand}</span>
        </NavLink>

        <nav
          id="main-navigation"
          className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}
          aria-label="Main navigation"
          onClick={(event) => {
            if (event.target.closest('a')) {
              setMenuOpen(false)
              setExploreOpen(false)
            }
          }}
        >
          {primaryItems.slice(0, 1).map((item) => (
            <NavLink key={item.href} to={item.href} end className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>
          ))}
          <div
            className={`explore-menu ${exploreOpen ? 'explore-menu--open' : ''}`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setExploreOpen(true)
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') setExploreOpen(false)
            }}
            onFocus={() => setExploreOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setExploreOpen(false)
            }}
          >
            <button
              className={`explore-toggle ${exploreItems.some((item) => item.href === location.pathname) ? 'active' : ''}`}
              type="button"
              aria-expanded={exploreOpen}
              aria-controls="explore-links"
              onClick={(event) => {
                if (event.nativeEvent.pointerType === 'mouse') {
                  setExploreOpen(true)
                } else {
                  setExploreOpen((open) => !open)
                }
              }}
            >Explore <span aria-hidden="true">⌄</span></button>
            <div className="explore-links" id="explore-links">
              {exploreItems.map((item) => (
                <NavLink key={item.href} to={item.href} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>
              ))}
            </div>
          </div>
          {primaryItems.slice(1).map((item) => (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        ><span /><span /><span /></button>

        <div className="header-tools">
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="header-phone">{phone}</a>
          <VisitorCounter seed={visitorSeed} />
          <img className="header-logo" src="/alpine-mark.svg" alt={`${brand} logo`} width="40" height="40" />
        </div>
      </div>
    </header>
  )
}
