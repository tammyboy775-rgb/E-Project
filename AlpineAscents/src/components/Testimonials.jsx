import './Testimonials.css'
import data from '../data/alpineAscentsData.json'

export default function Testimonials({ testimonials = data.testimonials }) {
  return (
    <section className="testimonials-section section-spacing" id="testimonials">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">Traveler stories</p>
          <h2>Real memories, real climbs</h2>
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
