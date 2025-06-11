import { Page, Locator } from '@playwright/test'

export class CategoryPage {
  readonly page: Page

  readonly categoryText: Locator

  constructor(page: Page) {
    this.page = page
  }

  getCategoryText(category: string, subCategory: string): Locator {
    return this.page.getByRole('heading', {
      name: `${category} - ${subCategory} Products`,
    })
  }
}
