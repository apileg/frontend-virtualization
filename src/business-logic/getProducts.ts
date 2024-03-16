import type { Product } from '@/types/product'

export async function getProducts(textToFind: string): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const body = await response.json()

  return body.products
}
