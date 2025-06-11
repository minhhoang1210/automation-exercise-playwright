import { Page, Locator } from '@playwright/test'
import { Header } from '@pages/common/Header'

export class PaymentDonePage {
  readonly page: Page

  readonly header: Header

  readonly orderPlacedText: Locator

  constructor(page: Page) {
    this.page = page

    this.header = new Header(page)

    this.orderPlacedText = page.getByText('Order Placed!')
  }
}
