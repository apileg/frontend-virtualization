import type { Product } from './Product'
import type { HighlightedStringPart } from './HighlightedStringPart'

export type HighlightedProduct = Omit<Product, 'title' | 'description'> & {
  title: HighlightedStringPart[]
  description: HighlightedStringPart[]
}
