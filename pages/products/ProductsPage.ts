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

  getCategoryLink(category: string) {
    return this.page.locator(`a[href="#${category}"]`)
  }

  getSubCategoryLink(subCategory: string) {
    return this.page.getByRole('link', { name: subCategory })
  }

  getBrandLink(brand: string) {
    return this.page.getByRole('link', { name: brand })
  }

  async goToFirstProduct() {
    await this.viewFirstProductButton.click()
  }

  async searchProduct(searchProduct: string) {
    await this.searchInput.fill(searchProduct)
    await this.searchButton.click()
  }

  async verifyRelatedSearchProduct(searchProduct: string) {
    const products = await this.searchProductsList.allTextContents()
    return products.every((product) =>
      product.toLowerCase().includes(searchProduct.toLowerCase())
    )
  }

  async getProductNames() {
    const first = (await this.firstProductName.textContent()) ?? ''
    const second = (await this.secondProductName.textContent()) ?? ''
    return [first, second]
  }

  async addFirstProductToCart() {
    await this.firstProduct.scrollIntoViewIfNeeded()
    await this.firstProduct.hover()
    await this.addFirstProductButton.scrollIntoViewIfNeeded()
    await this.firstProduct.hover()
    await this.addFirstProductButton.click()
    await this.continueShoppingButton.click()
  }

  async addFirstTwoProductsToCart() {
    await this.addFirstProductToCart()

    await this.secondProduct.scrollIntoViewIfNeeded()
    await this.secondProduct.hover()
    await this.addSecondProductButton.scrollIntoViewIfNeeded()
    await this.secondProduct.hover()
    await this.addSecondProductButton.click()
    await this.viewCartLink.click()
  }

  async goToCategory(category: string, subCategory: string) {
    await this.getCategoryLink(category).click()
    await this.getSubCategoryLink(subCategory).click()
  }

  async goToBrand(brand: string) {
    await this.getBrandLink(brand).click()
  }
}
