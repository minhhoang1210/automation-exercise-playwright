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

  async confirmOrder(cardDetails: Card) {
    await this.cardName.fill(cardDetails.name)
    await this.cardNumber.fill(cardDetails.number)
    await this.cardCvc.fill(cardDetails.cvc)
    await this.cardMonth.fill(cardDetails.month)
    await this.cardYear.fill(cardDetails.year)
    await this.confirmOrderButton.click()
  }
}
