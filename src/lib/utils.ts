export const DISCORD_INVITE = 'https://discord.gg/mYAxCg87EX'

export const PARTIDOS_CORTE = '2026-12-13T23:59:59+01:00'

export function partidosActivos(): boolean {
  return Date.now() < Date.parse(PARTIDOS_CORTE)
}

export type PosicionNolan = { eco: number; pers: number }

// Posición fija de cada partido en el diagrama. No es la media de sus animes:
// el reparto se hizo por "vibe" y la media daría cuadrantes absurdos.
// La altura la marca eco + pers: sumas altas suben hacia libertario, sumas
// bajas bajan hacia autoritario; el eje horizontal es económica - personal.
export const POSICION_PARTIDO: Record<string, PosicionNolan> = {
  vox: { eco: 3, pers: 1 },
  salf: { eco: 4, pers: 1 },
  pp: { eco: 3.5, pers: 2 },
  psoe: { eco: 3, pers: 4 },
  podemos: { eco: 2, pers: 4 },
  'frente-amplio': { eco: 1.5, pers: 5 },
}

export function textoSobreColor(hex: string): '#000000' | '#ffffff' {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16) / 255
  const g = parseInt(value.slice(2, 4), 16) / 255
  const b = parseInt(value.slice(4, 6), 16) / 255
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b) > 0.45 ? '#000000' : '#ffffff'
}

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
