import { test, expect } from 'vitest'
import { filterProductsByText } from './filterProductsByText'
import type { Product } from '@/types/Product'
import type { HighlightedProduct } from '@/types/HighlightedProduct'

// - Searches in title
// - Searches in description
// - Does not search in category
// - If text is found in both title and description, the product
// is included in the array only once

const baseProduct: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
}

test('Searches in title, case-insensitive', () => {
  const products: Product[] = [
    {
      ...baseProduct,
      title: 'Super banana'
    },

    {
      ...baseProduct,
      title: 'It is bAnAnA'
    },

    {
      ...baseProduct,
      title: 'It is bAnAnA_test'
    },

    baseProduct,

    {
      ...baseProduct,
      title: 'Ban Ana'
    }
  ]

  const textToFind = 'BANANA'

  const expectedProducts: Product[] = [products[0], products[1], products[2]]

  const actualProducts = filterProductsByText(products, textToFind)
  expect(actualProducts).toStrictEqual(expectedProducts)
})

test('Searches in description, case-insensitive', () => {
  const products: Product[] = [
    {
      ...baseProduct,
      description: 'Super banana'
    },

    {
      ...baseProduct,
      description: 'It is bAnAnA'
    },

    {
      ...baseProduct,
      description: 'It is bAnAnA_test'
    },

    baseProduct,

    {
      ...baseProduct,
      description: 'Ban Ana'
    }
  ]

  const textToFind = 'banana'

  const expectedProducts: Product[] = [products[0], products[1], products[2]]

  const actualProducts = filterProductsByText(products, textToFind)
  expect(actualProducts).toStrictEqual(expectedProducts)
})

test('Does not search in category', () => {
  const products: Product[] = [
    {
      ...baseProduct,
      category: 'It is bAnAnA_test'
    }
  ]

  const textToFind = 'banana'
  const actualProducts = filterProductsByText(products, textToFind)

  expect(actualProducts).toStrictEqual([])
})

test(
  'If text is found in both title and description, ' +
    'the product is included in the array only once',

  () => {
    const product = {
      ...baseProduct,
      title: 'Super banana',
      description: 'It is bAnAnA_test'
    }

    const textToFind = 'banana'
    const actualProducts = filterProductsByText([product], textToFind)

    expect(actualProducts).toStrictEqual([product])
  }
)
