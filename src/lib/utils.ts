import type { ReactNode } from 'react'

/**
 * Extract plain text from React children (strings, numbers, nested elements).
 */
export function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

/**
 * Convert text to a URL-friendly slug (supports Cyrillic).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}
