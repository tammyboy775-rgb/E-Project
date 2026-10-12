import { useState } from 'react'
import stories from '../data/successStories.json'
import './FeaturePage.css'
import './ReviewsPage.css'

export default function ReviewsPage() {
  const [region, setRegion] = useState('All regions')
  const [activity, setActivity] = useState('All activities')
  const [expandedStoryId, setExpandedStoryId] = useState(null)
  const regions = [...new Set(stories.map((story) => story.region))].sort()
  const activities = [...new Set(stories.map((story) => story.activity))].sort()
  const filteredStories = stories.filter((story) =>
    (region === 'All regions' || story.region === region)
    && (activity === 'All activities' || story.activity === activity))

  return (
    <div className="stories-page">
      <section className="field-hero field-hero--stories">
        <div className="container field-hero__content">
          <p className="eyebrow">Stories from the trail</p>
          <h1>Stories from organized mountain trips</h1>
          <p>Explore source-linked reports from club-led climbs, glacier traverses, backcountry camps and hut-to-hut treks.</p>
        </div>
      </section>

      <section className="container story-content">
        <p className="story-source-note"><strong>About these stories:</strong> These summaries are based on published trip reports from The Mountaineers, an independent club. The photographs are illustrative stock images, not photographs from the reported trips.</p>
        <div className="story-filters" aria-label="Filter success stories">
          <label>
            <span>Region</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option>All regions</option>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Activity</span>
            <select value={activity} onChange={(event) => setActivity(event.target.value)}>
              <option>All activities</option>
              {activities.map((item) => <option key={item}>{item}</option>)}
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
                    <div className="story-card__meta"><span>{story.region}</span><span>{story.date}</span><span>{story.activity}</span></div>
                    <h2>{story.title}</h2>
                    <p className="story-card__camp">{story.camp} · {story.location}</p>
                    <p>{story.summary}</p>
                    <a className="story-source-link" href={story.source} target="_blank" rel="noreferrer">{story.sourceLabel} <span aria-hidden="true">↗</span></a>
                    <button
                      className="story-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`story-${story.id}`}
                      onClick={() => setExpandedStoryId(expanded ? null : story.id)}
                    >{expanded ? 'Read less' : 'Read more'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
                    <div className="story-expanded" id={`story-${story.id}`} hidden={!expanded}>
                      <h3>What this trip demonstrates</h3>
                      <p>{story.takeaway}</p>
                    </div>
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
