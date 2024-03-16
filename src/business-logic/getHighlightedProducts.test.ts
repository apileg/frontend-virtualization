import type { HighlightedProduct } from '@/types/HighlightedProduct'
import type { Product } from '@/types/Product'
import { expect, test } from 'vitest'
import { highlightParts } from './highlightParts'
import { getHighlightedProducts } from './getHighlightedProducts'

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

test('Returns products whose title or description includes the text', () => {
  const products: Product[] = [
    {
      ...baseProduct,
      id: 1
    },

    {
      ...baseProduct,
      id: 2,
      title: 'Super banana'
    },

    {
      ...baseProduct,
      id: 3,
      description: 'It is a banana'
    },

    {
      ...baseProduct,
      id: 4,
      title: 'BANANA',
      description: 'Also known as banana'
    },

    {
      ...baseProduct,
      id: 5,
      category: 'banana'
    }
  ]

  const text = 'banana'
  const expectedIds = [2, 3, 4]

  const actualProducts = getHighlightedProducts(products, text)
  const actualIds = actualProducts.map((p) => p.id)

  expect(actualIds).toStrictEqual(expectedIds)
})

test('Applies highlightParts() to title and description', () => {
  const product: Product = {
    ...baseProduct,
    title: 'Apple',
    description: 'Foobar'
  }

  const partToFind = 'apple'

  const expectedProducts: HighlightedProduct[] = [
    {
      ...baseProduct,
      title: highlightParts('Apple', partToFind),
      description: highlightParts('Foobar', partToFind)
    }
  ]

  const actualProducts = getHighlightedProducts([product], partToFind)

  expect(actualProducts).toStrictEqual(expectedProducts)
})
