export const DISCORD_INVITE = 'https://discord.gg/mYAxCg87EX'

export type Ideologia = 'Libertario' | 'Autoritario' | 'Conservador' | 'Progresista'

export const IDEOLOGIAS: Ideologia[] = [
  'Libertario',
  'Autoritario',
  'Conservador',
  'Progresista',
]

export const IDEO_COLORS: Record<Ideologia, string> = {
  Libertario: 'bg-green-500/15 text-green-600 dark:text-green-400',
  Autoritario: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
  Conservador: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  Progresista: 'bg-red-500/15 text-red-600 dark:text-red-400',
}

export function getIdeologia(eco: number, per: number): Ideologia {
  if (eco >= 3 && per >= 3) return 'Libertario'
  if (eco < 3 && per < 3) return 'Autoritario'
  if (eco >= 3 && per < 3) return 'Conservador'
  return 'Progresista'
}

export function getCuadrante(libertadEconomica: number, libertadPersonal: number): string {
  const eco = libertadEconomica <= 2 ? 'Autoritario' : libertadEconomica >= 4 ? 'Libertario' : 'Centro'
  const pers = libertadPersonal <= 2 ? 'Conservador' : libertadPersonal >= 4 ? 'Progresista' : 'Centro'

  if (eco === 'Centro' && pers === 'Centro') return 'Centro'

  return `${pers} ${eco}`
}

export function renderEstrellas(puntos: number): string {
  return '★'.repeat(puntos) + '☆'.repeat(5 - puntos)
}

export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}
