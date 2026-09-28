import './Experiences.css'

export default function Experiences({ experiences }) {
  return (
    <section className="experiences-section section-spacing" id="experiences">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">Signature experiences</p>
          <h2>Built for ambitious explorers</h2>
        </div>

        <div className="experiences-grid">
          {experiences.map((experience) => (
            <article key={experience.title} className="experience-card">
              <span className="experience-badge">{experience.badge}</span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
