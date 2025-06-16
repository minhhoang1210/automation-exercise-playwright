import { Page, Locator } from '@playwright/test'
import { Header } from '@pages/common/Header'

export class ProductsPage {
  readonly page: Page

  readonly header: Header

  readonly productsText: Locator

  readonly firstProduct: Locator
  readonly viewFirstProductButton: Locator
  readonly addFirstProductButton: Locator
  readonly firstProductName: Locator

  readonly secondProduct: Locator
  readonly addSecondProductButton: Locator
  readonly secondProductName: Locator

  readonly continueShoppingButton: Locator
  readonly viewCartLink: Locator

  readonly searchInput: Locator
  readonly searchButton: Locator
  readonly searchProductsText: Locator
  readonly searchProductsList: Locator

  readonly categorySection: Locator
  readonly brandSection: Locator

  constructor(page: Page) {
    this.page = page

    this.header = new Header(page)

    this.productsText = page.getByRole('heading', { name: 'All Products' })

    this.firstProduct = page.locator('.product-image-wrapper').first()
    this.viewFirstProductButton = this.firstProduct.locator(
      'a[href*="product_details"]'
    )
    this.addFirstProductButton = this.firstProduct.locator('.product-overlay a')
    this.firstProductName = this.firstProduct.locator('.product-overlay p')

    this.secondProduct = page.locator('.product-image-wrapper').nth(1)
    this.addSecondProductButton =
      this.secondProduct.locator('.product-overlay a')
    this.secondProductName = this.secondProduct.locator('.product-overlay p')

    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    })
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' })

    this.searchInput = page.getByRole('textbox', { name: 'Search Product' })
    this.searchButton = page.locator('#submit_search')
    this.searchProductsText = page.getByRole('heading', {
      name: 'Searched Products',
    })
    this.searchProductsList = page.locator('.productinfo p')

    this.categorySection = page.getByRole('heading', { name: 'Category' })
    this.brandSection = page.getByRole('heading', { name: 'Brands' })
  }

  /**
   * Returns a Locator for the specified category.
   *
   * @param category - The category name.
   * @returns Locator for the category link.
   */
  getCategoryLink(category: string) {
    return this.page.locator(`a[href="#${category}"]`)
  }

  /**
   * Returns a Locator for the specified subcategory.
   *
   * @param subCategory - The subcategory name.
   * @returns Locator for the subcategory link.
   */
  getSubCategoryLink(subCategory: string) {
    return this.page.getByRole('link', { name: subCategory })
  }

  /**
   * Returns a Locator for the specified brand.
   *
   * @param brand - The brand name.
   * @returns Locator for the brand link.
   */
  getBrandLink(brand: string) {
    return this.page.getByRole('link', { name: brand })
  }

  /**
   * Navigates to the first product's Detail page.
   */
  async goToFirstProduct() {
    await this.viewFirstProductButton.click()
  }

  /**
   * Performs a product search with the provided keyword.
   *
   * @param searchProduct - The keyword to search.
   */
  async searchProduct(searchProduct: string) {
    await this.searchInput.fill(searchProduct)
    await this.searchButton.click()
  }

  /**
   * Verifies all search result product names contain the provided keyword.
   *
   * @param searchProduct - The search keyword.
   * @returns True if all product names contain the keyword, otherwise false.
   */
  async verifyRelatedSearchProduct(searchProduct: string) {
    const products = await this.searchProductsList.allTextContents()
    return products.every((product) =>
      product.toLowerCase().includes(searchProduct.toLowerCase())
    )
  }

  /**
   * Retrieves the names of the first and second products.
   *
   * @returns A tuple of the first and second product names.
   */
  async getProductNames() {
    const first = (await this.firstProductName.textContent()) ?? ''
    const second = (await this.secondProductName.textContent()) ?? ''
    return [first, second]
  }

  /**
   * Adds the first product to the cart and continues shopping.
   */
  async addFirstProductToCart() {
    await this.firstProduct.scrollIntoViewIfNeeded()
    await this.firstProduct.hover()
    await this.addFirstProductButton.scrollIntoViewIfNeeded()
    await this.firstProduct.hover()
    await this.addFirstProductButton.click()
    await this.continueShoppingButton.click()
  }

  /**
   * Adds the first two products to the cart, then navigates to Cart page.
   */
  async addFirstTwoProductsToCart() {
    await this.addFirstProductToCart()

    await this.secondProduct.scrollIntoViewIfNeeded()
    await this.secondProduct.hover()
    await this.addSecondProductButton.scrollIntoViewIfNeeded()
    await this.secondProduct.hover()
    await this.addSecondProductButton.click()
    await this.viewCartLink.click()
  }

  /**
   * Navigates to a Category page of a subcategory under a specific category in the sidebar.
   *
   * @param category - The category name.
   * @param subCategory - The subcategory name.
   */
  async goToCategory(category: string, subCategory: string) {
    await this.getCategoryLink(category).click()
    await this.getSubCategoryLink(subCategory).click()
  }

  /**
   * Navigates to a Brand page in the sidebar.
   *
   * @param brand - The brand name.
   */
  async goToBrand(brand: string) {
    await this.getBrandLink(brand).click()
  }
}
