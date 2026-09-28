import './Hero.css'

export default function Hero({ eyebrow, title, description, primaryCta, secondaryCta, highlights }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              {primaryCta}
            </a>
            <a href="#featured" className="btn btn-secondary">
              {secondaryCta}
            </a>
          </div>

          <ul className="hero-highlights" aria-label="What we offer">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <aside className="hero-card" aria-label="Trip snapshot">
          <div className="card-badge">Best seller</div>
          <h2>Alpine Escape</h2>
          <p>7-day premium alpine route with glacier views, summit mornings, and luxury lodge nights.</p>
          <div className="card-meta">
            <span>Starts at $1,480</span>
            <span>Difficulty: Moderate</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
