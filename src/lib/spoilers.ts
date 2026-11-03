export type TextPart = {
  type: 'text' | 'spoiler'
  content: string
}

export function parseSpoilers(text: string): TextPart[] {
  const parts: TextPart[] = []
  const regex = /\(Spoiler\)\[([^\]]*)\]/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }

    parts.push({ type: 'spoiler', content: match[1] })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return parts
}

export function stripSpoilers(text: string): string {
  return text
    .replace(/\(Spoiler\)\[[^\]]*\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
