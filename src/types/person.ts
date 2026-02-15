import type { Locale } from '@/i18n/routing'

export type Gender = 'male' | 'female'

export interface Person {
  id: string
  name: Record<Locale, string>
  birthDate?: string
  deathDate?: string
  birthPlace?: string // place id
  deathPlace?: string // place id
  occupation?: Record<Locale, string>
  bio: Record<Locale, string>
  parentIds: string[]
  spouseIds: string[]
  gender: Gender
}
