// Photos are stored inside localStorage (≈5 MB per site), so a single phone
// photo saved as-is can fill it. Downscale and re-encode before saving.
const MAX_SIDE = 1280
const QUALITY = 0.8

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not read image'))
    img.src = src
  })
}

export async function compressImage(file: File): Promise<string> {
  const original = await readAsDataUrl(file)
  try {
    const img = await loadImage(original)
    const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height))
    const width = Math.round(img.width * scale)
    const height = Math.round(img.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return original
    ctx.drawImage(img, 0, 0, width, height)

    const compressed = canvas.toDataURL('image/jpeg', QUALITY)
    return compressed.length < original.length ? compressed : original
  } catch {
    return original
  }
}
