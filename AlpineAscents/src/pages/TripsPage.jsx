import './TripsPage.css'
import FeaturedJourneys from '../components/FeaturedJourneys'
import WhyChooseUs from '../components/WhyChooseUs'
import CallToAction from '../components/CallToAction'
import data from '../data/alpineAscentsData.json'

export default function TripsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow">Curated mountain escapes</p>
            <h1>Trips designed for big views and unforgettable memories.</h1>
            <p>
              From glacier walks to sunrise ridgelines, every Alpine Ascents itinerary is built to slow you
              down, elevate the moment, and connect you to the landscape in a deeper way.
            </p>
          </div>
        </div>
      </section>

      <FeaturedJourneys featured={data.featured} />

      <section className="journey-highlights">
        <div className="container section-grid">
          <div className="info-panel">
            <p className="eyebrow">What’s included</p>
            <h2>Everything we plan is built around ease and experience.</h2>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <span>01</span>
              <div>
                <h3>Guided route planning</h3>
                <p>Expert-designed route leaders and local insight for every terrain level.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>02</span>
              <div>
                <h3>Comfort-first logistics</h3>
                <p>Transfers, stays, and pacing scheduled to help you stay relaxed and present.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>03</span>
              <div>
                <h3>Memorable moments</h3>
                <p>Sunset cookouts, summit pauses, and stories that make the landscape feel personal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs benefits={data.benefits} />
      <CallToAction />
    </div>
  )
}
