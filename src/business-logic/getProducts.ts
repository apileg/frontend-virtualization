import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { getHighlightedProducts } from './getHighlightedProducts'

export async function getProducts(textToFind?: string): Promise<HighlightedProduct[]> {
  const products = await fetchAllProducts()
  return getHighlightedProducts(products, textToFind)
}

async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const body = await response.json()

  return body.products
}
