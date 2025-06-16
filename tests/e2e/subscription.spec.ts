import { test, expect } from '@fixtures/baseFixture'
import { accountSignup } from '@resources/data'

/**
 * TC_SUBS_1: Verify Subscription in Home page
 * Description: Verify subscription functionality in the footer of Home page.
 *
 * Steps:
 * 1. Scroll to the footer of Home page.
 * 3. Verify subscription text is visible.
 * 4. Enter an email and subscribe.
 * 5. Verify success message is displayed.
 *
 * Expected Result: Subscription is successful and success message is displayed.
 */
test('TC_SUBS_1: Verify Subscription in Home page', async ({ homePage }) => {
  await homePage.scrollToFooter()
  await expect(homePage.footer.subscriptionText).toBeVisible()
  await homePage.footer.subscribe(accountSignup.email)
  await expect(homePage.footer.successMessage).toBeVisible()
})

/**
 * TC_SUBS_2: Verify Subscription in Cart page
 * Description: Verify subscription functionality in the footer of Cart page.
 *
 * Steps:
 * 1. Navigate to Cart page.
 * 2. Scroll to the footer of Cart page.
 * 3. Verify subscription text is visible.
 * 4. Enter an email and subscribe.
 * 5. Verify success message is displayed.
 *
 * Expected Result: Subscription is successful and success message is displayed.
 */
test('TC_SUBS_2: Verify Subscription in Cart page', async ({
  homePage,
  cartPage,
}) => {
  await homePage.header.goToCart()

  await cartPage.scrollToFooter()
  await expect(cartPage.footer.subscriptionText).toBeVisible()
  await cartPage.footer.subscribe(accountSignup.email)
  await expect(cartPage.footer.successMessage).toBeVisible()
})
