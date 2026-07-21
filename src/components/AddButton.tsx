import { motion } from 'framer-motion'

interface AddButtonProps {
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Add a memory"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-7 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-3xl font-light text-cream-soft shadow-card ring-1 ring-white/40 sm:bottom-9 sm:right-9"
    >
      <span className="-mt-0.5">+</span>
    </motion.button>
  )
}
