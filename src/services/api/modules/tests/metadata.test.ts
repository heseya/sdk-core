import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaResponse } from '../../../../interfaces'
import { Metadata, MetadataUpdateDto } from '../../../../interfaces/Metadata'
import { createEntityMetadataService } from '../metadata'

const dummyMetadataDto: MetadataUpdateDto = { test: 'test', remove: null }

const dummyMetadataResponse: HeseyaResponse<Metadata> = {
  data: {
    test: 'test',
  },
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

describe('metadata service test', () => {
  it('should make a request to save public metadata', async () => {
    const service = createEntityMetadataService(axios, 'products')
    const expectedUrl = '/products/id:test-id/metadata'

    mock.onPatch(expectedUrl).reply(200, dummyMetadataResponse)

    const result = await service.updateMetadata('test-id', dummyMetadataDto)

    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyMetadataResponse.data)
  })

  it('should make a request to save private metadata', async () => {
    const service = createEntityMetadataService(axios, 'products')
    const expectedUrl = '/products/id:test-id/metadata-private'

    mock.onPatch(expectedUrl).reply(200, dummyMetadataResponse)

    const result = await service.updateMetadataPrivate('test-id', dummyMetadataDto)

    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyMetadataResponse.data)
  })
})
