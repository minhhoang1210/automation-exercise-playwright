import { test, expect } from '@playwright/test'
import { makeApiRequest } from '@utils/helpers'
import { searchProduct } from '@resources/data'

/**
 * TC_API_PROD_1: GET all products list
 * Description: Verify response returns a list of products.
 *
 * Steps:
 * 1. Send a GET request to /productsList.
 * 2. Verify status code and response structure.
 *
 * Expected Result:
 * - Response code is 200.
 * - Response has 'products' property with an array of products.
 */
test('TC_API_PROD_1: GET all products list', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/productsList',
    method: 'GET',
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('products')
  expect(Array.isArray(response.products)).toBe(true)
})

/**
 * TC_API_PROD_2: POST to all products list
 * Description: Verify error response when using POST method on /productsList.
 *
 * Steps:
 * 1. Send a POST request to /productsList.
 * 2. Verify status code and error message.
 *
 * Expected Result:
 * - Response code is 405.
 * - Message: 'This request method is not supported.'
 */
test('TC_API_PROD_2: POST to all products list', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/productsList',
    method: 'POST',
  })

  expect(response.responseCode).toBe(405)

  expect(response).toHaveProperty(
    'message',
    'This request method is not supported.'
  )
})

/**
 * TC_API_PROD_3: GET all brands list
 * Description: Verify response returns a list of brands.
 *
 * Steps:
 * 1. Send a GET request to /brandsList.
 * 2. Verify status code and response structure.
 *
 * Expected Result:
 * - Response code is 200.
 * - Response has 'brands' property with an array of brands.
 */
test('TC_API_PROD_3: GET all brands list', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/brandsList',
    method: 'GET',
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('brands')
  expect(Array.isArray(response.brands)).toBe(true)
})

/**
 * TC_API_PROD_4: PUT to all brands list
 * Description: Verify error response when using PUT method on /brandsList.
 *
 * Steps:
 * 1. Send a PUT request to /brandsList.
 * 2. Verify status code and error message.
 *
 * Expected Result:
 * - Response code is 405.
 * - Message: 'This request method is not supported.'
 */
test('TC_API_PROD_4: PUT to all brands list', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/brandsList',
    method: 'PUT',
  })

  expect(response.responseCode).toBe(405)

  expect(response).toHaveProperty(
    'message',
    'This request method is not supported.'
  )
})

/**
 * TC_API_PROD_5: POST to search products
 * Description: Verify response returns products matching the search keyword.
 *
 * Steps:
 * 1. Send a POST request to /searchProduct with search_product parameter.
 * 2. Verify status code and response structure.
 *
 * Expected Result:
 * - Response code is 200.
 * - Response has 'products' property with products matching the search keyword.
 */
test('TC_API_PROD_5: POST to search products', async ({ request }) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/searchProduct',
    method: 'POST',
    body: { search_product: searchProduct },
  })

  expect(response.responseCode).toBe(200)

  expect(response).toHaveProperty('products')
  expect(Array.isArray(response.products)).toBe(true)

  response.products.forEach((product: any) => {
    expect(product.name.toLowerCase()).toContain(searchProduct.toLowerCase())
  })
})

/**
 * TC_API_PROD_6: POST to search products without search_product parameter
 * Description: Verify error response when search_product parameter is missing.
 *
 * Steps:
 * 1. Send a POST request to /searchProduct without search_product parameter.
 * 2. Verify status code and error message.
 *
 * Expected Result:
 * - Response code is 400.
 * - Message: 'Bad request, search_product parameter is missing in POST request.'
 */
test('TC_API_PROD_6: POST to search products without search_product parameter', async ({
  request,
}) => {
  const response = await makeApiRequest({
    request,
    endpoint: '/searchProduct',
    method: 'POST',
  })

  expect(response.responseCode).toBe(400)

  expect(response).toHaveProperty(
    'message',
    'Bad request, search_product parameter is missing in POST request.'
  )
})
