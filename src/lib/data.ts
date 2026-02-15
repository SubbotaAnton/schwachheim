import { people } from '@/data/people'
import { places } from '@/data/places'
import { events } from '@/data/events'
import { glossary } from '@/data/glossary'
import type { Person } from '@/types/person'
import type { Place } from '@/types/place'
import type { HistoricalEvent } from '@/types/event'
import type { GlossaryEntry } from '@/types/glossary'

function includes(arr: readonly string[], value: string): boolean {
  return arr.includes(value)
}

export function getPersonById(id: string): Person | undefined {
  return people.find((p) => p.id === id) as Person | undefined
}

export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id) as Place | undefined
}

export function getEventById(id: string): HistoricalEvent | undefined {
  return events.find((e) => e.id === id) as HistoricalEvent | undefined
}

export function getGlossaryTerm(id: string): GlossaryEntry | undefined {
  return glossary.find((g) => g.id === id) as GlossaryEntry | undefined
}

export function getChildrenOf(personId: string): Person[] {
  return people.filter((p) => includes(p.parentIds, personId)) as unknown as Person[]
}

export function getSpousesOf(personId: string): Person[] {
  const person = getPersonById(personId)
  if (!person) return []
  return person.spouseIds
    .map((id) => getPersonById(id))
    .filter((p): p is Person => p !== undefined)
}

export function getEventsByPersonId(personId: string): HistoricalEvent[] {
  return events.filter((e) => includes(e.relatedPersonIds, personId)) as unknown as HistoricalEvent[]
}

export function getEventsByPlaceId(placeId: string): HistoricalEvent[] {
  return events.filter((e) => includes(e.relatedPlaceIds, placeId)) as unknown as HistoricalEvent[]
}

export function getPlacesByType(type: string): Place[] {
  return places.filter((p) => p.type === type) as unknown as Place[]
}

export function getGlossaryByCategory(category: string): GlossaryEntry[] {
  return glossary.filter((g) => g.category === category) as unknown as GlossaryEntry[]
}
