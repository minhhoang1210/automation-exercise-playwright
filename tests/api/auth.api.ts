import { test, expect } from '@playwright/test'
import { makeApiRequest, generateEmail } from '@utils/helpers'
import { accountLogin, accountSignup } from '@resources/data'

test.describe.configure({ mode: 'serial' })

// Shared payload for user account creation and update
const userPayload = {
  name: accountSignup.name,
  email: accountSignup.email,
  password: accountSignup.password,
  title: accountSignup.title,
  birth_date: accountSignup.day,
  birth_month: accountSignup.month,
  birth_year: accountSignup.year,
  firstname: accountSignup.firstName,
  lastname: accountSignup.lastName,
  company: accountSignup.company,
  address1: accountSignup.address,
  address2: accountSignup.address2,
  country: accountSignup.country,
  zipcode: accountSignup.zipcode,
  state: accountSignup.state,
  city: accountSignup.city,
  mobile_number: accountSignup.mobileNumber,
}

/**
 * TC_API_AUTH_1: POST to verify login with valid details
 * Description: Verify successful login using valid credentials.
 * 
 * Steps:
 * 1. Send a POST request to /verifyLogin with valid email and password.
 * 2. Verify status code and success message.
 * 
 * Expected Result:
 * - Status code is 200.
 * - Message: 'User exists!'
 */
test('TC_API_AUTH_1: POST to verify login with valid details', async ({
  request,
}) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/verifyLogin',
    method: 'POST',
    body: {
      email: accountLogin.email,
      password: accountLogin.password,
    },
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('message', 'User exists!')
})

/**
 * TC_API_AUTH_2: POST to verify login without email parameter
 * Description: Verify error response when email parameter is missing.
 * 
 * Steps:
 * 1. Send a POST request to /verifyLogin without email parameter.
 * 2. Verify status code and error message.
 * 
 * Expected Result:
 * - Status code is 400.
 * - Message: 'Bad request, email or password parameter is missing in POST request.'
 */
test('TC_API_AUTH_2: POST to verify login without email parameter', async ({
  request,
}) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/verifyLogin',
    method: 'POST',
    body: {
      password: accountLogin.password,
    },
  })

  expect(response.responseCode).toBe(400)

  expect(response).toHaveProperty(
    'message',
    'Bad request, email or password parameter is missing in POST request.'
  )
})

/**
 * TC_API_AUTH_3: DELETE to verify login
 * Description: Verify error response when using DELETE method on /verifyLogin.
 * 
 * Steps:
 * 1. Send a DELETE request to /verifyLogin.
 * 2. Verify status code and error message.
 * 
 * Expected Result:
 * - Status code is 405.
 * - Message: 'This request method is not supported.'
 */
test('TC_API_AUTH_3: DELETE to verify login', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/verifyLogin',
    method: 'DELETE',
  })

  expect(response.responseCode).toBe(405)

  expect(response).toHaveProperty(
    'message',
    'This request method is not supported.'
  )
})

/**
 * TC_API_AUTH_4: POST to verify login with invalid details
 * Description: Verify error response when login using invalid credentials.
 * 
 * Steps:
 * 1. Send a POST request to /verifyLogin with invalid email and password.
 * 2. Verify status code and error message.
 * 
 * Expected Result:
 * - Status code is 404.
 * - Message: 'User not found!'
 */
test('TC_API_AUTH_4: POST to verify login with invalid details', async ({
  request,
}) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/verifyLogin',
    method: 'POST',
    body: {
      email: accountLogin.wrongEmail,
      password: accountLogin.wrongPassword,
    },
  })

  expect(response.responseCode).toBe(404)

  expect(response).toHaveProperty('message', 'User not found!')
})

/**
 * TC_API_AUTH_5: POST to register user account
 * Description: Verify successful registration of a new user account.
 * 
 * Steps:
 * 1. Send a POST request to /createAccount with user details.
 * 2. Verify status code and success message.
 * 
 * Expected Result:
 * - Status code is 201.
 * - Message: 'User created!'
 */
test('TC_API_AUTH_5: POST to register user account', async ({
  request,
}, testInfo) => {
  accountSignup.email = generateEmail(testInfo)

  const response = await makeApiRequest({
    request,
    endpoint: '/createAccount',
    method: 'POST',
    body: { ...userPayload, email: accountSignup.email },
  })

  expect(response.responseCode).toBe(201)

  expect(response).toHaveProperty('message', 'User created!')
})

/**
 * TC_API_AUTH_6: PUT to update user account
 * Description: Verify updating an existing user account.
 * 
 * Steps:
 * 1. Send a PUT request to /createAccount with user details.
 * 2. Verify status code and success message.
 * 
 * Expected Result:
 * - Status code is 200
 * - Message: 'User updated!'
 */
test('TC_API_AUTH_6: PUT to update user account', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/updateAccount',
    method: 'PUT',
    body: { ...userPayload },
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('message', 'User updated!')
})

/**
 * TC_API_AUTH_7: GET account detail by email
 * Description: Verify fetching user account details by email.
 * 
 * Steps:
 * 1. Send GET request to /getUserDetailByEmail with user's email.
 * 2. Verify status code and response structure.
 * 
 * Expected Result:
 * - Response code is 200.
 * - Response has 'user' property with user details.
 */
test('TC_API_AUTH_7: GET account detail by email', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/getUserDetailByEmail',
    method: 'GET',
    body: {
      email: accountSignup.email,
    },
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('user')
})

/**
 * TC_API_AUTH_8: DELETE to delete user account
 * Description: Verify deleting a user account.
 * 
 * Steps:
 * 1. Send a DELETE request to /deleteAccount with user's email and password.
 * 2. Verify status code and success message.
 * 
 * Expected Result:
 * - Status code is 200.
 * - Message: 'Account deleted!'
 */
test('TC_API_AUTH_8: DELETE to delete user account', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/deleteAccount',
    method: 'DELETE',
    body: {
      email: accountSignup.email,
      password: accountSignup.password,
    },
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('message', 'Account deleted!')
})
