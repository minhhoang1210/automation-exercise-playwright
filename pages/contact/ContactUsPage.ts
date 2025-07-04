import { Page, Locator } from '@playwright/test'
import { ContactUsMessage } from '@models/ContactUsMessage'
import path from 'path'

export class ContactUsPage {
  readonly page: Page

  readonly getInTouchText: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly messageInput: Locator
  readonly chooseFileButton: Locator

  readonly submitButton: Locator
  readonly successMessage: Locator
  readonly homeButton: Locator

  constructor(page: Page) {
    this.page = page

    this.getInTouchText = page.getByRole('heading', { name: 'Get In Touch' })
    this.nameInput = page.getByRole('textbox', { name: 'Name' })
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true })
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' })
    this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' })
    this.chooseFileButton = page.locator('input[name="upload_file"]')

    this.submitButton = page.getByRole('button', { name: 'Submit' })
    this.successMessage = page
      .locator('#contact-page')
      .getByText('Success! Your details have been submitted successfully.')
    this.homeButton = page
      .locator('#form-section')
      .getByRole('link', { name: 'Home' })

    this.page.on('dialog', async (dialog) => await dialog.accept())
  }

  /**
   * Fills out and submits contact form using the provided contact message details.
   *
   * @param contactUsMessage - An object containing contact message details.
   */
  async sendMessage(contactUsMessage: ContactUsMessage) {
    const { name, email, subject, message, filePath } = contactUsMessage
    const fullFilePath = path.join(__dirname, filePath)

    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.messageInput.fill(message)
    await this.chooseFileButton.setInputFiles(fullFilePath)

    await this.submitButton.scrollIntoViewIfNeeded()
    await this.submitButton.hover()
    await this.submitButton.click()
  }

  /**
   * Navigates to Home page from Contact Us page.
   */
  async goToHome() {
    await this.homeButton.click()
  }
}
