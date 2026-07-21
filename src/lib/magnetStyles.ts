import type { MagnetColorKey, MagnetStyleKey } from '../types'

export const MAGNET_STYLES: {
  key: MagnetStyleKey
  icon: string
  label: string
}[] = [
  { key: 'city', icon: '📍', label: 'City' },
  { key: 'plane', icon: '✈️', label: 'Trip' },
  { key: 'coffee', icon: '☕', label: 'Coffee' },
  { key: 'flower', icon: '🌸', label: 'Flower' },
  { key: 'mountain', icon: '🏔️', label: 'Mountain' },
  { key: 'wave', icon: '🌊', label: 'Wave' },
  { key: 'concert', icon: '🎵', label: 'Concert' },
  { key: 'birthday', icon: '🎂', label: 'Birthday' },
  { key: 'heart', icon: '❤️', label: 'Heart' },
  { key: 'custom', icon: '⭐', label: 'Custom' },
]

export const MAGNET_COLORS: MagnetColorKey[] = [
  'sage',
  'blush',
  'butter',
  'sky',
  'terracotta',
  'lavender',
]

export function iconForStyle(style: MagnetStyleKey, customIcon?: string | null) {
  if (style === 'custom' && customIcon) return customIcon
  return MAGNET_STYLES.find((s) => s.key === style)?.icon ?? '⭐'
}

export function colorClasses(color: MagnetColorKey) {
  const map: Record<MagnetColorKey, { bg: string; deep: string; text: string }> = {
    sage: { bg: 'bg-sage', deep: 'bg-sage-deep', text: 'text-char' },
    blush: { bg: 'bg-blush', deep: 'bg-blush-deep', text: 'text-char' },
    butter: { bg: 'bg-butter', deep: 'bg-butter-deep', text: 'text-char' },
    sky: { bg: 'bg-sky', deep: 'bg-sky-deep', text: 'text-char' },
    terracotta: { bg: 'bg-terracotta', deep: 'bg-terracotta-deep', text: 'text-char' },
    lavender: { bg: 'bg-lavender', deep: 'bg-lavender-deep', text: 'text-char' },
  }
  return map[color]
}

export function randomColor(): MagnetColorKey {
  return MAGNET_COLORS[Math.floor(Math.random() * MAGNET_COLORS.length)]
}

export function randomRotation() {
  const deg = 2 + Math.random() * 3
  return Math.random() > 0.5 ? deg : -deg
}
