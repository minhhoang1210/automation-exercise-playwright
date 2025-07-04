import { Page, Locator } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page

  readonly addressDetails: Locator
  readonly reviewOrder: Locator
  readonly commentTextarea: Locator
  readonly placeOrderButton: Locator

  constructor(page: Page) {
    this.page = page

    this.addressDetails = page.getByRole('heading', { name: 'Address Details' })
    this.reviewOrder = page.getByRole('heading', { name: 'Review Your Order' })
    this.commentTextarea = page.locator('textarea[name="message"]')
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })
  }

  /**
   * Fills in the order comment and clicks Place Order button to proceed.
   *
   * @param comment - The comment to include with the order.
   */
  async placeOrder(comment: string) {
    await this.commentTextarea.fill(comment)
    await this.placeOrderButton.click()
  }
}
