import { Page, Locator } from '@playwright/test'

export class BrandPage {
  readonly page: Page

  readonly brandText: Locator

  constructor(page: Page) {
    this.page = page
  }

  getBrandText(brand: string): Locator {
    return this.page.getByRole('heading', { name: `Brand - ${brand} Products` })
  }
}
