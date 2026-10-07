import { useState } from 'react'
import stories from '../data/successStories.json'
import './FeaturePage.css'
import './ReviewsPage.css'

export default function ReviewsPage() {
  const [region, setRegion] = useState('All regions')
  const [difficulty, setDifficulty] = useState('All levels')
  const [expandedStoryId, setExpandedStoryId] = useState(null)
  const regions = [...new Set(stories.map((story) => story.region))].sort()
  const difficulties = [...new Set(stories.map((story) => story.difficulty))].sort()
  const filteredStories = stories.filter((story) =>
    (region === 'All regions' || story.region === region)
    && (difficulty === 'All levels' || story.difficulty === difficulty))

  return (
    <div className="stories-page">
      <section className="field-hero field-hero--stories">
        <div className="container field-hero__content">
          <p className="eyebrow">Stories from the trail</p>
          <h1>Small teams. Big mountain days.</h1>
          <p>Read illustrative camp stories about learning, teamwork and the decisions that make a mountain experience meaningful.</p>
        </div>
      </section>

      <section className="container story-content">
        <p className="illustrative-note"><strong>About these stories:</strong> All participants and camp accounts on this page are fictional illustrations, not testimonials or records of actual Alpine Ascents trips.</p>
        <div className="story-filters" aria-label="Filter success stories">
          <label>
            <span>Region</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option>All regions</option>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Difficulty</span>
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option>All levels</option>
              {difficulties.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        {filteredStories.length ? (
          <div className="story-grid">
            {filteredStories.map((story) => {
              const expanded = expandedStoryId === story.id
              return (
                <article className="story-card" key={story.id}>
                  <img src={story.image} alt={story.imageAlt} loading="lazy" />
                  <div className="story-card__body">
                    <div className="story-card__meta"><span>{story.region}</span><span>{story.year}</span><span>{story.difficulty}</span></div>
                    <h2>{story.title}</h2>
                    <p className="story-card__camp">{story.camp} · {story.location}</p>
                    <p>{story.summary}</p>
                    <button
                      className="story-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`story-${story.id}`}
                      onClick={() => setExpandedStoryId(expanded ? null : story.id)}
                    >{expanded ? 'Read less' : 'Read more'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
                    {expanded && (
                      <div className="story-expanded" id={`story-${story.id}`}>
                        <h3>What the team took away</h3>
                        <p>{story.summary} {story.participant} reflects a fictional participant created to illustrate the camp experience.</p>
                        <p><strong>Participant:</strong> {story.participant}</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        ) : <p className="empty-state">No stories match these filters.</p>}
      </section>

    </div>
  )
}
