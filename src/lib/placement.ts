import type { Memory } from '../types'

// Positions are stored as percentages (0-100) of the fridge canvas area,
// so they stay stable across different screen sizes.
const MIN_X = 10
const MAX_X = 90
const MIN_Y = 8
const MAX_Y = 92
const MIN_DISTANCE = 16

export function nextPosition(existing: Memory[]): { x: number; y: number } {
  let best = { x: 50, y: 50 }
  let bestScore = -Infinity

  const attempts = existing.length === 0 ? 1 : 24

  for (let i = 0; i < attempts; i++) {
    const candidate =
      existing.length === 0
        ? { x: 50, y: 34 }
        : {
            x: MIN_X + Math.random() * (MAX_X - MIN_X),
            y: MIN_Y + Math.random() * (MAX_Y - MIN_Y),
          }

    const closest = existing.reduce((min, m) => {
      const d = Math.hypot(m.position.x - candidate.x, m.position.y - candidate.y)
      return Math.min(min, d)
    }, Infinity)

    const score = closest
    if (score > bestScore) {
      bestScore = score
      best = candidate
    }
    if (bestScore > MIN_DISTANCE) break
  }

  return best
}
