import { test, expect } from '@fixtures/baseFixture'
import {
  accountSignup,
  accountLogin,
  commentOrder,
  cardDetails,
} from '@resources/data'
import { generateEmail } from '@utils/helpers'

/**
 * TC_ORDR_1: Register when checkout
 * Description: Verify a user can register during the checkout process and complete an order.
 * 
 * Steps:
 * 1. Nagivate to Products page.
 * 2. Add products to the cart.
 * 3. Navigate to Cart page.
 * 4. Proceed to checkout.
 * 5. Choose to signup during checkout.
 * 6. Complete the signup process and verify account creation.
 * 7. Navigate to Cart page again.
 * 8. Proceed to checkout.
 * 9. Verify address and order review.
 * 10. Place the order and enter payment details.
 * 11. Verify order success.
 * 12. Delete the created account.
 * 
 * Expected Result:
 * - Account signup is successful during checkout.
 * - Order is placed successfully.
 * - Account is deleted after order completion.
 */
test('TC_ORDR_1: Register when checkout', async ({
  homePage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
  paymentDonePage,
  signupLoginPage,
  signupPage,
  accountCreatedPage,
  deleteAccountPage,
}, testInfo) => {
  accountSignup.email = generateEmail(testInfo)

  await homePage.header.goToProducts()

  await productsPage.addFirstTwoProductsToCart()

  await expect(cartPage.cartText).toBeVisible()
  await cartPage.proceedToCheckout()
  await cartPage.goToSignupLogin()

  await signupLoginPage.signup(accountSignup.name, accountSignup.email)

  await signupPage.signup(accountSignup)

  await expect(accountCreatedPage.accountCreatedText).toBeVisible()
  await accountCreatedPage.continueButton.click()

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.goToCart()

  await cartPage.proceedToCheckout()

  await expect(checkoutPage.addressDetails).toBeVisible()
  await expect(checkoutPage.reviewOrder).toBeVisible()
  await checkoutPage.placeOrder(commentOrder)

  await paymentPage.confirmOrder(cardDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
  await paymentDonePage.header.deleteAccountButton.click()

  await expect(deleteAccountPage.accountDeletedText).toBeVisible()
  await deleteAccountPage.continueButton.click()
})

/**
 * TC_ORDR_2: Register before checkout
 * Description: Verify a user who registers before checkout can complete an order successfully.
 * 
 * Steps:
 * 1. Navigae to Signup/Login page.
 * 2. Register a new account.
 * 3. Navigate to Products page.
 * 4. Add products to the cart.
 * 5. Navigate to Cart page.
 * 6. Proceed to checkout.
 * 7. Verify address and order review.
 * 8. Place the order and enter payment details.
 * 9. Verify order success.
 * 10. Delete the created account.
 * 
 * Expected Result:
 * - After signup, order can be placed successfully.
 * - Account is deleted after order completion.
 */
test('TC_ORDR_2: Register before checkout', async ({
  homePage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
  paymentDonePage,
  signupLoginPage,
  signupPage,
  accountCreatedPage,
  deleteAccountPage,
}, testInfo) => {
  accountSignup.email = generateEmail(testInfo)

  await homePage.header.goToSignupLogin()

  await signupLoginPage.signup(accountSignup.name, accountSignup.email)

  await signupPage.signup(accountSignup)

  await expect(accountCreatedPage.accountCreatedText).toBeVisible()
  await accountCreatedPage.continueButton.click()

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.goToProducts()

  await productsPage.addFirstTwoProductsToCart()

  await expect(cartPage.cartText).toBeVisible()
  await cartPage.proceedToCheckout()

  await expect(checkoutPage.addressDetails).toBeVisible()
  await expect(checkoutPage.reviewOrder).toBeVisible()
  await checkoutPage.placeOrder(commentOrder)

  await paymentPage.confirmOrder(cardDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
  await paymentDonePage.header.deleteAccountButton.click()

  await expect(deleteAccountPage.accountDeletedText).toBeVisible()
  await deleteAccountPage.continueButton.click()
})

/**
 * TC_ORDR_3: Login before checkout
 * Description: Verify a user who logs in before checkout can complete an order successfully.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Login with existing account.
 * 3. Navigate to Products page.
 * 4. Add products to the cart.
 * 5. Navigate to Cart page.
 * 6. Proceed to checkout.
 * 7. Verify address and order review.
 * 8. Place the order and enter payment details.
 * 9. Verify order success.
 * 
 * Expected Result: After login, order can be placed successfully.
 */
test('TC_ORDR_3: Login before checkout', async ({
  homePage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
  paymentDonePage,
  signupLoginPage,
}, testInfo) => {
  accountSignup.email = generateEmail(testInfo)

  await homePage.header.goToSignupLogin()

  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.goToProducts()

  await productsPage.addFirstTwoProductsToCart()

  await expect(cartPage.cartText).toBeVisible()
  await cartPage.proceedToCheckout()

  await expect(checkoutPage.addressDetails).toBeVisible()
  await expect(checkoutPage.reviewOrder).toBeVisible()
  await checkoutPage.placeOrder(commentOrder)

  await paymentPage.confirmOrder(cardDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
})
