import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaResponse, SeoCheckResponse, SeoMetadata } from '../../../../interfaces'

import { createGlobalSeoService } from '../globalSeo'

const dummyGlobalSeoResponse: HeseyaResponse<SeoMetadata> = {
  data: {
    title: 'Title',
    description: 'Lorem ipsum',
    keywords: ['lorem', 'ipsum'],
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyCheckGlobalSeoResponse: HeseyaResponse<SeoCheckResponse> = {
  data: {
    duplicated: false,
    duplicates: [],
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyKeywords = ['lorem', 'ipsum']

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('global seo service test', () => {
  it('should make a request to get global SEO settings', async () => {
    const service = createGlobalSeoService(axios)
    const expectedUrl = '/seo'
    mock.onGet(expectedUrl).reply(200, dummyGlobalSeoResponse)

    const result = await service.get()

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyGlobalSeoResponse.data)
  })

  it('should make a request to check if keywords are already used in other entities', async () => {
    const service = createGlobalSeoService(axios)
    const expectedUrl = '/seo/check'
    mock.onPost(expectedUrl).reply(200, dummyCheckGlobalSeoResponse)

    const result = await service.check(dummyKeywords)

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyCheckGlobalSeoResponse.data)
  })
})
