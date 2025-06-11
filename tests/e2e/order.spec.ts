import { test, expect } from '@fixtures/baseFixture'
import {
  accountSignup,
  accountLogin,
  commentOrder,
  paymentDetails,
} from '@resources/data'
import { generateEmail } from '@utils/helpers'

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

  await paymentPage.confirmOrder(paymentDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
  await paymentDonePage.header.deleteAccountButton.click()

  await expect(deleteAccountPage.accountDeletedText).toBeVisible()
  await deleteAccountPage.continueButton.click()
})

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

  await paymentPage.confirmOrder(paymentDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
  await paymentDonePage.header.deleteAccountButton.click()

  await expect(deleteAccountPage.accountDeletedText).toBeVisible()
  await deleteAccountPage.continueButton.click()
})

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

  await paymentPage.confirmOrder(paymentDetails)

  await expect(paymentDonePage.orderPlacedText).toBeVisible()
})
