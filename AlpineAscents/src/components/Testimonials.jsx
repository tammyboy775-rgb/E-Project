import './Testimonials.css'
import data from '../data/alpineAscentsData.json'

export default function Testimonials({ testimonials = data.testimonials, eyebrow = 'Traveler stories', heading = 'Real memories, real climbs' }) {
  return (
    <section className="testimonials-section section-spacing" id="testimonials">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="testimonial-card">
              <p>“{testimonial.quote}”</p>
              <footer>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.trip}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
