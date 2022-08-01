import { Product } from '../../interfaces'
import { createEventsListenerInstance } from './index'

const dummyProduct: Product = {
  id: '1',
  name: 'Product',
  slug: '/product',
  cover: null,
  price: 1,
  price_max: 11,
  price_min: 1,
  vat_rate: 1,
  price_max_initial: 1,
  price_min_initial: 1,
  shipping_time: null,
  shipping_date: null,
  quantity_step: 1,
  google_product_category: null,
  tags: [],
  public: true,
  visible: false,
  available: true,
  description_html: '',
  description_short: '',
  sales: [],
  schemas: [],
  gallery: [],
  sets: [],
  seo: null,
  items: [],
  order: 1,
  quantity: 1,
  availability: [],
  attributes: [],
  has_schemas: false,
  metadata: {},
}

describe('events listener service', () => {
  it('should add event callback and emit it', async () => {
    console.log = jest.fn()
    const service = createEventsListenerInstance()

    service.on('addToCart', () => {
      console.log('add to cart event')
    })
    service.emit('addToCart', dummyProduct)

    expect(console.log).toHaveBeenCalledWith('add to cart event')
  })
})
