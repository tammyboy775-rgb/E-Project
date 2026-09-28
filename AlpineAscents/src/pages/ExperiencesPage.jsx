import './ExperiencesPage.css'
import Experiences from '../components/Experiences'
import WhyChooseUs from '../components/WhyChooseUs'
import CallToAction from '../components/CallToAction'
import data from '../data/alpineAscentsData.json'

export default function ExperiencesPage() {
  return (
    <div className="page-shell">
      <section className="page-hero page-hero--alt">
        <div className="container page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow">Immersive experiences</p>
            <h1>Every trip is shaped by the feeling you want to carry home.</h1>
            <p>
              Whether you crave adrenaline, quiet reflection, or a beautifully paced cultural adventure, we design
              every journey to match your rhythm and your interests.
            </p>
          </div>
        </div>
      </section>

      <Experiences experiences={data.experiences} />

      <section className="experience-points">
        <div className="container section-grid">
          <div className="info-panel">
            <p className="eyebrow">Why people choose us</p>
            <h2>Our experiences feel elevated without ever feeling rigid.</h2>
          </div>

          <div className="feature-list feature-list--compact">
            <div className="feature-item">
              <span>01</span>
              <div>
                <h3>Flexible pacing</h3>
                <p>Choose active days, slow mornings, and time to enjoy each destination at your own rhythm.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>02</span>
              <div>
                <h3>Local perspective</h3>
                <p>We work with local hosts who bring stories, flavor, and trusted expertise to every route.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>03</span>
              <div>
                <h3>Curated comfort</h3>
                <p>Thoughtful stays, seamless transfers, and detail-rich planning support a smoother adventure.</p>
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
