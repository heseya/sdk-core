import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'
import { HeseyaResponse, Language, PriceMapProductPrice } from '../../../../interfaces'

import { createProductsService } from '../products'

const dummyPriceResponse: HeseyaResponse<PriceMapProductPrice[]> = {
  data: [
    {
      price_map_id: 'id',
      price_map_name: 'Map name',
      is_net: false,
      currency: 'PLN',
      price: '222',
    },
  ],
  meta: {
    language: undefined as unknown as Language,
  },
}

const productId = '1'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('product test service', () => {
  it('should return product prices for all maps', async () => {
    const service = createProductsService(axios)
    const expectedUrl = `/products/id:${productId}/prices`

    mock.onGet(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.getPrices(productId)
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyPriceResponse.data)
  })

  it('should update schema prices for all maps', async () => {
    const service = createProductsService(axios)
    const expectedUrl = `/products/id:${productId}/prices`

    mock.onPatch(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.updatePrices(productId, [
      {
        price_map_id: 'id',
        price: '222',
      },
    ])
    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyPriceResponse.data)
  })
})
