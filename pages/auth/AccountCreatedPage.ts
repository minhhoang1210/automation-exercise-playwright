import { Page, Locator } from '@playwright/test'

export class AccountCreatedPage {
  readonly page: Page

  readonly accountCreatedText: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page

    this.accountCreatedText = page.getByText('Account Created!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}
