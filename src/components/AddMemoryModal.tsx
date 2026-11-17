import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { MagnetStyleKey, NewMemoryInput } from '../types'
import { MAGNET_STYLES } from '../lib/magnetStyles'
import { compressImage } from '../lib/image'

interface AddMemoryModalProps {
  open: boolean
  onClose: () => void
  onSave: (input: NewMemoryInput) => void
}

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = {
  title: '',
  date: today(),
  location: '',
  note: '',
  photo: null as string | null,
  magnetStyle: 'city' as MagnetStyleKey,
  customIcon: '',
}

export function AddMemoryModal({ open, onClose, onSave }: AddMemoryModalProps) {
  const [form, setForm] = useState(emptyForm)

  function reset() {
    setForm(emptyForm)
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const photo = await compressImage(file)
      setForm((f) => ({ ...f, photo }))
    } catch {
      // Unreadable file: leave the current photo as it is.
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave({
      title: form.title.trim(),
      date: form.date,
      location: form.location.trim(),
      note: form.note.trim(),
      photo: form.photo,
      magnetStyle: form.magnetStyle,
      customIcon:
        form.magnetStyle === 'custom' ? form.customIcon.trim() || '⭐' : null,
    })
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-char/30 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="no-scrollbar max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-4xl bg-cream-soft p-7 shadow-card ring-1 ring-black/5 dark:bg-char-soft sm:rounded-4xl sm:p-8"
          >
            <h2 className="font-display text-2xl text-char dark:text-cream-soft">
              New memory
            </h2>
            <p className="mt-1 text-sm text-char/50 dark:text-cream-soft/50">
              Pin a little moment to the fridge.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Afternoon in Kyoto"
                  required
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Location">
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, location: e.target.value }))
                    }
                    placeholder="Kyoto, Japan"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Photo">
                <div className="flex items-center gap-4">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt=""
                      className="h-16 w-16 rounded-2xl object-cover shadow-soft"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-deep text-xl dark:bg-char">
                      🖼️
                    </div>
                  )}
                  <label className="cursor-pointer rounded-full bg-cream-deep px-4 py-2 text-sm font-medium text-char/70 transition hover:bg-cream-deep/70 dark:bg-char dark:text-cream-soft/70">
                    {form.photo ? 'Change photo' : 'Add photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                </div>
              </Field>

              <Field label="Note">
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder="Write a little something to remember..."
                  rows={3}
                  className={`${inputClass} resize-none font-hand text-lg leading-snug`}
                />
              </Field>

              <Field label="Magnet style">
                <div className="grid grid-cols-5 gap-2">
                  {MAGNET_STYLES.map((s) => (
                    <button
                      type="button"
                      key={s.key}
                      onClick={() => setForm((f) => ({ ...f, magnetStyle: s.key }))}
                      className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xl transition ${
                        form.magnetStyle === s.key
                          ? 'bg-sage/60 ring-2 ring-sage-deep dark:bg-sage/30'
                          : 'bg-cream-deep/70 hover:bg-cream-deep dark:bg-char dark:hover:bg-char-soft'
                      }`}
                      title={s.label}
                    >
                      <span>{s.icon}</span>
                    </button>
                  ))}
                </div>
                {form.magnetStyle === 'custom' && (
                  <input
                    value={form.customIcon}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, customIcon: e.target.value }))
                    }
                    placeholder="Type an emoji or short label"
                    maxLength={4}
                    className={`${inputClass} mt-2`}
                  />
                )}
              </Field>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-full bg-transparent py-3 text-sm font-medium text-char/50 transition hover:bg-cream-deep/60 dark:text-cream-soft/50"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="flex-1 rounded-full bg-sage-deep py-3 text-sm font-semibold text-char shadow-soft transition hover:brightness-105"
                >
                  Pin to fridge
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const inputClass =
  'w-full rounded-2xl bg-cream-deep/70 px-4 py-3 text-char placeholder:text-char/35 outline-none ring-0 transition focus:bg-cream-deep focus:ring-2 focus:ring-sage-deep/60 dark:bg-char dark:text-cream-soft dark:placeholder:text-cream-soft/30'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-char/40 dark:text-cream-soft/40">
        {label}
      </span>
      {children}
    </label>
  )
}
