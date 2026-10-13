import { useCallback, useEffect, useState } from 'react'
import './Hero.css'

export default function Hero({ eyebrow, title, description, primaryCta, secondaryCta, highlights, snapshot, images = [] }) {
  const [activeImage, setActiveImage] = useState(0)
  const [previousImage, setPreviousImage] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const changeImage = useCallback((index) => {
    const nextImage = (index + images.length) % images.length
    if (nextImage === activeImage) return

    setPreviousImage(activeImage)
    setActiveImage(nextImage)
  }, [activeImage, images.length])

  useEffect(() => {
    if (!isPlaying || images.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      changeImage(activeImage + 1)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [activeImage, changeImage, images.length, isPlaying])

  useEffect(() => {
    if (previousImage === null) return undefined

    const timeoutId = window.setTimeout(() => setPreviousImage(null), 900)
    return () => window.clearTimeout(timeoutId)
  }, [activeImage, previousImage])

  return (
    <section className="hero-section" id="home">
      {images.length > 0 && (
        <>
          {previousImage !== null && (
            <img
              className="hero-carousel__image hero-carousel__image--outgoing"
              src={images[previousImage].src}
              alt=""
              aria-hidden="true"
            />
          )}
          <img
            className="hero-carousel__image hero-carousel__image--incoming"
            key={images[activeImage].id}
            src={images[activeImage].src}
            alt=""
            aria-hidden="true"
          />
        </>
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
