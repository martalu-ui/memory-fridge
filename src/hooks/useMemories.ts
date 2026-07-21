import { useCallback, useEffect, useState } from 'react'
import type { Memory, NewMemoryInput } from '../types'
import { makeId } from '../lib/id'
import { nextPosition } from '../lib/placement'
import { randomColor, randomRotation } from '../lib/magnetStyles'

const STORAGE_KEY = 'memory-fridge:memories'

function load(): Memory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>(() => load())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories))
  }, [memories])

  const addMemory = useCallback((input: NewMemoryInput) => {
    setMemories((prev) => {
      const memory: Memory = {
        ...input,
        id: makeId(),
        position: nextPosition(prev),
        rotation: randomRotation(),
        colorKey: randomColor(),
        createdAt: Date.now(),
      }
      return [...prev, memory]
    })
  }, [])

  const updatePosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setMemories((prev) =>
        prev.map((m) => (m.id === id ? { ...m, position } : m)),
      )
    },
    [],
  )

  return { memories, addMemory, updatePosition }
}
