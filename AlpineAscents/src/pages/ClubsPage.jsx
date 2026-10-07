import { useMemo, useState } from 'react'
import ClubsMap from '../components/ClubsMap'
import clubs from '../data/clubs.json'
import './FeaturePage.css'
import './ClubsPage.css'

const regions = [...new Set(clubs.map((club) => club.region))].sort()

export default function ClubsPage() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All regions')
  const [selectedClubId, setSelectedClubId] = useState(null)
  const [visitorPosition, setVisitorPosition] = useState(null)
  const [locationMessage, setLocationMessage] = useState('')

  const filteredClubs = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return clubs.filter((club) => {
      const matchesSearch = !query || club.name.toLocaleLowerCase().includes(query) || club.country.toLocaleLowerCase().includes(query)
      return matchesSearch && (region === 'All regions' || club.region === region)
    })
  }, [search, region])

  function showMyLocation() {
    if (!navigator.geolocation) {
      setLocationMessage('Location is not available in this browser.')
      return
    }

    setLocationMessage('Requesting your location…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setVisitorPosition([coords.latitude, coords.longitude])
        setLocationMessage('Your location is shown on the map.')
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. You can still browse the club map.'
          : error.code === error.TIMEOUT
            ? 'The location request timed out. Please try again.'
            : 'Your location could not be determined. Please try again.'
        setLocationMessage(message)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    )
  }

  function updateRegion(event) {
    setRegion(event.target.value)
    setSelectedClubId(null)
  }

  function updateSearch(event) {
    setSearch(event.target.value)
    setSelectedClubId(null)
  }

  return (
    <div className="clubs-page">
      <section className="field-hero field-hero--clubs">
        <div className="container field-hero__content">
          <p className="eyebrow">Find your mountain community</p>
          <h1>Clubs around the world</h1>
          <p>Explore mountaineering organizations, their home bases and the ranges their communities know.</p>
        </div>
      </section>

      <section className="container clubs-explorer" aria-label="Explore mountaineering clubs">
        <div className="clubs-map-panel">
          <div className="clubs-map-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Explore the directory</p>
              <h2>Find a club near your next range</h2>
            </div>
            <button className="field-button" type="button" onClick={showMyLocation}>Show my location</button>
          </div>
          {locationMessage && <p className="location-message" role="status">{locationMessage}</p>}
          <ClubsMap
            clubs={filteredClubs}
            selectedClubId={selectedClubId}
            onSelectClub={setSelectedClubId}
            visitorPosition={visitorPosition}
          />
          <p className="map-credit">Map data &copy; OpenStreetMap contributors</p>
        </div>

        <div className="clubs-directory">
          <div className="directory-controls">
            <label>
              <span>Search by club or country</span>
              <input value={search} onChange={updateSearch} type="search" placeholder="e.g. Alpine Club, Japan" />
            </label>
            <label>
              <span>Continent / region</span>
              <select value={region} onChange={updateRegion}>
                <option>All regions</option>
                {regions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <p className="directory-count" aria-live="polite">{filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'} shown</p>
          {filteredClubs.length ? (
            <div className="club-card-grid">
              {filteredClubs.map((club) => (
                <button
                  className={`club-card${selectedClubId === club.id ? ' club-card--selected' : ''}`}
                  type="button"
                  key={club.id}
                  onClick={() => setSelectedClubId(club.id)}
                  aria-pressed={selectedClubId === club.id}
                >
                  <img src={club.image} alt="" loading="lazy" />
                  <span className="club-card__content">
                    <span className="club-card__region">{club.region} · {club.country}</span>
                    <strong>{club.name}</strong>
                    <span>{club.description}</span>
                    <span className="club-card__destinations"><b>Destinations:</b> {club.destinations.join(', ')}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-state">No clubs match your search</p>
          )}
        </div>
      </section>
    </div>
  )
}
