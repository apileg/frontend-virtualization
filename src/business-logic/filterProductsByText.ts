import type { Product } from '@/types/product'

export function filterProductsByText(products: Product[], textToFind: string): Product[] {
  const searchTextLower = textToFind.toLowerCase()

  return products.filter((product) => {
    const titleLower = product.title.toLowerCase()
    const descriptionLower = product.description.toLowerCase()

    const foundInTitle = titleLower.includes(searchTextLower)
    const foundInDescription = descriptionLower.includes(searchTextLower)

    return foundInTitle || foundInDescription
  })
}
