import { test, expect } from '@fixtures/baseFixture'
import { productQuantity, accountLogin } from '@resources/data'
import { expectAllToBeVisible } from '@utils/helpers'

/**
 * TC_CART_1: Add products to cart
 * Description: Verify products can be added to the cart and their prices are correct.
 * Steps:
 * 1. Navigate to Products page.
 * 2. Add the first two products to the cart.
 * 3. Navigate to Cart page.
 * 4. Verify product names and prices are correct.
 * Expected Result:
 * - Product names in the cart match the ones added.
 * - Product prices are correctly displayed in the cart.
 */
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

/**
 * TC_CART_2: Verify product quantity in cart
 * Description: Verify the product quantity is correctly displayed in the cart.
 * Steps:
 * 1. Navigate to Products page.
 * 2. Navigate to the first product's Detail page.
 * 3. Add the product to the cart with a specific quantity.
 * 4. Navigate to Cart page.
 * 5. Verify the product quantity in the cart.
 * Expected Result: Cart shows the correct quantity for the added product.
 */
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

/**
 * TC_CART_3: Remove products from cart
 * Description: Verify a product can be removed from the cart and the cart is empty afterward.
 * Steps:
 * 1. Navigate to Products page.
 * 2. Add the first product to the cart.
 * 3. Navigate to Cart page.
 * 4. Remove the product from the cart.
 * 5. Check that the cart is empty.
 * Expected Result:
 * - Product is successfully removed from the cart.
 * - Cart displays a message indicating it's empty.
 */
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

/**
 * TC_CART_4: Verify cart is the same after login
 * Description: Verify the cart retains its contents after user logs in.
 * 
 * Steps:
 * 1. Navigate to Products page.
 * 2. Add the first two products to the cart.
 * 3. Navigate to Signup/Login page.
 * 4. Login with valid credentials.
 * 5. Navigate to Cart page.
 * 6. Verify the products in the cart remain the same.
 * 
 * Expected Result: Products added to cart before login remain the same after login.
 */
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
