import { createHeseyaEventListenerService } from './index'
import { Product } from '../../interfaces'
import { HeseyaEventType } from './index'

const dummyProduct = {
  id: '1',
  name: 'Product',
  slug: '/product',
} as Product

describe('events listener service', () => {
  it('should add event callback and emit it', async () => {
    const fooCallback = jest.fn()

    const service = createHeseyaEventListenerService()

    service.on(HeseyaEventType.AddToCart, fooCallback)
    service.emit(HeseyaEventType.AddToCart, dummyProduct)

    expect(fooCallback).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe second event callback', async () => {
    const fooCallback = jest.fn()
    const barCallback = jest.fn()

    const service = createHeseyaEventListenerService()

    service.on(HeseyaEventType.AddToCart, fooCallback)
    service.on(HeseyaEventType.AddToCart, barCallback)
    service.unsubscribe(HeseyaEventType.AddToCart, fooCallback)

    service.emit(HeseyaEventType.AddToCart, dummyProduct)

    expect(barCallback).toHaveBeenCalledTimes(1)
    expect(fooCallback).toHaveBeenCalledTimes(0)
  })
})
