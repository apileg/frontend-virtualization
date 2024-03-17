import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import type { HighlightedStringPart } from '@/types/HighlightedStringPart'
import { highlightProduct } from './highlightProduct'

export function getFilteredHighlightedProducts(
  products: Product[],
  textToFind: string
): HighlightedProduct[] {
  const highlighted = products.map((p) => highlightProduct(p, textToFind))

  if (textToFind === '') {
    return highlighted
  }

  return highlighted.filter(containsSomeHighlightedPart)
}

function containsSomeHighlightedPart(product: HighlightedProduct): boolean {
  return somePartIsHighlighted(product.title) || somePartIsHighlighted(product.description)
}

function somePartIsHighlighted(parts: HighlightedStringPart[]): boolean {
  return parts.some((p) => p.highlighted)
}
