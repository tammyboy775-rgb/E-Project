import './WhyChooseUs.css'

export default function WhyChooseUs({ benefits }) {
  return (
    <section className="benefits-section section-spacing">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">Why Alpine Ascents</p>
          <h2>Adventure, thoughtfully delivered</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((item) => (
            <div key={item.title} className="benefit-card">
              <div className="benefit-icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
