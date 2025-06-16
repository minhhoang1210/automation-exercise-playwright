import { Page, Locator } from '@playwright/test'

export class CategoryPage {
  readonly page: Page

  readonly categoryText: Locator

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Returns the heading Locator for Category page.
   *
   * @param category - The category name to look for in the heading.
   * @param subCategory - The subcategory name to look for in the heading.
   * @returns A Locator pointing to the heading of Category page.
   */
  getCategoryText(category: string, subCategory: string): Locator {
    return this.page.getByRole('heading', {
      name: `${category} - ${subCategory} Products`,
    })
  }
}
