import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { ProductPrice, HeseyaResponse } from '../../../../interfaces'
import { createPricesService } from '../prices'
import { META_LANGUAGE } from '../../../../../test/mock/responseMeta'

const dummyResponse: HeseyaResponse<ProductPrice[]> = {
  data: [
    {
      id: '1',
      prices_min: [
        {
          net: '10',
          gross: '10',
          currency: 'PLN',
        },
      ],
      prices_max: [
        {
          net: '10',
          gross: '10',
          currency: 'PLN',
        },
      ],
    },
  ],
  meta: {
    language: META_LANGUAGE,
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
