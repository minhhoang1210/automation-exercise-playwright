import { Page, Locator } from '@playwright/test'

export class DeleteAccountPage {
  readonly page: Page

  readonly accountDeletedText: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page

    this.accountDeletedText = page.getByText('Account Deleted!')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
}
