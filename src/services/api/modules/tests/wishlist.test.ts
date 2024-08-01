import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'

import { createWishlistService } from '../wishlist'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('wishlist test service', () => {
  it('should check if product is in user wishlist', async () => {
    const service = createWishlistService(axios)
    const expectedUrl = `/wishlist/check?product_ids[]=uuid`

    mock.onGet(expectedUrl).reply(200, { data: { products_in_wishlist: ['uuid'] } })

    const result = await service.check(['uuid'])
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(['uuid'])
  })

  it('should clear entire user wishlist', async () => {
    const service = createWishlistService(axios)
    const expectedUrl = `/wishlist?`

    mock.onDelete(expectedUrl).reply(201)

    const result = await service.clear()
    expect(mock.history.delete[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
