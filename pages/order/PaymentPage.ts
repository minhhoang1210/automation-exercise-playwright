import { Page, Locator } from '@playwright/test'
import { Card } from '@models/Card'

export class PaymentPage {
  readonly page: Page

  readonly cardName: Locator
  readonly cardNumber: Locator
  readonly cardCvc: Locator
  readonly cardMonth: Locator
  readonly cardYear: Locator
  readonly confirmOrderButton: Locator

  constructor(page: Page) {
    this.page = page

    this.cardName = page.locator('input[name="name_on_card"]')
    this.cardNumber = page.locator('input[name="card_number"]')
    this.cardCvc = page.getByRole('textbox', { name: 'ex.' })
    this.cardMonth = page.getByRole('textbox', { name: 'MM' })
    this.cardYear = page.getByRole('textbox', { name: 'YYYY' })
    this.confirmOrderButton = page.getByRole('button', {
      name: 'Pay and Confirm Order',
    })
  }

  /**
   * Fills in the payment form with card details and submits the order.
   *
   * @param cardDetails - An object containing card details.
   */
  async confirmOrder(cardDetails: Card) {
    const { name, number, cvc, month, year } = cardDetails

    await this.cardName.fill(name)
    await this.cardNumber.fill(number)
    await this.cardCvc.fill(cvc)
    await this.cardMonth.fill(month)
    await this.cardYear.fill(year)
    await this.confirmOrderButton.click()
  }
}
