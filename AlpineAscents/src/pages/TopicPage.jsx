import { Link } from 'react-router-dom'
import './TopicPage.css'
import content from '../data/mountaineeringPages.json'

export default function TopicPage({ pageKey }) {
  const page = content.pages[pageKey]
  if (!page) return null

  return (
    <div className="topic-page">
      <section className="topic-hero" style={{ '--topic-image': `url("${page.image}")` }}>
        <div className="container topic-hero__inner">
          <p className="eyebrow">Alpine field notes</p>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
        </div>
      </section>

      {page.gallery && (
        <section className="container topic-gallery" aria-label="Mountain photo gallery">
          {page.gallery.map((image) => (
            <figure key={image.image}><img src={image.image} alt={image.alt} loading="lazy" /></figure>
          ))}
        </section>
      )}

      <section className="container topic-sections">
        {page.sections.map((section, index) => (
          <article className="topic-section reveal" key={section.title}>
            <span className="topic-index">{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{section.title}</h2><p>{section.text}</p></div>
          </article>
        ))}
      </section>

      {pageKey === 'records' && (
        <section className="container records-map">
          <div><p className="eyebrow eyebrow-dark">High places</p><h2>Where the world's highest peaks rise</h2></div>
          <iframe title="OpenStreetMap view of the Everest region" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=86.5%2C27.5%2C87.4%2C28.3&layer=mapnik&marker=27.9881%2C86.925" />
          <a href="https://www.openstreetmap.org/?mlat=27.9881&mlon=86.925#map=8/27.9881/86.925" target="_blank" rel="noreferrer">Open this area in OpenStreetMap</a>
        </section>
      )}

      <nav className="topic-next" aria-label="Continue exploring">
        <Link to="/guidelines">Prepare for the mountains <span aria-hidden="true">→</span></Link>
        <Link to="/">Back to overview</Link>
      </nav>
    </div>
  )
}
