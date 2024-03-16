import type { Product } from '@/types/product'
import { filterProductsByText } from './filterProductsByText'

export async function getProducts(textToFind: string): Promise<Product[]> {
  const products = await fetchAllProducts()
  return filterProductsByText(products, textToFind)
}

async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const body = await response.json()

  return body.products
}
