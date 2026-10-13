import './HomePage.css'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import { Link } from 'react-router-dom'
import data from '../data/alpineAscentsData.json'
import content from '../data/mountaineeringPages.json'
import gallery from '../data/gallery.json'

export default function HomePage() {
  const home = content.home
  const heroImages = gallery.filter((item) => item.type === 'photo').slice(0, 10)

  return (
    <>
      <Hero {...data.hero} images={heroImages} />
      <Stats stats={data.stats} />
      <section className="mountaineering-intro" aria-labelledby="mountaineering-title" data-reveal>
        <div className="container mountaineering-intro__grid">
          <div className="mountaineering-intro__copy">
            <p className="eyebrow eyebrow-dark">{home.eyebrow}</p>
            <h2 id="mountaineering-title">{home.introTitle}</h2>
            <p>{home.intro}</p>
          </div>
          <img src={home.sections[0].image} alt={home.sections[0].alt} loading="lazy" />
          <div className="mountaineering-mission">
            <span aria-hidden="true">01 / 02</span>
            <h3>{home.missionTitle}</h3>
            <p>{home.mission}</p>
          </div>
        </div>
      </section>

      <section className="mountaineering-directory" id="featured" aria-labelledby="directory-title" data-reveal>
        <div className="container">
          <div className="directory-heading" data-reveal>
            <p className="eyebrow eyebrow-dark">Alpine field guide</p>
            <h2 id="directory-title">{home.cardsTitle}</h2>
          </div>
          <div className="directory-grid">
            {home.sections.map((section, index) => (
              <Link
                className="directory-card"
                to={section.href}
                key={section.href}
                data-reveal
                style={{ '--reveal-delay': `${Math.min(index * 55, 330)}ms` }}
              >
                <div className="directory-card__image"><img src={section.image} alt={section.alt} loading="lazy" /></div>
                <div className="directory-card__body">
                  <span className="directory-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{section.title}</h3>
                  <p>{section.summary}</p>
                  <span className="directory-card__arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={data.testimonials} eyebrow={home.storiesEyebrow} heading={home.storiesTitle} />
      <CallToAction content={{ eyebrow: home.ctaEyebrow, title: home.ctaTitle, label: home.ctaLabel, href: home.ctaHref }} />
    </>
  )
}
