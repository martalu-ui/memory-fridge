export type MagnetStyleKey =
  | 'city'
  | 'plane'
  | 'coffee'
  | 'flower'
  | 'mountain'
  | 'wave'
  | 'concert'
  | 'birthday'
  | 'heart'
  | 'custom'

export interface Memory {
  id: string
  title: string
  date: string
  location: string
  photo: string | null
  note: string
  magnetStyle: MagnetStyleKey
  customIcon: string | null
  colorKey: MagnetColorKey
  position: { x: number; y: number }
  rotation: number
  createdAt: number
}

export type MagnetColorKey =
  | 'sage'
  | 'blush'
  | 'butter'
  | 'sky'
  | 'terracotta'
  | 'lavender'

export type NewMemoryInput = Omit<
  Memory,
  'id' | 'position' | 'rotation' | 'createdAt' | 'colorKey'
>
