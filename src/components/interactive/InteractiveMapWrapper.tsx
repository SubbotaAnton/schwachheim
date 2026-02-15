'use client'

import dynamic from 'next/dynamic'
import type { Locale } from '@/i18n/routing'

const InteractiveMap = dynamic(
  () => import('@/components/interactive/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 flex h-[400px] items-center justify-center rounded-lg border border-border bg-surface-alt">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="font-ui text-sm text-muted">Loading map...</p>
        </div>
      </div>
    ),
  }
)

interface InteractiveMapWrapperProps {
  places: string[]
  locale: Locale
  height?: string
}

export default function InteractiveMapWrapper(props: InteractiveMapWrapperProps) {
  return <InteractiveMap {...props} />
}
