import { createHeseyaEventListenerService } from './index'
import { Product } from '../../interfaces'
import { HeseyaEventType } from './index'

const dummyProduct = {
  id: '1',
  name: 'Product',
  slug: '/product',
} as Product

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

    service.on(HeseyaEventType.addToCart, dummyFunction)
    service.emit(HeseyaEventType.addToCart, dummyProduct)

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('dummy output')
  })

  it('should unsubscribe second event callback', async () => {
    const service = createHeseyaEventListenerService()

    service.on(HeseyaEventType.addToCart, dummyFunction)
    service.on(HeseyaEventType.addToCart, dummySecondFunction)
    service.unsubscribe(HeseyaEventType.addToCart, dummyFunction)

    service.emit(HeseyaEventType.addToCart, dummyProduct)

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('dummy second output')
  })
})
