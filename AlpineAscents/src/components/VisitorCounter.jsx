import { useEffect, useState } from 'react'
import './VisitorCounter.css'

const COUNT_KEY = 'alpine-ascents-visitors'
const SESSION_KEY = 'alpine-ascents-visited-this-session'

function readVisitorCount(seed) {
  let count = seed
  try {
    const saved = Number.parseInt(window.localStorage.getItem(COUNT_KEY), 10)
    if (Number.isFinite(saved) && saved >= seed) count = saved
  } catch {
    return count
  }

  try {
    if (window.sessionStorage.getItem(SESSION_KEY) !== '1') {
      window.sessionStorage.setItem(SESSION_KEY, '1')
      count += 1
    }
  } catch {
    return count
  }

  try {
    window.localStorage.setItem(COUNT_KEY, String(count))
  } catch {
    return count
  }
  return count
}

export default function VisitorCounter({ seed = 1200 }) {
  const [count] = useState(() => readVisitorCount(seed))

  useEffect(() => {
    try {
      window.localStorage.setItem(COUNT_KEY, String(count))
    } catch {
      return
    }
  }, [count])

  return <span className="visitor-counter" aria-label={`${count.toLocaleString()} visitors`}>Visitors: {count.toLocaleString()}</span>
}
