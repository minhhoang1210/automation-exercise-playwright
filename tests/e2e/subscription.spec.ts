import { test, expect } from '@fixtures/baseFixture'
import { accountSignup } from '@resources/data'

test('TC_SUBS_1: Verify Subscription in home page', async ({ homePage }) => {
  await homePage.scrollToFooter()
  await expect(homePage.footer.subscriptionText).toBeVisible()
  await homePage.footer.subscribe(accountSignup.email)
  await expect(homePage.footer.successMessage).toBeVisible()
})

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
