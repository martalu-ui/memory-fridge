import { useEffect, useState, type RefObject } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import type { Memory } from '../types'
import { colorClasses, iconForStyle } from '../lib/magnetStyles'

interface MagnetProps {
  memory: Memory
  canvasSize: { width: number; height: number }
  onOpen: (memory: Memory) => void
  onPositionChange: (id: string, position: { x: number; y: number }) => void
  index: number
  constraintsRef: RefObject<HTMLDivElement | null>
}

const HOVER_SHADOW =
  '0 4px 8px rgba(40,30,20,0.18), 0 16px 28px -8px rgba(40,30,20,0.32)'

export function Magnet({
  memory,
  canvasSize,
  onOpen,
  onPositionChange,
  index,
  constraintsRef,
}: MagnetProps) {
  // x/y hold the magnet's centre in pixels, measured from the canvas top-left.
  const x = useMotionValue((memory.position.x / 100) * canvasSize.width)
  const y = useMotionValue((memory.position.y / 100) * canvasSize.height)
  const [dragging, setDragging] = useState(false)

  // Positions are stored as percentages: re-derive pixels whenever the saved
  // position or the canvas size changes (e.g. the window is resized).
  useEffect(() => {
    if (dragging) return
    x.set((memory.position.x / 100) * canvasSize.width)
    y.set((memory.position.y / 100) * canvasSize.height)
  }, [memory.position.x, memory.position.y, canvasSize.width, canvasSize.height, dragging, x, y])

  const { bg } = colorClasses(memory.colorKey)
  const icon = iconForStyle(memory.magnetStyle, memory.customIcon)

  function handleDragEnd() {
    setDragging(false)
    const { width, height } = canvasSize
    if (!width || !height) return
    const nx = Math.min(97, Math.max(3, (x.get() / width) * 100))
    const ny = Math.min(97, Math.max(3, (y.get() / height) * 100))
    onPositionChange(memory.id, { x: nx, y: ny })
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.14}
      dragConstraints={constraintsRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        translate: '-50% -50%',
        x,
        y,
        zIndex: dragging ? 60 : 10 + index,
      }}
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: memory.rotation, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15, mass: 0.7 }}
      whileHover={{ scale: 1.07, boxShadow: HOVER_SHADOW }}
      whileTap={{ scale: 0.94 }}
      whileDrag={{ scale: 1.1, boxShadow: HOVER_SHADOW }}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      onTap={() => onOpen(memory)}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      <div
        className={`flex h-[4.6rem] w-[4.6rem] flex-col items-center justify-center gap-0.5 rounded-2xl ${bg} p-2 shadow-magnet ring-1 ring-white/50 sm:h-20 sm:w-20`}
      >
        <span className="text-[1.7rem] leading-none">{icon}</span>
        <span className="max-w-full truncate text-[9.5px] font-semibold tracking-wide text-char/70">
          {memory.title}
        </span>
      </div>
    </motion.div>
  )
}
