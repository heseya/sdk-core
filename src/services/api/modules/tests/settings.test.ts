import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {
  HeseyaPaginatedResponse,
  ListResponse,
  Setting,
  SettingsRecord,
} from '../../../../interfaces'
import { createSettingsService } from '../settings'

const dummySettingsResponse: HeseyaPaginatedResponse<Setting[]> = {
  data: [
    {
      id: '1',
      name: 'Test setting',
      value: 'test',
      public: true,
      permanent: false,
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

const dummySettingsResponseData: ListResponse<Setting> = {
  data: [...dummySettingsResponse.data],
  pagination: { perPage: 24, currentPage: 1, lastPage: 2, total: 25 },
}

const dummySettingsResponseDataWithParams: SettingsRecord = {
  key: 'test',
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('settings service test', () => {
  it('should make a request to get settings', async () => {
    const service = createSettingsService(axios)
    const expectedUrl = '/settings'

    mock.onGet(expectedUrl).reply(200, dummySettingsResponse)
    const result = await service.get()

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummySettingsResponseData)
  })
})

describe('settings service test', () => {
  it('should make a request to get settings with params', async () => {
    const service = createSettingsService(axios)
    const expectedUrl = '/settings?array'

    mock.onGet(expectedUrl).reply(200, dummySettingsResponseDataWithParams)
    const result = await service.get({ array: true })

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummySettingsResponseDataWithParams)
  })
})
