import { Page, Locator } from '@playwright/test'
import { Account } from '@models/Account'

export class SignupPage {
  readonly page: Page

  readonly signupText: Locator
  readonly titleRadioMale: Locator
  readonly titleRadioFemale: Locator
  readonly passwordInput: Locator
  readonly dayDropdown: Locator
  readonly monthDropdown: Locator
  readonly yearDropdown: Locator
  readonly newsletterCheckbox: Locator
  readonly specialOffersCheckbox: Locator

  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly companyInput: Locator
  readonly addressInput: Locator
  readonly address2Input: Locator
  readonly stateInput: Locator
  readonly cityInput: Locator
  readonly zipcodeInput: Locator
  readonly mobileNumberInput: Locator

  readonly createAccountButton: Locator

  constructor(page: Page) {
    this.page = page
    this.signupText = page.getByText('Enter Account Information')

    this.titleRadioMale = page.getByRole('radio', { name: 'Mr.' })
    this.titleRadioFemale = page.getByRole('radio', { name: 'Mrs.' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' })
    this.dayDropdown = page.locator('#days')
    this.monthDropdown = page.locator('#months')
    this.yearDropdown = page.locator('#years')
    this.newsletterCheckbox = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    })
    this.specialOffersCheckbox = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    })

    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' })
    this.companyInput = page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    })
    this.addressInput = page.getByRole('textbox', { name: 'Address *' })
    this.address2Input = page.getByRole('textbox', { name: 'Address 2' })
    this.stateInput = page.getByRole('textbox', { name: 'State *' })
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' })
    this.zipcodeInput = page.locator('#zipcode')
    this.mobileNumberInput = page.getByRole('textbox', {
      name: 'Mobile Number *',
    })

    this.createAccountButton = page.getByRole('button', {
      name: 'Create Account',
    })
  }

  async signup(account: Account) {
    if (account.title === 'Mr.') await this.titleRadioMale.check()
    else await this.titleRadioFemale.check()
    await this.passwordInput.fill(account.password)
    await this.dayDropdown.selectOption(account.day)
    await this.monthDropdown.selectOption(account.month)
    await this.yearDropdown.selectOption(account.year)
    if (account.newsletter) await this.newsletterCheckbox.check()
    if (account.specialOffers) await this.specialOffersCheckbox.check()

    await this.firstNameInput.fill(account.firstName)
    await this.lastNameInput.fill(account.lastName)
    await this.companyInput.fill(account.company)
    await this.addressInput.fill(account.address)
    await this.address2Input.fill(account.address2)
    await this.stateInput.fill(account.state)
    await this.cityInput.fill(account.city)
    await this.zipcodeInput.fill(account.zipcode)
    await this.mobileNumberInput.fill(account.mobileNumber)

    await this.createAccountButton.click()
  }
}
