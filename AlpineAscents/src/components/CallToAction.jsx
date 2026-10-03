import './CallToAction.css'
import { Link } from 'react-router-dom'

export default function CallToAction({ content = {} }) {
  const eyebrow = content.eyebrow ?? 'Start planning'
  const title = content.title ?? 'Ready to summit your next big idea?'
  const label = content.label ?? 'Plan My Journey'
  const href = content.href ?? 'mailto:hello@alpineascents.com'

  return (
    <section className="cta-section">
      <div className="container cta-box" id="contact">
        <div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2>{title}</h2>
        </div>

        {href.startsWith('/')
          ? <Link to={href} className="btn btn-primary btn-light">{label}</Link>
          : <a href={href} className="btn btn-primary btn-light">{label}</a>}
      </div>
    </section>
  )
}
