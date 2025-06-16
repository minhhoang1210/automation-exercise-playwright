import { Page, Locator } from '@playwright/test'

export class BrandPage {
  readonly page: Page

  readonly brandText: Locator

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Returns the heading Locator for Brand page.
   *
   * @param brand - The brand name to look for in the heading.
   * @returns A Locator pointing to the heading of Brand page.
   */
  getBrandText(brand: string): Locator {
    return this.page.getByRole('heading', { name: `Brand - ${brand} Products` })
  }
}
