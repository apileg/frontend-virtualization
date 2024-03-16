import type { Product } from '@/types/Product'
import { filterProductsByText } from './filterProductsByText'
import type { HighlightedProduct } from '@/types/HighlightedProduct'

export async function getProducts(textToFind?: string): Promise<HighlightedProduct[]> {
  const products = await fetchAllProducts()

  if (textToFind === undefined) {
    return products
  }

  return filterProductsByText(products, textToFind)
}

async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const body = await response.json()

  return body.products
}
