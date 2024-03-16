import type { HighlightedStringPart } from '@/types/HighlightedStringPart'
import { test, expect } from 'vitest'
import { highlightParts } from './highlightWords'

test('Search for part case-insensitively', () => {
  const text = 'Super banana! BaNaNa world! Foobananabar? Ban Ana'
  const partToFind = 'BANana'

  const expectedParts: HighlightedStringPart[] = [
    {
      highlighted: false,
      text: 'Super '
    },

    {
      highlighted: true,
      text: 'banana'
    },

    {
      highlighted: false,
      text: '! '
    },

    {
      highlighted: true,
      text: 'BaNaNa'
    },

    {
      highlighted: false,
      text: ' world! Foo'
    },

    {
      highlighted: true,
      text: 'banana'
    },

    {
      highlighted: false,
      text: 'bar? Ban Ana'
    }
  ]

  const actualParts = highlightParts(text, partToFind)
  expect(actualParts).toStrictEqual(expectedParts)
})
