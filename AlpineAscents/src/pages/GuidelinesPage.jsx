import { useState } from 'react'
import { Link } from 'react-router-dom'
import './GuidelinesPage.css'
import guidelines from '../data/guidelines.json'

export default function GuidelinesPage() {
  const [checkedItems, setCheckedItems] = useState({})
  const checklist = guidelines.sections.find((section) => section.checklist)?.checklist ?? []
  const packedCount = checklist.filter((item) => checkedItems[item]).length

  function toggleItem(item) {
    setCheckedItems((current) => ({ ...current, [item]: !current[item] }))
  }

  return (
    <div className="guidelines-page">
      <header className="guidelines-heading">
        <div className="container">
          <p className="eyebrow eyebrow-dark">{guidelines.eyebrow}</p>
          <h1>{guidelines.title}</h1>
          <p>{guidelines.summary}</p>
        </div>
      </header>

      <section className="container guidelines-content" aria-label={guidelines.title}>
        {guidelines.sections.map((section, index) => (
          <details className="guideline-accordion" key={section.title} open={index === 0}>
            <summary>
              <span className="guideline-number">{String(index + 1).padStart(2, '0')}</span>
              <span>{section.title}</span>
              <span className="guideline-chevron" aria-hidden="true">+</span>
            </summary>

            {section.checklist ? (
              <div className="gear-checklist">
                <div className="gear-progress">
                  <span>{packedCount} / {checklist.length} {guidelines.checklistProgress}</span>
                  <progress value={packedCount} max={checklist.length} aria-label={`${packedCount} ${guidelines.checklistProgress}`} />
                </div>
                {section.checklist.map((item) => (
                  <label className={`gear-item ${checkedItems[item] ? 'gear-item--checked' : ''}`} key={item}>
                    <input type="checkbox" checked={Boolean(checkedItems[item])} onChange={() => toggleItem(item)} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="guideline-items">
                {section.items.map((item) => (
                  <article key={item.title}><h2>{item.title}</h2><p>{item.text}</p></article>
                ))}
              </div>
            )}
          </details>
        ))}
      </section>

      <div className="container guidelines-contact"><Link to="/contact">{guidelines.contactLabel} <span aria-hidden="true">→</span></Link></div>
    </div>
  )
}
