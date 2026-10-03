import './Hero.css'

export default function Hero({ eyebrow, title, description, primaryCta, secondaryCta, highlights, snapshot }) {
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

        <aside className="hero-card" aria-label={snapshot.title}>
          <div className="card-badge">{snapshot.badge}</div>
          <h2>{snapshot.title}</h2>
          <p>{snapshot.description}</p>
          <div className="card-meta">
            {snapshot.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </aside>
      </div>
    </section>
  )
}
