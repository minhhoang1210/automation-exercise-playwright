import { Page, Locator } from '@playwright/test'
import { Header } from '@pages/common/Header'
import { Footer } from '@pages/common/Footer'

export class CartPage {
  readonly page: Page

  readonly cartText: Locator
  readonly checkoutButton: Locator
  readonly signupLoginLink: Locator

  readonly products: Locator
  readonly productNames: Locator
  readonly quantity: Locator

  readonly removeButton: Locator
  readonly cartEmptyText: Locator

  readonly header: Header
  readonly footer: Footer

  constructor(page: Page) {
    this.page = page

    this.cartText = page.getByText('Shopping Cart')
    this.checkoutButton = page.getByText('Proceed To Checkout')
    this.signupLoginLink = page.getByRole('link', { name: 'Register / Login' })

    this.products = page.getByRole('row')
    this.productNames = this.products.locator('a[href*="product_details"]')
    this.quantity = this.products.getByRole('button')

    this.removeButton = page.locator('a.cart_quantity_delete')
    this.cartEmptyText = page.getByText('Cart is empty!')

    this.header = new Header(page)
    this.footer = new Footer(page)
  }

  /**
   * Retrieves the names of all products listed in the cart.
   * 
   * @returns A promise that resolves to an array of product name strings.
   */
  async getProductNames() {
    return this.productNames.allTextContents()
  }

  /**
   * Verifies the total price of each product in the cart is correct 
   * 
   * @returns A promise that resolves to true if price calculations are correct, otherwise false.
   */
  async verifyProductPrices() {
    const rawPrices = await this.products
      .locator('.cart_price')
      .allTextContents()
    const prices = rawPrices.map((price) => {
      const match = price.match(/\d+/)
      return match ? match[0] : ''
    })
    const quantities = await this.quantity.allTextContents()
    const rawTotalPrices = await this.products
      .locator('.cart_total_price')
      .allTextContents()
    const totalPrices = rawTotalPrices.map((totalPrice) => {
      const match = totalPrice.match(/\d+/)
      return match ? match[0] : ''
    })

    for (let i = 0; i < prices.length; i++) {
      if (Number(prices[i]) * Number(quantities[i]) !== Number(totalPrices[i]))
        return false
    }
    return true
  }

  /**
   * Verifies the quantity of a specific product in the cart.
   * 
   * @param quantity - The expected quantity of the product.
   * @returns A promise that resolves to true if the quantity matches, otherwise false.
   */
  async verifyProductQuantity(quantity: number) {
    return Number(await this.quantity.textContent()) === quantity
  }

  /**
   * Clicks Proceed To Checkout button to navigate to Checkout page.
   */
  async proceedToCheckout() {
    await this.checkoutButton.click()
  }

  /**
   * Navigates to Signup/Login page from Cart page.
   */
  async goToSignupLogin() {
    await this.signupLoginLink.click()
  }

  /**
   * Removes a product from the cart by clicking Delete icon.
   */
  async removeProduct() {
    await this.removeButton.click()
  }

  /**
   * Scrolls to the footer of Cart page.
   */
  async scrollToFooter() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    )
  }
}
