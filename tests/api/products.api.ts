import { test, expect } from '@playwright/test'
import { makeApiRequest } from '@utils/helpers'
import { searchProduct } from '@resources/data'

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
