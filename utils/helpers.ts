import { expect, Locator, TestInfo } from '@playwright/test'
import { APIRequest } from '@models/APIRequest'

function generateEmail(testInfo: TestInfo) {
  const browserName = testInfo.project.name
  const timestamp = Date.now()
  return `${browserName}_${timestamp}@example.com`
}

async function expectAllToBeVisible(elements: Locator[]) {
  for (const element of elements) {
    await expect(element).toBeVisible()
  }
}

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

export { generateEmail, expectAllToBeVisible, makeApiRequest }
