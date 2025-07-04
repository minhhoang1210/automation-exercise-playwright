const accountSignup = {
  name: 'John',
  email: 'JohnDoeTest123@example.com',
  title: 'Mr.',
  password: 'test',
  day: '1',
  month: '1',
  year: '2000',
  newsletter: true,
  specialOffers: true,
  firstName: 'John',
  lastName: 'Doe',
  company: 'test',
  address: 'test',
  address2: 'test',
  country: 'United States',
  state: 'test',
  city: 'test',
  zipcode: '100000',
  mobileNumber: '0123456789',
}

const accountLogin = {
  email: 'JohnDoeTest123@example.com',
  password: 'test',
  wrongEmail: 'wrongemail@example.com',
  wrongPassword: 'wrongpassword',
}

const contactUsMessage = {
  name: 'John',
  email: 'JohnDoeTest123@example.com',
  subject: 'test',
  message: 'test',
  filePath: '../../resources/contactUsFile.txt',
}

const searchProduct = 'Blue'

const productQuantity = 4

const commentOrder = 'test'

const cardDetails = {
  name: 'John',
  number: '123',
  cvc: '123',
  month: '1',
  year: '2000',
}

const categories = [
  {
    category: 'Women',
    subCategory: 'Dress',
  },
  {
    category: 'Men',
    subCategory: 'Tshirts',
  },
]

const brands = ['Polo', 'H&M']

const reviewDetails = {
  name: 'John',
  email: 'JohnDoeTest123@example.com',
  content: 'test',
}

export {
  accountSignup,
  accountLogin,
  contactUsMessage,
  searchProduct,
  productQuantity,
  commentOrder,
  cardDetails,
  categories,
  brands,
  reviewDetails,
}
