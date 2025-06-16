import { Page, Locator } from '@playwright/test'

export class Footer {
  readonly subscriptionText: Locator
  readonly emailInput: Locator
  readonly submitButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.subscriptionText = page.getByRole('heading', { name: 'Subscription' })
    this.emailInput = page.getByRole('textbox', {
      name: 'Your email address',
    })
    this.submitButton = page.locator('#subscribe')
    this.successMessage = page.getByText(
      'You have been successfully subscribed!'
    )
  }

  /**
   * Subscribes using the provided email.
   *
   * @param email - Email to enter in the subscription input field.
   */
  async subscribe(email: string) {
    await this.emailInput.fill(email)
    await this.submitButton.click()
  }
}
