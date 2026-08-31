// Shared color tokens for HTTP methods and schema accents.
// Color is used deliberately in this UI: it's the only place color appears,
// and it always encodes meaning (which method, which schema) rather than decoration.

export type MethodStyle = {
  text: string
  bg: string
  border: string
}

const METHOD_STYLES: Record<string, MethodStyle> = {
  GET: { text: '#0F766E', bg: '#ECFDF9', border: '#99E9DD' },
  POST: { text: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE' },
  PUT: { text: '#B45309', bg: '#FFFBEB', border: '#FCE7A6' },
  PATCH: { text: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  DELETE: { text: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
}

const DEFAULT_STYLE: MethodStyle = { text: '#475569', bg: '#F1F5F9', border: '#E2E8F0' }

export function getMethodStyle(method?: string): MethodStyle {
  if (!method) return DEFAULT_STYLE
  return METHOD_STYLES[method.toUpperCase()] ?? DEFAULT_STYLE
}

// A small palette that shares its family with the method colors above, so the
// schema sidebar feels like part of the same system rather than a separate one.
const ACCENT_PALETTE = ['#0F766E', '#4338CA', '#B45309', '#7C3AED', '#B91C1C', '#0E7490']

export function getAccentForName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return ACCENT_PALETTE[Math.abs(hash) % ACCENT_PALETTE.length]
}