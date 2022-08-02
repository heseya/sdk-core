import { createHeseyaEventListenerService } from './index'
import { Product } from '../../interfaces'
import { EventType } from './index'

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

const dummyFunction = () => {
  // eslint-disable-next-line no-console
  console.log('dummy output')
}

const dummySecondFunction = () => {
  // eslint-disable-next-line no-console
  console.log('dummy second output')
}

describe('events listener service', () => {
  // eslint-disable-next-line no-console
  console.log = jest.fn()

  it('should add event callback and emit it', async () => {
    const service = createHeseyaEventListenerService()

    service.on(EventType.addToCart, dummyFunction)
    service.emit(EventType.addToCart, dummyProduct)

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('dummy output')
  })

  it('should unsubscribe second event callback', async () => {
    const service = createHeseyaEventListenerService()

    service.on(EventType.addToCart, dummyFunction)
    service.on(EventType.addToCart, dummySecondFunction)
    service.unsubscribe(EventType.addToCart, dummyFunction)

    service.emit(EventType.addToCart, dummyProduct)

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('dummy second output')
  })
})
