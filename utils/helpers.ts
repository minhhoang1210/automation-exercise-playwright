import { expect, Locator, TestInfo } from '@playwright/test'

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

export { generateEmail, expectAllToBeVisible }
