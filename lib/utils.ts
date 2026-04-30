import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCuadrante(libertadEconomica: number, libertadPersonal: number): string {
  const eco = libertadEconomica <= 2 ? 'Autoritario' : libertadEconomica >= 4 ? 'Libertario' : 'Centro';
  const pers = libertadPersonal <= 2 ? 'Conservador' : libertadPersonal >= 4 ? 'Progresista' : 'Centro';

  if (eco === 'Centro' && pers === 'Centro') return 'Centro';
  return `${pers} ${eco}`;
}
