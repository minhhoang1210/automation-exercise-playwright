import { Page, Locator } from '@playwright/test'

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

  async confirmOrder(paymentDetails: {
    cardName: string
    cardNumber: string
    cardCvc: string
    cardMonth: string
    cardYear: string
  }) {
    await this.cardName.fill(paymentDetails.cardName)
    await this.cardNumber.fill(paymentDetails.cardNumber)
    await this.cardCvc.fill(paymentDetails.cardCvc)
    await this.cardMonth.fill(paymentDetails.cardMonth)
    await this.cardYear.fill(paymentDetails.cardYear)
    await this.confirmOrderButton.click()
  }
}
