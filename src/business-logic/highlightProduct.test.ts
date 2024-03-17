import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { expect, test } from 'vitest'
import { highlightProduct } from './highlightProduct'
import { exampleProduct } from './exampleProduct'

test('Highlights title and description', () => {
  const product = exampleProduct
  const textToFind = 'apple'

  const expectedProduct: HighlightedProduct = {
    id: 1,

    title: [
      {
        text: 'iPhone 9',
        highlighted: false
      }
    ],

    description: [
      {
        text: 'An ',
        highlighted: false
      },

      {
        text: 'apple',
        highlighted: true
      },

      {
        text: ' mobile which is nothing like ',
        highlighted: false
      },

      {
        text: 'apple',
        highlighted: true
      },

      {
        text: '',
        highlighted: false
      }
    ],

    price: 549,

    discountPercentage: 12.96,
    rating: 4.69,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
  }

  const actualProduct = highlightProduct(product, textToFind)

  expect(actualProduct).toStrictEqual(expectedProduct)
})
