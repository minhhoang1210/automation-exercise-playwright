import { test as base, expect } from '@playwright/test'
import { HomePage } from '@pages/home/HomePage'
import { SignupLoginPage } from '@pages/auth/SignupLoginPage'
import { SignupPage } from '@pages/auth/SignupPage'
import { AccountCreatedPage } from '@pages/auth/AccountCreatedPage'
import { DeleteAccountPage } from '@pages/auth/DeleteAccountPage'
import { ContactUsPage } from '@pages/contact/ContactUsPage'
import { ProductsPage } from '@pages/products/ProductsPage'
import { ProductDetailPage } from '@pages/products/ProductDetailPage'
import { CategoryPage } from '@pages/products/CategoryPage'
import { BrandPage } from '@pages/products/BrandPage'
import { CartPage } from '@pages/cart/CartPage'
import { CheckoutPage } from '@pages/order/CheckoutPage'
import { PaymentPage } from '@pages/order/PaymentPage'
import { PaymentDonePage } from '@pages/order/PaymentDonePage'

interface Pages {
  homePage: HomePage
  signupLoginPage: SignupLoginPage
  signupPage: SignupPage
  accountCreatedPage: AccountCreatedPage
  deleteAccountPage: DeleteAccountPage
  contactUsPage: ContactUsPage
  productsPage: ProductsPage
  productDetailPage: ProductDetailPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  paymentPage: PaymentPage
  paymentDonePage: PaymentDonePage
  categoryPage: CategoryPage
  brandPage: BrandPage
}

const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.goTo()
    await expect(homePage.page).toHaveTitle('Automation Exercise')
    await use(homePage)
  },

  signupLoginPage: async ({ page }, use) => {
    const signupLoginPage = new SignupLoginPage(page)
    await use(signupLoginPage)
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page)
    await use(signupPage)
  },

  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page)
    await use(accountCreatedPage)
  },

  deleteAccountPage: async ({ page }, use) => {
    const deleteAccountPage = new DeleteAccountPage(page)
    await use(deleteAccountPage)
  },

  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page)
    await use(contactUsPage)
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page)
    await use(productsPage)
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page)
    await use(productDetailPage)
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page)
    await use(cartPage)
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page)
    await use(checkoutPage)
  },

  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page)
    await use(paymentPage)
  },

  paymentDonePage: async ({ page }, use) => {
    const paymentDonePage = new PaymentDonePage(page)
    await use(paymentDonePage)
  },

  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page)
    await use(categoryPage)
  },

  brandPage: async ({ page }, use) => {
    const brandPage = new BrandPage(page)
    await use(brandPage)
  },
})

export { test, expect }
