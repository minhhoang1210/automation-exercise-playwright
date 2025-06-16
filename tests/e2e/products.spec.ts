import { test, expect } from '@fixtures/baseFixture'
import {
  searchProduct,
  categories,
  brands,
  reviewDetails,
} from '@resources/data'
import { expectAllToBeVisible } from '@utils/helpers'

/**
 * TC_PROD_1: Verify products list is displayed
 * Description: Verify products list is displayed on Products page.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Verify products list is visible.
 *
 * Expected Result: Products list is visible.
 */
test('TC_PROD_1: Verify products list is displayed', async ({
  homePage,
  productsPage,
}) => {
  await homePage.header.goToProducts()

  await expect(productsPage.productsText).toBeVisible()
  await expect(productsPage.firstProduct).toBeVisible()
})

/**
 * TC_PROD_2: Verify product detail page
 * Description: Verify product detail page displays product information.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Navigate to the first product's Detail page.
 * 3. Verify product details are visible.
 *
 * Expected Result: All product details are visible.
 */
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

/**
 * TC_PROD_3: Search product
 * Description: Verify product search functionality.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Enter a keyword in the search bar.
 * 3. Verify the results match the keyword.
 *
 * Expected Result: Search results match the keyword.
 */
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

/**
 * TC_PROD_4: View category products
 * Description: Verify products can be viewed by category.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Click on a category and subcategory.
 * 3. Verify the category page displays the correct products.
 *
 * Expected Result: Category products are displayed correctly.
 */
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

/**
 * TC_PROD_5: View brand products
 * Description: Verify products can be viewed by brand.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Click on a brand.
 * 3. Verify the brand page displays the correct products.
 *
 * Expected Result: Brand products are displayed correctly.
 */
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

/**
 * TC_PROD_6: Add review on a product
 * Description: Verify a user can add a review on a product.
 *
 * Steps:
 * 1. Navigate to Products page.
 * 2. Navigate to the first product's Detail page.
 * 3. Add a review and verify the success message.
 *
 * Expected Result: Review is added successfully and thank you message is displayed.
 */
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
