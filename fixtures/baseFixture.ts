import { test as base, expect } from '@playwright/test'
import { createPage } from '@utils/helpers'
import {
  HomePage,
  SignupLoginPage,
  SignupPage,
  AccountCreatedPage,
  DeleteAccountPage,
  ContactUsPage,
  ProductsPage,
  ProductDetailPage,
  CategoryPage,
  BrandPage,
  CartPage,
  CheckoutPage,
  PaymentPage,
  PaymentDonePage,
} from '@pages/index'

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
  homePage: createPage(HomePage, async (homePage) => {
    await homePage.goTo()
    await expect(homePage.page).toHaveTitle('Automation Exercise')
  }),
  signupLoginPage: createPage(SignupLoginPage),
  signupPage: createPage(SignupPage),
  accountCreatedPage: createPage(AccountCreatedPage),
  deleteAccountPage: createPage(DeleteAccountPage),
  contactUsPage: createPage(ContactUsPage),
  productsPage: createPage(ProductsPage),
  productDetailPage: createPage(ProductDetailPage),
  cartPage: createPage(CartPage),
  checkoutPage: createPage(CheckoutPage),
  paymentPage: createPage(PaymentPage),
  paymentDonePage: createPage(PaymentDonePage),
  categoryPage: createPage(CategoryPage),
  brandPage: createPage(BrandPage),
})

export { test, expect }
