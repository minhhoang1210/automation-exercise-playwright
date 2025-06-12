import { Page, Locator } from '@playwright/test'
import { Header } from '@pages/common/Header'
import { Footer } from '@pages/common/Footer'

export class HomePage {
  readonly page: Page

  readonly header: Header
  readonly footer: Footer

  readonly arrowButton: Locator
  readonly descriptionText: Locator

  constructor(page: Page) {
    this.page = page

    this.header = new Header(page)
    this.footer = new Footer(page)

    this.arrowButton = page.locator('a[href="#top"]')
    this.descriptionText = page
      .getByText('Full-Fledged practice website for Automation Engineers', {
        exact: true,
      })
      .first()
  }

  async goTo() {
    await this.page.goto(process.env.BASE_URL!)
  }

  async scrollToFooter() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    )
  }

  async goToTop() {
    await this.arrowButton.click()
  }
}
