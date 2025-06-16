import { test, expect } from '@fixtures/baseFixture'
import { contactUsMessage } from '@resources/data'

/**
 * TC_CONT_1: Send message through contact us form
 * Description: Verify a user can successfully send a message using Contact Us form.
 * 
 * Steps:
 * 1. Navigate to Contact Us page.
 * 2. Fill out the contact form with valid details.
 * 3. Verify a success message is displayed confirming the form submission.
 * 4. Navigate back to Home page.
 * 
 * Expected Result:
 * - Contact form is submitted successfully and a success message appears.
 * - User can go back to Home page.
 */
test('TC_CONT_1: Send message through contact us form', async ({
  homePage,
  contactUsPage,
}) => {
  await homePage.header.goToContactUs()

  await expect(contactUsPage.getInTouchText).toBeVisible()
  await contactUsPage.sendMessage(contactUsMessage)
  await expect(contactUsPage.successMessage).toBeVisible()
  await contactUsPage.goToHome()

  await expect(homePage.page).toHaveURL(process.env.BASE_URL!)
})
