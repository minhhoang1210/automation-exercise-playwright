import { test, expect } from '@fixtures/baseFixture'
import {
  searchProduct,
  categories,
  brands,
  reviewDetails,
} from '@resources/data'
import { expectAllToBeVisible } from '@utils/helpers'

test('TC_PROD_1: Verify products list is displayed', async ({
  homePage,
  productsPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.productsText).toBeVisible()
  await expect(productsPage.firstProduct).toBeVisible()
})

test('TC_PROD_2: Verify product detail page', async ({
  homePage,
  productsPage,
  productDetailPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.productsText).toBeVisible()
  await productsPage.goToFirstProduct()
  await expectAllToBeVisible(productDetailPage.getProductDetails())
})

test('TC_PROD_3: Search product', async ({ homePage, productsPage }) => {
  await homePage.header.goToProducts()

  await expect(productsPage.productsText).toBeVisible()
  await productsPage.searchProduct(searchProduct)

  await expect(productsPage.searchProductsText).toBeVisible()
  await productsPage.searchProduct(searchProduct)
  expect(await productsPage.verifyRelatedSearchProduct(searchProduct)).toBe(
    true
  )
})

test('TC_PROD_4: View category products', async ({
  homePage,
  productsPage,
  categoryPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.categorySection).toBeVisible()
  for (const category of categories) {
    await productsPage.goToCategory(category.category, category.subCategory)
    await expect(
      categoryPage.getCategoryText(category.category, category.subCategory)
    ).toBeVisible()
  }
})

test('TC_PROD_5: View brand products', async ({
  homePage,
  productsPage,
  brandPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.brandSection).toBeVisible()
  for (const brand of brands) {
    await productsPage.goToBrand(brand)
    await expect(brandPage.getBrandText(brand)).toBeVisible()
  }
})

test('TC_PROD_6: Add review on a product', async ({
  homePage,
  productsPage,
  productDetailPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.productsText).toBeVisible()
  await productsPage.goToFirstProduct()

  await expect(productDetailPage.reviewText).toBeVisible()
  await productDetailPage.addReview(reviewDetails)
  await expect(productDetailPage.reviewThankYouText).toBeVisible()
})
