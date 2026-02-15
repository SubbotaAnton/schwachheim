'use client'

import { useState } from 'react'
import { getPersonById, getChildrenOf, getSpousesOf } from '@/lib/data'
import type { Locale } from '@/i18n/routing'

interface FamilyTreeProps {
  rootPerson: string
  locale: Locale
}

interface PersonNodeProps {
  personId: string
  locale: Locale
  isSelected: boolean
  onSelect: (id: string | null) => void
}

function formatYears(birth?: string, death?: string): string {
  const b = birth?.split('-')[0] ?? '?'
  const d = death?.split('-')[0] ?? '?'
  return `${b}–${d}`
}

function PersonNode({ personId, locale, isSelected, onSelect }: PersonNodeProps) {
  const person = getPersonById(personId)
  if (!person) return null

  const years = formatYears(person.birthDate, person.deathDate)
  const occupation = person.occupation?.[locale]

  return (
    <button
      onClick={() => onSelect(isSelected ? null : personId)}
      className={`group relative rounded-lg border px-3 py-2 text-left transition-all ${
        isSelected
          ? 'border-accent bg-accent/10 shadow-md'
          : 'border-border bg-surface hover:border-accent/50 hover:shadow-sm'
      }`}
    >
      <p className="font-heading text-sm font-bold leading-tight text-foreground">
        {person.name[locale]}
      </p>
      <p className="font-ui text-xs text-muted">{years}</p>
      {occupation && (
        <p className="font-ui text-xs text-accent">{occupation}</p>
      )}

      {isSelected && (
        <div className="mt-2 border-t border-accent/20 pt-2">
          <p className="font-body text-xs leading-relaxed text-foreground">
            {person.bio[locale]}
          </p>
        </div>
      )}
    </button>
  )
}

export default function FamilyTree({ rootPerson, locale }: FamilyTreeProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const root = getPersonById(rootPerson)
  if (!root) return null

  const spouses = getSpousesOf(rootPerson)
  const children = getChildrenOf(rootPerson)

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-border bg-surface-alt p-6">
      {/* Parents row */}
      <div className="flex items-start justify-center gap-4">
        <PersonNode
          personId={rootPerson}
          locale={locale}
          isSelected={selected === rootPerson}
          onSelect={setSelected}
        />
        {spouses.map((spouse) => (
          <div key={spouse.id} className="flex items-start gap-4">
            <div className="flex h-12 items-center">
              <div className="h-px w-6 bg-accent" />
              <div className="h-2 w-2 rounded-full bg-accent" />
              <div className="h-px w-6 bg-accent" />
            </div>
            <PersonNode
              personId={spouse.id}
              locale={locale}
              isSelected={selected === spouse.id}
              onSelect={setSelected}
            />
          </div>
        ))}
      </div>

      {/* Connector line down */}
      {children.length > 0 && (
        <div className="flex justify-center py-2">
          <div className="h-6 w-px bg-accent" />
        </div>
      )}

      {/* Horizontal connector bar */}
      {children.length > 1 && (
        <div className="mx-auto flex justify-center">
          <div className="h-px bg-accent" style={{ width: `${Math.min(children.length * 120, 900)}px` }} />
        </div>
      )}

      {/* Children row */}
      {children.length > 0 && (
        <>
          {/* Vertical lines down to each child */}
          <div className="flex justify-center gap-2">
            {children.map((child) => (
              <div key={`line-${child.id}`} className="flex w-28 justify-center">
                <div className="h-4 w-px bg-accent" />
              </div>
            ))}
          </div>

          {/* Children nodes */}
          <div className="flex flex-wrap justify-center gap-2">
            {children.map((child) => (
              <div key={child.id} className="w-28 shrink-0">
                <PersonNode
                  personId={child.id}
                  locale={locale}
                  isSelected={selected === child.id}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
