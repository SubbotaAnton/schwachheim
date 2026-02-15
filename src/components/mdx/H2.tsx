import { getTextContent, slugify } from '@/lib/utils'

interface H2Props {
  children: React.ReactNode
  id?: string
}

export default function H2({ children, id }: H2Props) {
  const headingId = id || slugify(getTextContent(children))

  return (
    <h2
      id={headingId}
      className="font-heading text-3xl font-bold text-foreground mt-16 mb-6 pb-3 border-b border-border"
    >
      {children}
    </h2>
  )
}
