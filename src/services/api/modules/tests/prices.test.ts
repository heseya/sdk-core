import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { ProductPrice, HeseyaResponse } from '../../../../interfaces'
import { createPricesService } from '../prices'

const dummyResponse: HeseyaResponse<ProductPrice[]> = {
  data: [
    {
      id: '1',
      price_min: 10,
      price_max: 10,
    },
  ],
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('analytics service test', () => {
  it('should make a request to get payments summary', async () => {
    const service = createPricesService(axios)
    const expectedUrl = '/prices/products?ids[]=1&ids[]=2'

    mock.onGet(expectedUrl).reply(200, dummyResponse)

    const result = await service.getProductsPrices(['1', '2'])

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponse.data)
  })
})
