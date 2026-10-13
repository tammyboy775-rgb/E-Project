import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero({ eyebrow, title, description, primaryCta, secondaryCta, highlights, snapshot, images = [] }) {
  const [activeImage, setActiveImage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying || images.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [images.length, isPlaying])

  const changeImage = (index) => {
    setActiveImage((index + images.length) % images.length)
  }

  return (
    <section className="hero-section" id="home">
      {images.length > 0 && (
        <img
          className="hero-carousel__image"
          src={images[activeImage].src}
          alt=""
          aria-hidden="true"
        />
      )}
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              {primaryCta}
            </a>
            <a href="#featured" className="btn btn-secondary">
              {secondaryCta}
            </a>
          </div>

          <ul className="hero-highlights" aria-label="What we offer">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <aside className="hero-card" aria-label={snapshot.title}>
          <div className="card-badge">{snapshot.badge}</div>
          <h2>{snapshot.title}</h2>
          <p>{snapshot.description}</p>
          <div className="card-meta">
            {snapshot.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </aside>
      </div>

      {images.length > 1 && (
        <div className="hero-carousel" role="group" aria-label="Hero image carousel controls">
          <button
            className="hero-carousel__arrow"
            type="button"
            onClick={() => changeImage(activeImage - 1)}
            aria-label="Show previous image"
          >
            ‹
          </button>
          <div className="hero-carousel__indicators" role="group" aria-label="Choose an image">
            {images.map((image, index) => (
              <button
                className={`hero-carousel__indicator${index === activeImage ? ' is-active' : ''}`}
                type="button"
                key={image.id}
                onClick={() => changeImage(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeImage ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            className="hero-carousel__arrow"
            type="button"
            onClick={() => changeImage(activeImage + 1)}
            aria-label="Show next image"
          >
            ›
          </button>
          <button
            className="hero-carousel__play"
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-label={isPlaying ? 'Pause image carousel' : 'Play image carousel'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </section>
  )
}
