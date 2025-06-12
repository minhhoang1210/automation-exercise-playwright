import { test, expect } from '@fixtures/baseFixture'

test('TC_HOME_1: Verify scroll up using Arrow button', async ({ homePage }) => {
  await homePage.scrollToFooter()
  await expect(homePage.footer.subscriptionText).toBeVisible()
  await homePage.goToTop()
  await expect(homePage.descriptionText).toBeVisible()
})
