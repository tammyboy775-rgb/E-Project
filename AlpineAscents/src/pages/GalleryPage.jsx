import { useEffect, useMemo, useState } from 'react'
import gallery from '../data/gallery.json'
import './FeaturePage.css'
import './GalleryPage.css'

export default function GalleryPage() {
  const [category, setCategory] = useState('All')
  const [activePhotoId, setActivePhotoId] = useState(null)
  const photos = useMemo(() => gallery.filter((item) => item.type === 'photo'), [])
  const activePhotoIndex = photos.findIndex((photo) => photo.id === activePhotoId)
  const activePhoto = activePhotoIndex >= 0 ? photos[activePhotoIndex] : null
  const visibleItems = gallery.filter((item) => category === 'All' || (category === 'Photos' ? item.type === 'photo' : item.type === 'video'))

  useEffect(() => {
    if (!activePhoto) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setActivePhotoId(null)
      if (event.key === 'ArrowRight') setActivePhotoId(photos[(activePhotoIndex + 1) % photos.length].id)
      if (event.key === 'ArrowLeft') setActivePhotoId(photos[(activePhotoIndex - 1 + photos.length) % photos.length].id)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhoto, activePhotoIndex, photos])

  function movePhoto(direction) {
    const nextIndex = (activePhotoIndex + direction + photos.length) % photos.length
    setActivePhotoId(photos[nextIndex].id)
  }

  return (
    <div className="gallery-page">
      <section className="field-hero field-hero--gallery">
        <div className="container field-hero__content">
          <p className="eyebrow">Moments from the mountains</p>
          <h1>Mountain gallery</h1>
          <p>Photographs and films that celebrate mountain landscapes, people and the practice of getting outside.</p>
        </div>
      </section>
      <section className="container gallery-content">
        <div className="gallery-toolbar">
          <div><p className="eyebrow eyebrow-dark">Explore the collection</p><h2>Scenes from high places</h2></div>
          <div className="gallery-tabs" role="group" aria-label="Filter gallery by type">
            {['All', 'Photos', 'Videos'].map((tab) => (
              <button type="button" key={tab} className={category === tab ? 'gallery-tab gallery-tab--active' : 'gallery-tab'} aria-pressed={category === tab} onClick={() => setCategory(tab)}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {visibleItems.map((item) => item.type === 'photo' ? (
            <button className="gallery-photo" type="button" key={item.id} onClick={() => setActivePhotoId(item.id)} aria-label={`Open photo: ${item.title}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="gallery-caption"><strong>{item.title}</strong><span>{item.caption}</span></span>
            </button>
          ) : (
            <article className="gallery-video" key={item.id}>
              <div className="gallery-video__frame">
                <iframe src={item.src} title={item.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
              <div className="gallery-video__caption"><h3>{item.title}</h3><p>{item.caption}</p><a href={item.source} target="_blank" rel="noreferrer">View on YouTube</a></div>
            </article>
          ))}
        </div>
      </section>
      {activePhoto && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Photo: ${activePhoto.title}`} onClick={(event) => { if (event.target === event.currentTarget) setActivePhotoId(null) }}>
          <button className="lightbox-close" type="button" onClick={() => setActivePhotoId(null)} aria-label="Close photo">×</button>
          <button className="lightbox-arrow lightbox-arrow--prev" type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">‹</button>
          <figure>
            <img src={activePhoto.src.replace('w=1800', 'w=2400')} alt={activePhoto.alt} />
            <figcaption><strong>{activePhoto.title}</strong><span>{activePhoto.caption}</span></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-arrow--next" type="button" onClick={() => movePhoto(1)} aria-label="Next photo">›</button>
        </div>
      )}
    </div>
  )
}
