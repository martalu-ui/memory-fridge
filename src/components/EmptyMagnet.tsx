import { motion } from 'framer-motion'

export function EmptyMagnet() {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: '50%', top: '38%' }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [-3, 2, -3],
          y: [0, -4, 0],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 220, damping: 16, delay: 0.4 },
          opacity: { duration: 0.4, delay: 0.4 },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
        className="flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-2xl bg-butter p-4 text-center shadow-magnet ring-1 ring-white/50 sm:h-36 sm:w-36"
      >
        <span className="text-2xl">🧲</span>
        <span className="font-hand text-lg leading-snug text-char/80">
          Start collecting memories.
        </span>
      </motion.div>
    </div>
  )
}
