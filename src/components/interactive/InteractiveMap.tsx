'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getPlaceById } from '@/lib/data'
import type { Locale } from '@/i18n/routing'
import 'leaflet/dist/leaflet.css'

interface InteractiveMapProps {
  places: string[]
  locale: Locale
  height?: string
}

const goldIcon = new L.DivIcon({
  html: `<svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#C4A35A"/>
    <circle cx="12" cy="12" r="5" fill="#FAF7F2"/>
  </svg>`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: '',
})

function FitBounds({ placeIds }: { placeIds: string[] }) {
  const map = useMap()

  useEffect(() => {
    const coords = placeIds
      .map((id) => getPlaceById(id))
      .filter((p) => p !== undefined)
      .map((p) => [p.coordinates.lat, p.coordinates.lng] as [number, number])

    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords)
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 })
    }
  }, [map, placeIds])

  return null
}

function ThemeAwareTiles() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    }
    check()

    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  if (isDark) {
    return (
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
    )
  }

  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )
}

export default function InteractiveMap({
  places: placeIds = [],
  locale,
  height = '400px',
}: InteractiveMapProps) {
  const resolvedPlaces = placeIds
    .map((id) => getPlaceById(id))
    .filter((p) => p !== undefined)

  if (resolvedPlaces.length === 0) return null

  const center: [number, number] = [
    resolvedPlaces[0].coordinates.lat,
    resolvedPlaces[0].coordinates.lng,
  ]

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-border shadow-md" style={{ height }}>
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ThemeAwareTiles />
        <FitBounds placeIds={placeIds} />
        {resolvedPlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={goldIcon}
          >
            <Popup>
              <div className="max-w-52">
                <strong className="font-heading text-sm">{place.name[locale]}</strong>
                <p className="mt-1 font-body text-xs leading-relaxed">
                  {place.description[locale]}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
