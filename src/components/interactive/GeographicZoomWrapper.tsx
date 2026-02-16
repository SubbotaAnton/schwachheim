'use client'

import dynamic from 'next/dynamic'
import type { Locale } from '@/i18n/routing'

const GeographicZoom = dynamic(
  () => import('@/components/interactive/GeographicZoom'),
  {
    ssr: false,
    loading: () => (
      <div className="my-10 overflow-hidden rounded-lg border border-border shadow-md">
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-alt">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="font-ui text-sm text-muted">Loading map...</p>
          </div>
        </div>
      </div>
    ),
  }
)

interface GeographicZoomWrapperProps {
  locale: Locale
}

export default function GeographicZoomWrapper({ locale }: GeographicZoomWrapperProps) {
  return <GeographicZoom locale={locale} />
}
