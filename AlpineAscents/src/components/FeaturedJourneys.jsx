import './FeaturedJourneys.css'

export default function FeaturedJourneys({ featured }) {
  return (
    <section className="featured-section section-spacing" id="featured">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">Featured trips</p>
          <h2>Choose your next summit</h2>
        </div>

        <div className="journeys-grid">
          {featured.map((trip) => (
            <article key={trip.title} className="journey-card">
              <img src={trip.image} alt={trip.title} />
              <div className="journey-content">
                <div className="journey-meta">
                  <span>{trip.location}</span>
                  <span>{trip.duration}</span>
                </div>
                <h3>{trip.title}</h3>
                <div className="journey-detail-row">
                  <span>{trip.difficulty}</span>
                  <strong>{trip.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
