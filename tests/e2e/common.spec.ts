import { test, expect } from '@fixtures/baseFixture'

/**
 * TC_HOME_1: Verify scroll up using Arrow button
 * Description: Verify scrolling down to the footer and scrolling up using Arrow button.
 * 
 * Steps:
 * 1. Scroll down to the footer of Home page.
 * 2. Verify the subscription text in the footer is visible.
 * 3. Click the Arrow (scroll up) button.
 * 4. Verify the description text at the top of the page is visible.
 * 
 * Expected Result:
 * - Footer subscription text is visible after scrolling down.
 * - The top description text is visible after scrolling up.
 */
test('TC_HOME_1: Verify scroll up using Arrow button', async ({ homePage }) => {
  await homePage.scrollToFooter()
  await expect(homePage.footer.subscriptionText).toBeVisible()
  await homePage.goToTop()
  await expect(homePage.descriptionText).toBeVisible()
})
