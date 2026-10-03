import './ReviewsPage.css'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import data from '../data/alpineAscentsData.json'
import content from '../data/mountaineeringPages.json'

export default function ReviewsPage() {
  const story = content.successStories

  return (
    <div className="page-shell">
      <section className="page-hero page-hero--soft">
        <div className="container page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow">{story.eyebrow}</p>
            <h1>{story.title}</h1>
            <p>{story.summary}</p>
          </div>
        </div>
      </section>

      <Testimonials testimonials={data.testimonials} eyebrow={story.eyebrow} heading={story.testimonialHeading} />

      <section className="review-summary">
        <div className="container review-summary__grid">
          <div className="review-summary__card">
            <strong>{story.rating}</strong>
            <span>{story.ratingLabel}</span>
          </div>
          <div className="review-summary__card">
            <strong>{story.recommend}</strong>
            <span>{story.recommendLabel}</span>
          </div>
          <div className="review-summary__card">
            <strong>{story.visitors}</strong>
            <span>{story.visitorsLabel}</span>
          </div>
        </div>
      </section>

      <CallToAction content={{ eyebrow: data.hero.eyebrow, title: story.ctaTitle, label: story.ctaLabel, href: '/contact' }} />
    </div>
  )
}
