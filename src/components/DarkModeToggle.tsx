import { motion } from 'framer-motion'

interface DarkModeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft/80 text-lg shadow-soft ring-1 ring-black/5 backdrop-blur transition dark:bg-char-soft/80 dark:ring-white/10"
    >
      {isDark ? '🌙' : '☀️'}
    </motion.button>
  )
}
