import type { Locale } from '@/i18n/routing'

export type GlossaryCategory =
  | 'church-records'
  | 'mills'
  | 'social-status'
  | 'administration'
  | 'architecture'
  | 'military'
  | 'geography'
  | 'education'

export interface GlossaryEntry {
  id: string
  term: Record<Locale, string>
  definition: Record<Locale, string>
  category: GlossaryCategory
}
