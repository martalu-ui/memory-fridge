import { useRef, useState } from 'react'
import { Fridge } from './components/Fridge'
import { Magnet } from './components/Magnet'
import { EmptyMagnet } from './components/EmptyMagnet'
import { AddButton } from './components/AddButton'
import { AddMemoryModal } from './components/AddMemoryModal'
import { MemoryDetail } from './components/MemoryDetail'
import { DarkModeToggle } from './components/DarkModeToggle'
import { useMemories } from './hooks/useMemories'
import { useDarkMode } from './hooks/useDarkMode'
import { useElementSize } from './hooks/useElementSize'
import type { Memory } from './types'

function App() {
  const { memories, addMemory, updatePosition, saveFailed } = useMemories()
  const { isDark, toggle } = useDarkMode()
  const [modalOpen, setModalOpen] = useState(false)
  const [openMemory, setOpenMemory] = useState<Memory | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasSize = useElementSize(canvasRef)

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="grain-overlay" />
      <DarkModeToggle isDark={isDark} onToggle={toggle} />

      <main className="flex h-full w-full items-center justify-center px-4 py-10 sm:py-14">
        <Fridge ref={canvasRef}>
          {memories.length === 0 && <EmptyMagnet />}
          {canvasSize.width > 0 &&
            memories.map((memory, index) => (
              <Magnet
                key={memory.id}
                memory={memory}
                index={index}
                canvasSize={canvasSize}
                constraintsRef={canvasRef}
                onOpen={setOpenMemory}
                onPositionChange={updatePosition}
              />
            ))}
        </Fridge>
      </main>

      {saveFailed && (
        <div
          role="alert"
          className="fixed left-1/2 top-5 z-50 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl bg-blush px-4 py-3 text-center text-sm text-char shadow-card ring-1 ring-black/5"
        >
          The fridge is full: your latest changes could not be saved in this
          browser. Try a smaller photo.
        </div>
      )}

      <AddButton onClick={() => setModalOpen(true)} />

      <AddMemoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addMemory}
      />

      <MemoryDetail memory={openMemory} onClose={() => setOpenMemory(null)} />
    </div>
  )
}

export default App
