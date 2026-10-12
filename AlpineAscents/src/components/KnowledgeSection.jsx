import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './KnowledgeSection.css'

// JSON page shape: { title, intro, heroImage?, heroAlt?, heroCredit?, sections: [{ heading, text, image, alt, imageCredit?, facts?, details?, steps? }], modules?, sources?, nextTopic }. Card modules may also include imageCredit on each card. Modules are reusable data-driven blocks: timeline, cards, table, notice, video, hazards, or records.
function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function ComparisonTable({ module }) {
  return (
    <div className="knowledge-table-scroll" role="region" aria-label={module.heading} tabIndex="0">
      <table className="knowledge-table">
        <thead><tr>{module.columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead>
        <tbody>
          {module.rows.map((row) => (
            <tr key={row.key || module.columns.map(({ key }) => row[key]).join('-')}>
              {module.columns.map((column) => <td key={column.key}>{row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RecordTable({ module }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState({ key: 'date', direction: 'asc' })
  const categories = ['All', ...new Set(module.records.map((record) => record.category))]
  const records = useMemo(() => module.records
    .filter((record) => category === 'All' || record.category === category)
    .filter((record) => Object.values(record).join(' ').toLowerCase().includes(query.toLowerCase()))
    .sort((left, right) => {
      const leftValue = sort.key === 'date' ? Date.parse(left[sort.key]) : Number.NaN
      const rightValue = sort.key === 'date' ? Date.parse(right[sort.key]) : Number.NaN
      const result = Number.isNaN(leftValue) || Number.isNaN(rightValue)
        ? String(left[sort.key]).localeCompare(String(right[sort.key]), undefined, { numeric: true })
        : leftValue - rightValue
      return sort.direction === 'asc' ? result : -result
    }), [category, module.records, query, sort])

  function toggleSort(key) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className="knowledge-records">
      <div className="knowledge-records__filters">
        <label>
          Search records
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a name, date, or mountain" />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <p aria-live="polite">{records.length} record{records.length === 1 ? '' : 's'}</p>
      </div>
      <div className="knowledge-table-scroll" role="region" aria-label="Sortable mountaineering records" tabIndex="0">
        <table className="knowledge-table">
          <thead>
            <tr>{module.columns.map((column) => (
              <th key={column.key} scope="col">
                <button type="button" onClick={() => toggleSort(column.key)} aria-label={`Sort by ${column.label}`}>
                  {column.label}{sort.key === column.key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ''}
                </button>
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.key}>
                {module.columns.map(({ key }) => <td key={key}>{record[key]}</td>)}
              </tr>
            ))}
            {records.length === 0 && <tr><td colSpan={module.columns.length}>No records match your search.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ContentModule({ module }) {
  const id = module.id || slugify(module.heading)

  if (module.type === 'timeline') {
    return (
      <section className="knowledge-module" id={id}>
        <h2>{module.heading}</h2>
        <ol className="knowledge-timeline">
          {module.events.map((event) => (
            <li key={`${event.date}-${event.title}`}>
              <time>{event.date}</time><div><h3>{event.title}</h3><p>{event.text}</p></div>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  if (module.type === 'cards') {
    return (
      <section className="knowledge-module" id={id}>
        <h2>{module.heading}</h2>
        {module.intro && <p className="knowledge-module__intro">{module.intro}</p>}
        <div className="knowledge-cards">
          {module.cards.map((card) => (
            <article className="knowledge-card" key={card.title}>
              <figure className="knowledge-card__image">
                <img src={card.image} alt={card.alt} loading="lazy" />
                {card.imageCredit && <figcaption>Image: <a href={card.imageCredit.url} target="_blank" rel="noreferrer">{card.imageCredit.label}</a></figcaption>}
              </figure>
              <div className="knowledge-card__body">
                <h3>{card.title}</h3><p>{card.description}</p>
                {card.terrain && <p><strong>Typical terrain:</strong> {card.terrain}</p>}
                {card.skill && <p><strong>Skill level:</strong> {card.skill}</p>}
                {card.gear && <p><strong>Common gear:</strong> {card.gear}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (module.type === 'table') {
    return <section className="knowledge-module" id={id}><h2>{module.heading}</h2><ComparisonTable module={module} /></section>
  }

  if (module.type === 'notice') {
    return (
      <aside className={`knowledge-notice knowledge-notice--${module.tone || 'safety'}`} id={id}>
        <h2>{module.heading}</h2><p>{module.text}</p>
      </aside>
    )
  }

  if (module.type === 'video') {
    return (
      <section className="knowledge-module knowledge-video" id={id}>
        <h2>{module.heading}</h2><p>{module.text}</p>
        <a href={module.url} target="_blank" rel="noreferrer">{module.linkLabel} <span aria-hidden="true">↗</span></a>
      </section>
    )
  }

  if (module.type === 'hazards') {
    return (
      <section className="knowledge-module" id={id}>
        <h2>{module.heading}</h2>
        {module.groups.map((group) => (
          <div className="knowledge-hazard-group" key={group.heading}>
            <h3>{group.heading}</h3>
            <div className="knowledge-hazards">
              {group.hazards.map((hazard) => (
                <article className="knowledge-hazard" key={hazard.name}>
                  <div className="knowledge-hazard__title"><h4>{hazard.name}</h4><span className={`risk-badge risk-badge--${hazard.risk.toLowerCase()}`}>{hazard.risk} risk</span></div>
                  <p>{hazard.description}</p>
                  <dl>
                    <div><dt>Causes</dt><dd>{hazard.cause}</dd></div>
                    <div><dt>Warning signs</dt><dd>{hazard.signs}</dd></div>
                    <div><dt>Risk reduction</dt><dd>{hazard.reduction}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    )
  }

  if (module.type === 'records') {
    return (
      <section className="knowledge-module" id={id}>
        <h2>{module.heading}</h2>
        <p className="knowledge-as-of">{module.asOf}</p>
        <RecordTable module={module} />
        {module.note && <p className="knowledge-table-note">{module.note}</p>}
      </section>
    )
  }

  return null
}

export default function KnowledgeSection({ title, intro, heroImage, heroAlt, heroCredit, sections = [], modules = [], sources = [], nextTopic }) {
  const contents = [
    ...sections.map((section) => ({ label: section.heading, id: slugify(section.heading) })),
    ...modules.map((module) => ({ label: module.heading, id: module.id || slugify(module.heading) })),
  ]

  return (
    <article className="knowledge-page">
      <header className="knowledge-hero" style={heroImage ? { '--knowledge-hero-image': `url("${heroImage}")` } : undefined}>
        <div className="container knowledge-hero__inner">
          <p className="eyebrow">Alpine field guide</p><h1>{title}</h1>
          {heroAlt && <span className="knowledge-hero__image-description">{heroAlt}</span>}
          {heroCredit && <span className="knowledge-hero__image-description">Photo: <a href={heroCredit.url} target="_blank" rel="noreferrer">{heroCredit.label}</a></span>}
        </div>
      </header>

      <div className="container knowledge-intro">
        <p>{intro}</p>
      </div>

      <div className="container knowledge-layout">
        <aside className="knowledge-toc" aria-label="On this page">
          <h2>On this page</h2>
          <nav><ul>{contents.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ul></nav>
        </aside>

        <div className="knowledge-content">
          {sections.map((section, index) => (
            <section className={`knowledge-section${index % 2 ? ' knowledge-section--reverse' : ''}`} id={slugify(section.heading)} key={section.heading}>
              <div className="knowledge-section__copy">
                <p className="knowledge-section__index">{String(index + 1).padStart(2, '0')}</p>
                <h2>{section.heading}</h2>
                {section.text && <p>{section.text}</p>}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.details && <dl className="knowledge-details">{section.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.text}</dd></div>)}</dl>}
                {section.steps && <ol className="knowledge-steps">{section.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
                {section.facts && <aside className="knowledge-facts"><h3>Key facts</h3><ul>{section.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></aside>}
              </div>
              <figure className="knowledge-section__image">
                <img src={section.image} alt={section.alt} loading={index < 2 ? 'eager' : 'lazy'} />
                {section.imageCredit && <figcaption>Image: <a href={section.imageCredit.url} target="_blank" rel="noreferrer">{section.imageCredit.label}</a></figcaption>}
              </figure>
            </section>
          ))}
          {modules.map((module) => <ContentModule module={module} key={module.id || module.heading} />)}
        </div>
      </div>

      {sources.length > 0 && (
        <section className="container knowledge-sources">
          <h2>Sources &amp; image credits</h2>
          <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
        </section>
      )}

      <nav className="knowledge-next" aria-label="Continue exploring">
        {nextTopic && <Link to={nextTopic.href}>Next topic: {nextTopic.label} <span aria-hidden="true">→</span></Link>}
        <Link to="/">Back to overview</Link>
      </nav>
    </article>
  )
}
