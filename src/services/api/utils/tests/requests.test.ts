/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaPaginatedResponse } from '../../../..'
import {
  createDeleteNestedRequest,
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchNestedRequest,
  createPatchRequest,
  createPostNestedRequest,
  createPostRequest,
} from '../requests'

type DummyItem = { id: number }
type DummyItemDto = { name: string }

const dummyItem: DummyItem = { id: 69 }
const dummyItemDto: DummyItemDto = { name: 'dummy' }

const dummyResponseList: HeseyaPaginatedResponse<DummyItem[]> = {
  data: [{ id: 1 }, { id: 2 }, { id: 3 }],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 1,
    from: 1,
    to: 1,
    path: '/dummy',
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

describe('createGetOneRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, '/products', { byId: true })
    const expectedUrl = '/products/id:test?'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test')

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('encode path components', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, '/products', { byId: true })
    const expectedUrl = '/products/id:test%25?'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test%')

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request with params', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products', { byId: true })
    const expectedUrl = '/products/id:test?param=yes'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products')
    const expectedUrl = '/products/test?param=yes'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products', { byId: true }, 'sub')
    const expectedUrl = '/products/id:test/sub?'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test')

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createGetListRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createGetListRequest<DummyItem[]>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute({ param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result.data).toEqual(dummyResponseList.data)
    expect(result.pagination).toEqual({ perPage: 1, currentPage: 1, total: 1, lastPage: 1 })
  })

  it('handle the / prefix in path', async () => {
    const execute = createGetListRequest<DummyItem[]>(axios, '/products')
    const expectedUrl = '/products?'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute()

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result.data).toEqual(dummyResponseList.data)
    expect(result.pagination).toEqual({ perPage: 1, currentPage: 1, total: 1, lastPage: 1 })
  })
})

describe('createGetSimpleListRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createGetSimpleListRequest<DummyItem[]>(axios, '/products')
    const expectedUrl = '/products?'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute()

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponseList.data)
  })

  it('should make a rest request with params', async () => {
    const execute = createGetSimpleListRequest<DummyItem[]>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute({ param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponseList.data)
  })
})

describe('createPostRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, '/products')
    const expectedUrl = '/products?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('handle the nested paths', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, '/products/items/test')
    const expectedUrl = '/products/items/test?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request with params', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products', 'sub')
    const expectedUrl = '/products/sub?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createPostNestedRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createPostNestedRequest<DummyItem, DummyItemDto>(axios, '/products', '/items')
    const expectedUrl = '/products/id:test/items?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('encode path components', async () => {
    const execute = createPostNestedRequest<DummyItem, DummyItemDto>(axios, '/products', '/items')
    const expectedUrl = '/products/id:test%25/items?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test%', dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request with params', async () => {
    const execute = createPostNestedRequest<DummyItem, DummyItemDto>(axios, 'products', 'items')
    const expectedUrl = '/products/id:test/items?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createPatchRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, '/products')
    const expectedUrl = '/products/id:test?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('encode path components', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, '/products')
    const expectedUrl = '/products/id:test%25?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test%', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request with params', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products/id:test?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, 'products', { byId: false })
    const expectedUrl = '/products/test?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(
      axios,
      'products',
      { byId: true },
      'sub',
    )
    const expectedUrl = '/products/id:test/sub?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createPatchNestedRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createPatchNestedRequest<DummyItem, DummyItemDto>(axios, '/products', '/items')
    const expectedUrl = '/products/id:PID/items/id:ID?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('PID', 'ID', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('encode path components', async () => {
    const execute = createPatchNestedRequest<DummyItem, DummyItemDto>(axios, '/products', '/items')
    const expectedUrl = '/products/id:test%25/items/id:test%25?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test%', 'test%', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request with params', async () => {
    const execute = createPatchNestedRequest<DummyItem, DummyItemDto>(axios, 'products', 'items')
    const expectedUrl = '/products/id:test/items/id:test?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', 'test', dummyItemDto, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createDeleteRequest', () => {
  it('handle the / prefix in path', async () => {
    const execute = createDeleteRequest(axios, '/products')
    const expectedUrl = '/products/id:test?'

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test')

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('encode path components', async () => {
    const execute = createDeleteRequest(axios, '/products')
    const expectedUrl = '/products/id:test%25?'

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test%')

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a rest request with params', async () => {
    const execute = createDeleteRequest(axios, 'products')
    const expectedUrl = '/products/id:test?param=yes'

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})

describe('createDeleteNestedRequest', () => {
  const parentRoute = 'products'
  const childRoute = 'items'

  it('should make nested delete request', async () => {
    const execute = createDeleteNestedRequest(axios, parentRoute, childRoute)
    const expectedUrl = `/${parentRoute}/id:PID/${childRoute}/id:ID?`

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('PID', 'ID')

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('encode path components', async () => {
    const execute = createDeleteNestedRequest(axios, parentRoute, childRoute)
    const expectedUrl = `/${parentRoute}/id:test%25/${childRoute}/id:test%25?`

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test%', 'test%')

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a rest request with params', async () => {
    const execute = createDeleteNestedRequest(axios, parentRoute, childRoute)
    const expectedUrl = `/${parentRoute}/id:test/${childRoute}/id:test?param=yes`

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test', 'test', { param: 'yes' })

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
