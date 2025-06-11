import { test, expect } from '@fixtures/baseFixture'
import { productQuantity, accountLogin } from '@resources/data'
import { expectAllToBeVisible } from '@utils/helpers'

test('TC_CART_1: Add products to cart', async ({
  homePage,
  productsPage,
  cartPage,
}) => {
  await homePage.header.goToProducts()

  const productNames = await productsPage.getProductNames()
  await productsPage.addFirstTwoProductsToCart()

  const cartProductNames = await cartPage.getProductNames()
  expect(productNames).toEqual(cartProductNames)
  expect(await cartPage.verifyProductPrices()).toBe(true)
})

test('TC_CART_2: Verify product quantity in cart', async ({
  homePage,
  productsPage,
  productDetailPage,
  cartPage,
}) => {
  await homePage.header.goToProducts()

  await productsPage.goToFirstProduct()

  await expectAllToBeVisible(productDetailPage.getProductDetails())
  await productDetailPage.addProductToCart(productQuantity)

  expect(await cartPage.verifyProductQuantity(productQuantity)).toBe(true)
})

test('TC_CART_3: Remove products from cart', async ({
  homePage,
  productsPage,
  cartPage,
}) => {
  await homePage.header.goToProducts()

  await productsPage.addFirstProductToCart()
  await productsPage.header.goToCart()

  await expect(cartPage.cartText).toBeVisible()
  await cartPage.removeProduct()
  await expect(cartPage.cartEmptyText).toBeVisible()
})

test('TC_CART_4: Verify cart is the same after login', async ({
  homePage,
  productsPage,
  cartPage,
  signupLoginPage,
}) => {
  await homePage.header.goToProducts()

  await productsPage.addFirstTwoProductsToCart()

  const productsBeforeLogin = await cartPage.getProductNames()
  await cartPage.header.goToSignupLogin()

  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await homePage.header.goToCart()

  const productsAfterLogin = await cartPage.getProductNames()
  expect(productsBeforeLogin).toEqual(productsAfterLogin)
})
