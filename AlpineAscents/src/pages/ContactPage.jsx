import './ContactPage.css'
import data from '../data/alpineAscentsData.json'

export default function ContactPage() {
  return (
    <div className="page-shell">
      <section className="page-hero page-hero--contact">
        <div className="container page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow">Plan your next escape</p>
            <h1>Let’s create a mountain experience that feels personal from the start.</h1>
            <p>
              Talk with our team about your ideal route, travel style, group size, and the kind of moments you want
              to remember most.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-page">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Visit us</p>
            <h3>Meet the Alpine Ascents team</h3>
            <ul>
              <li>{data.footer.address}</li>
              <li>{data.footer.email}</li>
              <li>{data.header.phone}</li>
            </ul>
          </div>

          <div className="contact-card contact-card--highlight">
            <p className="eyebrow">Start your inquiry</p>
            <h3>Tell us what you’re looking for.</h3>
            <form className="contact-form">
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Email address" />
              <textarea rows="4" placeholder="Tell us about your trip idea" />
              <button type="button" className="btn btn-primary">
                Send request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
