import { Page, Locator } from '@playwright/test'
import { accountSignup } from '@resources/data'

export class Header {
  readonly signupLoginButton: Locator
  readonly logoutButton: Locator
  readonly deleteAccountButton: Locator
  readonly contactUsButton: Locator
  readonly productsButton: Locator
  readonly cartButton: Locator

  readonly loggedInText: Locator

  constructor(page: Page) {
    this.signupLoginButton = page.getByRole('link', { name: 'Signup / Login' })
    this.logoutButton = page.getByRole('link', { name: 'Logout' })
    this.deleteAccountButton = page.getByRole('link', {
      name: 'Delete Account',
    })
    this.contactUsButton = page.getByRole('link', { name: 'Contact us' })
    this.productsButton = page.getByRole('link', { name: 'Products' })
    this.cartButton = page.getByRole('link', { name: 'Cart' })

    this.loggedInText = page.getByText(`Logged in as ${accountSignup.name}`)
  }

  /**
   * Navigates to Signup/Login page.
   */
  async goToSignupLogin() {
    await this.signupLoginButton.click()
  }

  /**
   * Logs the user out.
   */
  async goToLogout() {
    await this.logoutButton.click()
  }

  /**
   * Navigates to Contact Us page.
   */
  async goToContactUs() {
    await this.contactUsButton.click()
  }

  /**
   * Navigates to Products page.
   */
  async goToProducts() {
    await this.productsButton.click()
  }

  /**
   * Navigates to Cart page.
   */
  async goToCart() {
    await this.cartButton.click()
  }
}
