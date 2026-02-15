import type { Locale } from '@/i18n/routing'

export type PlaceType =
  | 'city'
  | 'village'
  | 'church'
  | 'castle'
  | 'mill'
  | 'monastery'
  | 'university'
  | 'battlefield'
  | 'region'

export interface Coordinates {
  lat: number
  lng: number
}

export interface Place {
  id: string
  name: Record<Locale, string>
  germanName: string
  description: Record<Locale, string>
  coordinates: Coordinates
  type: PlaceType
}
