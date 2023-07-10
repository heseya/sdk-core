import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {
  AttributeOption,
  AttributeOptionDto,
  HeseyaPaginatedResponse,
  ListResponse,
} from '../../../../interfaces'

import { createAttributesService } from '../attributes'

const dummyAttributes: HeseyaPaginatedResponse<AttributeOption[]> = {
  data: [
    {
      id: '1',
      name: 'Test option',
      index: 1,
      value_number: 0,
      value_date: null,
    },
  ],
  meta: {
    per_page: 24,
    current_page: 1,
    last_page: 2,
    total: 25,
    from: 1,
    to: 2,
    path: '/path',
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyAttributesResponse: ListResponse<AttributeOption> = {
  data: [
    {
      id: '1',
      name: 'Test option',
      index: 1,
      value_number: 0,
      value_date: null,
    },
  ],
  pagination: {
    perPage: 24,
    currentPage: 1,
    lastPage: 2,
    total: 25,
  },
}

const dummyOptionDto: AttributeOptionDto = {
  id: '1',
  name: 'Test option',
  value_number: 0,
  value_date: null,
}

const attributeId = dummyOptionDto.id || '1'
const optionId = dummyOptionDto.id || '1'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('attributes service test', () => {
  it('should make a request to get options', async () => {
    const service = createAttributesService(axios)
    const expectedUrl = `/attributes/id:${attributeId}/options?`

    mock.onGet(expectedUrl).reply(200, dummyAttributes)

    const result = await service.getOptions('1')
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAttributesResponse)
  })

  it('should make a request to add option', async () => {
    const service = createAttributesService(axios)
    const expectedUrl = `/attributes/id:${attributeId}/options`

    mock.onPost(expectedUrl).reply(200, dummyAttributes)

    const result = await service.addOption(attributeId, dummyOptionDto)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAttributesResponse.data)
  })

  it('should make a request to update option', async () => {
    const service = createAttributesService(axios)
    const expectedUrl = `/attributes/id:${attributeId}/options/id:${optionId}`

    mock.onPatch(expectedUrl).reply(200, dummyAttributes)

    const result = await service.updateOption(attributeId, optionId, dummyOptionDto)
    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAttributesResponse.data)
  })

  it('should make a request to delete option', async () => {
    const attributeId = dummyOptionDto.id || '1'
    const optionId = dummyOptionDto.id || '1'
    const service = createAttributesService(axios)
    const expectedUrl = `/attributes/id:${attributeId}/options/id:${optionId}`

    mock.onDelete(expectedUrl).reply(200, dummyAttributes)

    const result = await service.deleteOption(attributeId, optionId)
    expect(mock.history.delete[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to reorder options', async () => {
    const attributeId = dummyOptionDto.id || '1'
    const service = createAttributesService(axios)
    const expectedUrl = `/attributes/id:${attributeId}/options/reorder?`

    mock.onPost(expectedUrl).reply(200, {})

    const result = await service.reorderOptions(attributeId, ['id', 'id2'])
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(JSON.parse(mock.history.post[0]?.data)).toEqual({ ids: ['id', 'id2'] })
    expect(result).toEqual(true)
  })
})
