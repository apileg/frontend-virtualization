import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { highlightParts } from './highlightParts'

export function highlightProduct(product: Product, textToFind: string): HighlightedProduct {
  const { title, description, ...rest } = product

  return {
    ...rest,
    title: highlightParts(title, textToFind),
    description: highlightParts(description, textToFind)
  }
}
