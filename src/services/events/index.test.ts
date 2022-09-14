import { createHeseyaEventBusService } from './index'

import { HeseyaEvent } from './index'
import { CartItem } from '../../models'

const dummyCartItem = {} as unknown as CartItem

describe('events listener service', () => {
  it('should add event callback and emit it', async () => {
    const fooCallback = jest.fn()

    const service = createHeseyaEventBusService()

    service.on(HeseyaEvent.AddToCart, fooCallback)
    service.emit(HeseyaEvent.AddToCart, dummyCartItem)

    expect(fooCallback).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe second event callback', async () => {
    const fooCallback = jest.fn()
    const barCallback = jest.fn()

    const service = createHeseyaEventBusService()

    service.on(HeseyaEvent.AddToCart, fooCallback)
    service.on(HeseyaEvent.AddToCart, barCallback)
    service.unsubscribe(HeseyaEvent.AddToCart, fooCallback)

    service.emit(HeseyaEvent.AddToCart, dummyCartItem)

    expect(barCallback).toHaveBeenCalledTimes(1)
    expect(fooCallback).toHaveBeenCalledTimes(0)
  })
})
