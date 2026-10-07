import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './ClubsMap.css'

function clubIcon(selected) {
  return L.divIcon({
    className: `club-map-marker${selected ? ' club-map-marker--selected' : ''}`,
    html: '<span></span>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function createPopup(club) {
  const content = document.createElement('div')
  const name = document.createElement('strong')
  const country = document.createElement('span')
  const description = document.createElement('p')
  const link = document.createElement('a')

  name.textContent = club.name
  country.textContent = club.country
  description.textContent = club.description
  link.href = club.website
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.textContent = 'Visit website'
  content.className = 'club-map-popup'
  content.append(name, country, description, link)

  return content
}

export default function ClubsMap({
  clubs,
  selectedClubId,
  onSelectClub,
  visitorPosition,
}) {
  const mapElementRef = useRef(null)
  const mapRef = useRef(null)
  const markerLayerRef = useRef(null)
  const markersRef = useRef(new Map())
  const visitorMarkerRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapElementRef.current, { scrollWheelZoom: true }).setView([20, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map
    markerLayerRef.current = L.layerGroup().addTo(map)
    const markers = markersRef.current
    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 0)

    return () => {
      window.clearTimeout(resizeTimer)
      markers.clear()
      map.remove()
      mapRef.current = null
      markerLayerRef.current = null
      visitorMarkerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const markerLayer = markerLayerRef.current
    if (!map || !markerLayer) return

    markerLayer.clearLayers()
    markersRef.current.clear()
    clubs.forEach((club) => {
      const marker = L.marker([club.lat, club.lng], {
        icon: clubIcon(false),
        title: `${club.name}, ${club.country}`,
        alt: `${club.name} location`,
      })
        .bindPopup(createPopup(club))
        .on('click', () => onSelectClub(club.id))

      marker.addTo(markerLayer)
      markersRef.current.set(club.id, marker)
    })

    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 0)

    return () => window.clearTimeout(resizeTimer)
  }, [clubs, onSelectClub])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((marker, id) => {
      const club = clubs.find((item) => item.id === id)
      if (club) marker.setIcon(clubIcon(id === selectedClubId))
    })

    if (visitorMarkerRef.current) {
      visitorMarkerRef.current.remove()
      visitorMarkerRef.current = null
    }
    if (visitorPosition) {
      visitorMarkerRef.current = L.circleMarker(visitorPosition, {
        radius: 9,
        color: '#fff',
        weight: 3,
        fillColor: '#c26b42',
        fillOpacity: 1,
      }).bindPopup('Your location').addTo(map)
    }

    const selectedClub = clubs.find((club) => club.id === selectedClubId)
    if (selectedClub) {
      map.flyTo([selectedClub.lat, selectedClub.lng], Math.max(map.getZoom(), 5), { duration: 0.5 })
    } else if (visitorPosition) {
      map.flyTo(visitorPosition, 8, { duration: 0.5 })
    } else if (clubs.length > 1) {
      map.fitBounds(clubs.map(({ lat, lng }) => [lat, lng]), { padding: [32, 32], maxZoom: 4 })
    } else if (clubs.length === 1) {
      map.setView([clubs[0].lat, clubs[0].lng], 5)
    }
  }, [clubs, selectedClubId, visitorPosition])

  return <div className="clubs-map" ref={mapElementRef} role="application" aria-label="Interactive map of mountaineering clubs" />
}
