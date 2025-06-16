import { test, expect } from '@fixtures/baseFixture'
import { accountSignup, accountLogin } from '@resources/data'
import { generateEmail } from '@utils/helpers'

// Run in serial mode because the test flow depends on the same user account
test.describe.configure({ mode: 'serial' })

/**
 * TC_AUTH_1: Register user
 * Description: Registers a new user account.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Enter name and email for signup.
 * 3. Fill in the signup form with valid details.
 * 4. Confirm account creation success.
 * 
 * Expected Result: User account is created and user is logged in.
 */
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

/**
 * TC_AUTH_2: Register user with existing email
 * Description: Attempts to register using an already registered email.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Attempt to sign up with an existing email.
 * 
 * Expected Result: Error message is shown indicating the email already exists.
 */
test('TC_AUTH_2: Register user with existing email', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.signupText).toBeVisible()
  await signupLoginPage.signup(accountSignup.name, accountSignup.email)
  await expect(signupLoginPage.signupErrorMessage).toBeVisible()
})

/**
 * TC_AUTH_3: Login user with correct email and password
 * Description: Logs in using correct credentials.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Enter valid email and password for login.
 * 
 * Expected Result: User is logged in successfully.
 */
test('TC_AUTH_3: Login user with correct email and password', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await expect(homePage.header.loggedInText).toBeVisible()
})

/**
 * TC_AUTH_4: Login user with incorrect email
 * Description: Attempts to login with invalid email.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Enter invalid email and valid password for login.
 * 
 * Expected Result: Error message is shown indicating incorrect credentials.
 */
test('TC_AUTH_4: Login user with incorrect email', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.wrongEmail, accountLogin.password)
  await expect(signupLoginPage.loginErrorMessage).toBeVisible()
})

/**
 * TC_AUTH_5: Login user with incorrect password
 * Description: Attempts to login with invalid password.
 * 
 * Steps:
 * 1. Navigate to Signup/Login page.
 * 2. Enter valid email and invalid password for login.
 * 
 * Expected Result: Error message is shown indicating incorrect credentials.
 */
test('TC_AUTH_5: Login user with incorrect password', async ({
  homePage,
  signupLoginPage,
}) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.wrongPassword)
  await expect(signupLoginPage.loginErrorMessage).toBeVisible()
})

/**
 * TC_AUTH_6: Logout user
 * Description: Logs out a logged in user.
 * 
 * Steps:
 * 1. Login with valid credentials.
 * 2. Click Logout.
 * 
 * Expected Result: User is redirected to login page.
 */
test('TC_AUTH_6: Logout user', async ({ homePage, signupLoginPage }) => {
  await homePage.header.goToSignupLogin()

  await expect(signupLoginPage.loginText).toBeVisible()
  await signupLoginPage.login(accountLogin.email, accountLogin.password)

  await expect(homePage.header.loggedInText).toBeVisible()
  await homePage.header.goToLogout()

  await expect(signupLoginPage.page).toHaveURL(`${process.env.BASE_URL}/login`)
})

/**
 * TC_AUTH_7: Delete user
 * Description: Deletes an user account.
 * 
 * Steps:
 * 1. Login with valid credentials.
 * 2. Click Delete Account.
 * 
 * Expected Result: Account is deleted successfully.
 */
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
