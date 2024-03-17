import { expect, test } from 'vitest'
import type { Product } from '@/types/Product'
import { exampleProduct } from './exampleProduct'
import { getFilteredHighlightedProducts } from './getFilteredHighlightedProducts'

test('Returns only words that contain the searched text', () => {
  const products: Product[] = [
    {
      ...exampleProduct,
      id: 1,
      title: 'Banana world'
    },

    {
      ...exampleProduct,
      id: 2,
      description: 'World of bananas'
    },

    {
      ...exampleProduct,
      id: 3,
      title: 'Foo banana',
      description: 'This is banana'
    },

    {
      ...exampleProduct,
      id: 4
    }
  ]

  const textToFind = 'banana'
  const expectedIds = [1, 2, 3]

  const actualProducts = getFilteredHighlightedProducts(products, textToFind)
  const actualIds = actualProducts.map((p) => p.id)

  expect(actualIds).toStrictEqual(expectedIds)
})

test('Returns all products when the searched text is an empty string', () => {
  const products: Product[] = [
    {
      ...exampleProduct,
      id: 1
    },

    {
      ...exampleProduct,
      id: 2
    },

    {
      ...exampleProduct,
      id: 3
    }
  ]

  const textToFind = ''
  const expectedIds = [1, 2, 3]

  const actualProducts = getFilteredHighlightedProducts(products, textToFind)
  const actualIds = actualProducts.map((p) => p.id)

  expect(actualIds).toStrictEqual(expectedIds)
})
