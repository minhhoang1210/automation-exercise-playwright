import { Page, Locator } from '@playwright/test'

export class SignupLoginPage {
  readonly page: Page

  readonly signupText: Locator
  readonly signupName: Locator
  readonly signupEmail: Locator
  readonly signupButton: Locator
  readonly signupErrorMessage: Locator

  readonly loginText: Locator
  readonly loginEmail: Locator
  readonly loginPassword: Locator
  readonly loginButton: Locator
  readonly loginErrorMessage: Locator

  constructor(page: Page) {
    this.page = page

    this.signupText = page.getByRole('heading', { name: 'New User Signup!' })
    this.signupName = page.getByRole('textbox', { name: 'Name' })
    this.signupEmail = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
    this.signupButton = page.getByRole('button', { name: 'Signup' })
    this.signupErrorMessage = page.getByText('Email Address already exist!')

    this.loginText = page.getByRole('heading', {
      name: 'Login to your account',
    })
    this.loginEmail = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address')
    this.loginPassword = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.loginErrorMessage = page.getByText(
      'Your email or password is incorrect!'
    )
  }

  /**
   * Fills out and submits signup form with the provided name and email.
   * 
   * @param name - User's name to enter in signup form.
   * @param email - User's email to enter in signup form.
   */
  async signup(name: string, email: string) {
    await this.signupName.fill(name)
    await this.signupEmail.fill(email)
    await this.signupButton.click()
  }

  /**
   * Fills out and submits login form with the provided email and password.
   * 
   * @param email - User's email to enter in login form.
   * @param password - User's password to enter in login form.
   */
  async login(email: string, password: string) {
    await this.loginEmail.fill(email)
    await this.loginPassword.fill(password)
    await this.loginButton.click()
  }
}
