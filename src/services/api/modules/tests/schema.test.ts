import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'
import { HeseyaResponse, Language, PriceMapSchemaPrice } from '../../../../interfaces'

import { createSchemasService } from '../schema'

const dummyPriceResponse: HeseyaResponse<PriceMapSchemaPrice[]> = {
  data: [
    {
      price_map_id: 'id',
      price_map_name: 'Price map',
      currency: 'PLN',
      is_net: false,
      options: [
        {
          id: 'id',
          price: '122',
        },
      ],
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

describe('schema test service', () => {
  it('should return schema prices for all maps', async () => {
    const service = createSchemasService(axios)
    const expectedUrl = `/schemas/id:${productId}/prices`

    mock.onGet(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.getPrices(productId)
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyPriceResponse.data)
  })

  it('should update schema prices for all maps', async () => {
    const service = createSchemasService(axios)
    const expectedUrl = `/schemas/id:${productId}/prices`

    mock.onPatch(expectedUrl).reply(200, dummyPriceResponse)

    const result = await service.updatePrices(productId, [
      {
        price_map_id: 'id',
        options: [],
      },
    ])
    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyPriceResponse.data)
  })
})
