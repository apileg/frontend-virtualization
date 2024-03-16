import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { highlightParts } from './highlightParts'
import type { HighlightedStringPart } from '@/types/HighlightedStringPart'

export function getHighlightedProducts(
  products: Product[],
  textToFind?: string
): HighlightedProduct[] {
  const highlighted = products.map((p) => highlightProduct(p, textToFind))
  return highlighted.filter(containsSomeHighlightedPart)
}

function highlightProduct(product: Product, textToFind?: string): HighlightedProduct {
  const { title, description, ...rest } = product

  return {
    ...rest,
    title: highlightParts(title, textToFind),
    description: highlightParts(description, textToFind)
  }
}

function containsSomeHighlightedPart(product: HighlightedProduct): boolean {
  return somePartIsHighlighted(product.title) || somePartIsHighlighted(product.description)
}

function somePartIsHighlighted(parts: HighlightedStringPart[]): boolean {
  return parts.some((p) => p.highlighted)
}
