import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://schwachheim.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Schwachheim — Family History',
    template: '%s | Schwachheim',
  },
  description: 'Interactive family history of the Schwachheim surname since 1569',
  openGraph: {
    type: 'website',
    siteName: 'Schwachheim',
    locale: 'en',
    alternateLocale: ['de', 'ru'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Root layout is a passthrough — <html> and <body> are in [locale]/layout.tsx
// so that each locale can set the correct `lang` attribute.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
