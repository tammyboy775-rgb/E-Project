import './Stats.css'

export default function Stats({ stats }) {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
