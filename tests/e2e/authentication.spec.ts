import { test, expect } from '@fixtures/baseFixture'
import { accountSignup, accountLogin } from '@resources/data'
import { generateEmail } from '@utils/helpers'

test.describe.configure({ mode: 'serial' })

test('TC_AUTH_1: Register user', async ({
  homePage,
  signupLoginPage,
  signupPage,
  accountCreatedPage,
}, testInfo) => {
  accountSignup.email = generateEmail(testInfo)

  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.signupText).toBeVisible()
  await signupLoginPage.signup(accountSignup.name, accountSignup.email)

  await expect(signupPage.signupText).toBeVisible()
  await signupPage.signup(accountSignup)

  await expect(accountCreatedPage.accountCreatedText).toBeVisible()
  await accountCreatedPage.continueButton.click()

  await expect(homePage.header.loggedInText).toBeVisible()
})

test('TC_AUTH_2: Register user with existing email', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.signupText).toBeVisible()
  await signupLoginPage.signup(accountSignup.name, accountSignup.email)
  await expect(signupLoginPage.signupErrorMessage).toBeVisible()
})

test('TC_AUTH_3: Login user with correct email and password', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await expect(homePage.header.loggedInText).toBeVisible()
})

test('TC_AUTH_4: Login user with incorrect email', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.wrongEmail, accountLogin.password)
  await expect(signupLoginPage.loginErrorMessage).toBeVisible()
})

test('TC_AUTH_5: Login user with incorrect password', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.wrongPassword)
  await expect(signupLoginPage.loginErrorMessage).toBeVisible()
})

test('TC_AUTH_6: Logout user', async ({ homePage, signupLoginPage }) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.goToLogout()

  await expect(signupLoginPage.page).toHaveURL(`${process.env.BASE_URL}/login`)
})

test('TC_AUTH_7: Delete user', async ({
  homePage,
  signupLoginPage,
  deleteAccountPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountSignup.email, accountSignup.password)

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.deleteAccountButton.click()

  await expect(deleteAccountPage.accountDeletedText).toBeVisible()
  await deleteAccountPage.continueButton.click()
})
