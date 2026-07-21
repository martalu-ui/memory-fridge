import { AnimatePresence, motion } from 'framer-motion'
import type { Memory } from '../types'
import { iconForStyle } from '../lib/magnetStyles'

interface MemoryDetailProps {
  memory: Memory | null
  onClose: () => void
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(`${date}T00:00:00`)
  if (Number.isNaN(d.getTime())) return date
  return dateFormatter.format(d)
}

export function MemoryDetail({ memory, onClose }: MemoryDetailProps) {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-char/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.82, rotate: memory.rotation, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: memory.rotation * 0.6, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="no-scrollbar relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-4xl bg-cream-soft p-6 shadow-card ring-1 ring-black/5 dark:bg-char-soft sm:max-w-md sm:p-8"
          >
            {/* washi tape */}
            <div className="pointer-events-none absolute -top-3 left-10 h-6 w-16 -rotate-6 rounded-sm bg-blush/70 shadow-sm" />
            <div className="pointer-events-none absolute -top-3 right-14 h-6 w-14 rotate-3 rounded-sm bg-sky/60 shadow-sm" />

            {/* stamp */}
            <div className="pointer-events-none absolute -right-2 -top-2 flex h-14 w-14 rotate-6 items-center justify-center rounded-xl border-2 border-dashed border-char/20 bg-butter/70 text-xl shadow-soft dark:border-cream-soft/20">
              {iconForStyle(memory.magnetStyle, memory.customIcon)}
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream-deep/80 text-char/60 transition hover:bg-cream-deep dark:bg-char dark:text-cream-soft/60"
            >
              ✕
            </button>

            {memory.photo && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                src={memory.photo}
                alt={memory.title}
                className="mb-5 h-56 w-full rounded-3xl object-cover shadow-soft sm:h-64"
              />
            )}

            <h2 className="font-display text-2xl text-char dark:text-cream-soft">
              {memory.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-char/50 dark:text-cream-soft/50">
              {memory.date && <span>{formatDate(memory.date)}</span>}
              {memory.date && memory.location && <span>·</span>}
              {memory.location && <span>📍 {memory.location}</span>}
            </div>

            {memory.note && (
              <p className="mt-5 whitespace-pre-wrap font-hand text-xl leading-relaxed text-char/80 dark:text-cream-soft/80">
                {memory.note}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
