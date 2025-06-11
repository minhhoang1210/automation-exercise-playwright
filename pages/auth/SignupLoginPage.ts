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

  async signup(name: string, email: string) {
    await this.signupName.fill(name)
    await this.signupEmail.fill(email)
    await this.signupButton.click()
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email)
    await this.loginPassword.fill(password)
    await this.loginButton.click()
  }
}
