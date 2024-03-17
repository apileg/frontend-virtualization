import type { HighlightedStringPart } from '@/types/HighlightedStringPart'

export function highlightParts(text: string, partToFind: string): HighlightedStringPart[] {
  if (partToFind === '') {
    return [
      {
        highlighted: false,
        text
      }
    ]
  }

  const regex = new RegExp(partToFind, 'gi')

  const aroundMatches = text.split(regex)
  const matches = [...text.matchAll(regex)]

  const notHighlighted = aroundMatches.map<HighlightedStringPart>((text) => ({
    highlighted: false,
    text
  }))

  const highlighted = matches.map<HighlightedStringPart>((matches) => ({
    highlighted: true,
    text: matches[0]
  }))

  return interleave(notHighlighted, highlighted)
}

/**
 * Interleaves arrays a and b. Examples:
 *
 * interleave([30, 10], [2]) // [30, 2, 10]
 * interleave([30, 10], [2, 4]) // [30, 2, 10, 4]
 * interleave([30, 10], [2, 4, 5]) // [30, 2, 10, 4, 5]
 * interleave([30, 20, 10], [2, 4]) // [30, 2, 20, 4, 10]
 * interleave([1, 2], []) // [1, 2]
 * interleave([], [1, 2]) // [1, 2]
 * interleave([], []) // []
 */
function interleave<T>(a: T[], b: T[]): T[] {
  if (a.length === 0) {
    return b
  }

  return a.flatMap((ofA, i) => {
    // Array b is less then a:
    // a: [1, 2, 3]
    // b: [4, 5]

    // I want: [1, 4, 2, 5, 6, 7, 8]
    if (b[i] === undefined) {
      return [ofA]
    }

    // Array a is less then b:
    // a: [1, 2]
    // b: [4, 5, 6, 7, 8]

    // I want: [1, 4, 2, 5, 3]
    if (i === a.length - 1) {
      return [ofA, ...b.slice(i)]
    }

    // Default:
    // a: [1, 2, 3]
    // b: [4, 5, 6]

    // I want: [1, 4, 2, 5, 3, 6]
    return [ofA, b[i]]
  })
}
