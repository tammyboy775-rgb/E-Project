import { useEffect, useState } from 'react'
import './Ticker.css'

function formatDateTime(date) {
  return {
    date: date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  }
}

export default function Ticker() {
  const [now, setNow] = useState(() => formatDateTime(new Date()))
  const [location, setLocation] = useState(() => (
    typeof navigator !== 'undefined' && navigator.geolocation ? 'Locating…' : 'Location unavailable'
  ))

  useEffect(() => {
    const timer = window.setInterval(() => setNow(formatDateTime(new Date())), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const coordinates = `${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}`
      try {
        const query = new URLSearchParams({ format: 'jsonv2', lat: String(coords.latitude), lon: String(coords.longitude) })
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${query}`)
        if (!response.ok) throw new Error('Reverse geocoding failed')
        const result = await response.json()
        const address = result.address ?? {}
        const place = address.city || address.town || address.village || address.county || address.state
        setLocation(place ? `${place} (${coordinates})` : coordinates)
      } catch {
        setLocation(coordinates)
      }
    }, () => setLocation('Location unavailable'), { timeout: 10000, maximumAge: 300000 })
  }, [])

  const tickerText = `MOUNTAIN DESK   ${now.date}   ${now.time}   ${location}   CHECK CONDITIONS BEFORE YOU CLIMB`

  return (
    <aside className="site-ticker" aria-label="Current date, time and location">
      <div className="ticker-track" aria-hidden="true">
        <span className="ticker-copy">{tickerText}</span>
        <span className="ticker-copy">{tickerText}</span>
      </div>
      <span className="visually-hidden" aria-live="polite">{now.date}, {now.time}. {location}</span>
    </aside>
  )
}
