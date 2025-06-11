import { test, expect } from '@fixtures/baseFixture'
import { contactUsMessage } from '@resources/data'

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
