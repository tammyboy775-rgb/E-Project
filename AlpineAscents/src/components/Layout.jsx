import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Ticker from './Ticker'
import data from '../data/alpineAscentsData.json'

export default function Layout() {
  const { pathname, key } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key])

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) return undefined

    const targets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        } else {
          entry.target.classList.add('reveal-pending')
        }
      })
    }, { threshold: 0.01, rootMargin: '0px 0px -24px 0px' })

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="app-shell">
      <Header nav={data.header.nav} phone={data.header.phone} brand={data.brand} visitorSeed={data.visitorCountSeed} />

      <main>
        <Outlet />
      </main>

      <Footer
        address={data.footer.address}
        email={data.footer.email}
        copyright={data.footer.copyright}
        brand={data.brand}
      />
      <Ticker />
    </div>
  )
}
