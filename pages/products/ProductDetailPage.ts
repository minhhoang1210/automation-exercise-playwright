import { Page, Locator } from '@playwright/test'
import { Review } from '@models/Review'

export class ProductDetailPage {
  readonly page: Page

  readonly name: Locator
  readonly category: Locator
  readonly price: Locator
  readonly availability: Locator
  readonly condition: Locator
  readonly brand: Locator

  readonly quantity: Locator
  readonly addToCartButton: Locator
  readonly viewCartLink: Locator

  readonly reviewText: Locator
  readonly reviewName: Locator
  readonly reviewEmail: Locator
  readonly reviewContent: Locator
  readonly reviewSubmitButton: Locator
  readonly reviewThankYouText: Locator

  constructor(page: Page) {
    this.page = page

    this.name = page.locator('.product-details').getByRole('heading')
    this.category = page.locator('p', { hasText: 'Category' })
    this.price = page.getByText('Rs.')
    this.availability = page.getByText('Availability:')
    this.condition = page.getByText('Condition:')
    this.brand = page.getByText('Brand:')

    this.quantity = page.locator('#quantity')
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' })
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' })

    this.reviewText = page.getByRole('link', { name: 'Write Your Review' })
    this.reviewName = page.getByRole('textbox', { name: 'Your Name' })
    this.reviewEmail = page.getByRole('textbox', {
      name: 'Email Address',
      exact: true,
    })
    this.reviewContent = page.getByRole('textbox', { name: 'Add Review Here!' })
    this.reviewSubmitButton = page.getByRole('button', { name: 'Submit' })
    this.reviewThankYouText = page.getByText('Thank you for your review.')
  }

  getProductDetails(): Locator[] {
    return [
      this.name,
      this.category,
      this.price,
      this.availability,
      this.condition,
      this.brand,
    ]
  }

  async addProductToCart(quantity: number = 1) {
    await this.quantity.fill(quantity.toString())
    await this.addToCartButton.click()
    await this.viewCartLink.click()
  }

  async addReview(reviewDetails: Review) {
    const { name, email, content } = reviewDetails

    await this.reviewName.fill(name)
    await this.reviewEmail.fill(email)
    await this.reviewContent.fill(content)
    await this.reviewSubmitButton.click()
  }
}
