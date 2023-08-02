import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaPaginatedResponse, ListResponse, ProductList } from '../../../../interfaces'

import { createProductSetsService } from '../productSets'

const dummyProductsListResponse: HeseyaPaginatedResponse<ProductList[]> = {
  data: [],
  meta: {
    language: { symbol: 'pl' },
    per_page: 24,
    current_page: 1,
    last_page: 2,
    total: 25,
    from: 1,
    path: '',
    to: 2,
  },
}

const dummyProductsListResponseData: ListResponse<ProductList> = {
  data: [],
  pagination: {
    perPage: 24,
    currentPage: 1,
    lastPage: 2,
    total: 25,
  },
}

const setId = '1'
let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('product sets service test', () => {
  it('should make a request to reorder children', async () => {
    const service = createProductSetsService(axios)
    const expectedUrl = `/product-sets/reorder/id:${setId}?`

    mock.onPost(expectedUrl).reply(200, true)
    const result = await service.reorderChild(setId, ['1', '2'])

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to get products', async () => {
    const service = createProductSetsService(axios)
    const expectedUrl = `/product-sets/id:${setId}/products?`

    mock.onGet(expectedUrl).reply(200, dummyProductsListResponse)
    const result = await service.getProducts(setId)

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyProductsListResponseData)
  })

  it('should make a request to update products', async () => {
    const service = createProductSetsService(axios)
    const expectedUrl = `/product-sets/id:${setId}/products?`

    mock.onPost(expectedUrl).reply(200, dummyProductsListResponse)
    const result = await service.updateProducts(setId, ['1', '2'])

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyProductsListResponseData)
  })

  it('should make a request to reorder product sets and return true', async () => {
    const service = createProductSetsService(axios)
    const expectedUrl = `/product-sets/id:${setId}/products/reorder?`

    mock.onPost(expectedUrl).reply(200, true)
    const result = await service.reorderProducts(setId, [{ id: '1', order: 1 }])

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
