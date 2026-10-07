import updates from '../data/latest.json'
import './FeaturePage.css'
import './LatestPage.css'

export default function LatestPage() {
  const sortedUpdates = [...updates].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="latest-page">
      <section className="field-hero field-hero--latest">
        <div className="container field-hero__content">
          <p className="eyebrow">Recent field notes</p>
          <h1>Latest from the mountains</h1>
          <p>Recent, source-linked updates from mountaineering communities, covering route learning, safety decisions, conservation and gear.</p>
        </div>
      </section>
      <section className="container latest-content">
        <p className="latest-context">This selection combines recent club field reports with a published 2026 gear preview. Report dates refer to the activity described; the gear item shows its publication date. Follow each source for full context and any subsequent updates.</p>
        <div className="latest-grid">
          {sortedUpdates.map((item) => (
            <article className="latest-card" key={item.id}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
              <div className="latest-card__body">
                <div className="latest-meta"><span>{item.category}</span><time dateTime={item.date}>{new Date(`${item.date}T12:00:00`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <a href={item.source} target="_blank" rel="noreferrer">{item.sourceLabel} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
