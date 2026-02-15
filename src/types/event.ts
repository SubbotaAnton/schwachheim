import type { Locale } from '@/i18n/routing'

export interface HistoricalEvent {
  id: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  date: string
  endDate?: string
  relatedPlaceIds: string[]
  relatedPersonIds: string[]
}
