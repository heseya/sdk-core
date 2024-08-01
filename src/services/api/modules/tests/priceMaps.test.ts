import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'
import { HeseyaPaginatedResponse, Language, PriceMapPrice } from '../../../../interfaces'

import { createPriceMapsService } from '../priceMaps'
import { normalizePagination } from '../../utils/normalizePagination'

const dummyPriceResponse: HeseyaPaginatedResponse<PriceMapPrice[]> = {
  data: [
    {
      product_id: 'id',
      product_name: 'Product name',
      product_price: '122',
      schema_options: [
        {
          schema_id: 'id',
          schema_option_id: 'id',
          schema_name: 'Schema name',
          schema_option_name: 'Option name',
          schema_option_price: '1222',
        },
      ],
    },
  ],
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
    language: undefined as unknown as Language,
  },
}

const priceMapId = '1'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('price maps test service', () => {
  it('should return product prices for a map', async () => {
    const service = createPriceMapsService(axios)
    const expectedUrl = `/price-maps/id:${priceMapId}/prices?search=test-query`

    mock.onGet(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.getPrices(priceMapId, {
      search: 'test-query',
    })
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({
      data: dummyPriceResponse.data,
      pagination: normalizePagination(dummyPriceResponse.meta),
    })
  })

  it('should update product prices for a map', async () => {
    const service = createPriceMapsService(axios)
    const expectedUrl = `/price-maps/id:${priceMapId}/prices`

    mock.onPatch(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.updatePrices(priceMapId, {
      products: [],
      schema_options: [],
    })
    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyPriceResponse.data)
  })
})
