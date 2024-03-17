import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { getFilteredHighlightedProducts } from './getFilteredHighlightedProducts'

export async function getProducts(textToFind: string): Promise<HighlightedProduct[]> {
  const products = await fetchAllProducts()

  // REMOVEME
  const manyProducts = products.flatMap((_) => products)

  return getFilteredHighlightedProducts(manyProducts, textToFind)
}

async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const body = await response.json()

  return body.products
}
