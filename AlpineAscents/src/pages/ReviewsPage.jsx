import './ReviewsPage.css'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

export default function ReviewsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero page-hero--soft">
        <div className="container page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow">Traveler stories</p>
            <h1>Words from guests who came for the mountains and stayed for the feeling.</h1>
            <p>
              Real experiences, thoughtful guidance, and unforgettable moments are what travelers remember most.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="review-summary">
        <div className="container review-summary__grid">
          <div className="review-summary__card">
            <strong>4.9/5</strong>
            <span>average guest rating</span>
          </div>
          <div className="review-summary__card">
            <strong>92%</strong>
            <span>return or recommend</span>
          </div>
          <div className="review-summary__card">
            <strong>1,200+</strong>
            <span>happy adventurers</span>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  )
}
