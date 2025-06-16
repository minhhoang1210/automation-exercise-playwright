import { expect, Locator, TestInfo } from '@playwright/test'
import { APIRequest } from '@models/APIRequest'

/**
 * A fixture that creates page instances for page objects.
 *
 * @param PageClass - The class representing the page.
 * @param init - Optional async initialization logic (e.g., navigation, validation).
 * @returns A fixture that creates the page instance.
 */
function createPage<PageType>(
  PageClass: new (page: any) => PageType,
  init?: (pageInstance: PageType) => Promise<void>
) {
  return async function (
    { page },
    use: (pageInstance: PageType) => Promise<void>
  ) {
    const instance = new PageClass(page)
    if (init) await init(instance)
    await use(instance)
  }
}

/**
 * Generates a unique email address using the browser name and a timestamp.
 *
 * @param testInfo - Information about the current test, including the browser name.
 * @returns A unique email address.
 */
function generateEmail(testInfo: TestInfo) {
  const browserName = testInfo.project.name
  const timestamp = Date.now()
  return `${browserName}_${timestamp}@example.com`
}

/**
 * Expects all locators to be visible.
 *
 * @param elements - An array of Locator objects.
 * @returns A promise that resolves when all elements have been asserted as visible.
 */
async function expectAllToBeVisible(elements: Locator[]) {
  for (const element of elements) {
    await expect(element).toBeVisible()
  }
}

/**
 * Makes an API request using the provided configuration and returns the parsed JSON response.
 *
 * @param apiRequest - The API request configuration including request context, endpoint, method and body.
 * @returns A promise that resolves to the JSON response from the API.
 */
async function makeApiRequest(apiRequest: APIRequest) {
  const { request, endpoint, method, body } = apiRequest

  const formData = new FormData()
  for (const key in body) {
    formData.append(key, body[key])
  }

  const options: any = { method }
  if (body) {
    options.params = body
    options.form = formData
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  const response = await request.fetch(
    `${process.env.BASE_URL}/api${endpoint}`,
    options
  )
  return await response.json()
}

export { createPage, generateEmail, expectAllToBeVisible, makeApiRequest }
