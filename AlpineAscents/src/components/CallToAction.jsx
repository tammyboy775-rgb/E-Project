import './CallToAction.css'

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-box" id="contact">
        <div>
          <p className="eyebrow eyebrow-light">Start planning</p>
          <h2>Ready to summit your next big idea?</h2>
        </div>

        <a href="mailto:hello@alpineascents.com" className="btn btn-primary btn-light">
          Plan My Journey
        </a>
      </div>
    </section>
  )
}
