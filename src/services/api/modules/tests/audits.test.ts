import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaResponse } from '../../../../interfaces'
import { EntityAudits } from '../../../../interfaces/Audits'
import { UserList } from '../../../../interfaces/User'
import { createEntityAuditsService } from '../audits'
import { META_LANGUAGE } from '../../../../../test/mock/responseMeta'

const dummyAuditsResponse: HeseyaResponse<EntityAudits<{ id: string }>> = {
  data: {
    id: 'test',
    event: 'created',
    created_at: '2015-12-03',
    old_values: { id: 'id' },
    new_values: {},
    issuer_type: 'user',
    issuer: {} as UserList,
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
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

describe('audits service test', () => {
  it('should make a request to get audits of the entity', async () => {
    const service = createEntityAuditsService<EntityAudits<{ id: string }>>(axios, 'products')
    const expectedUrl = '/audits/products/id:test-id'

    mock.onGet(expectedUrl).reply(200, dummyAuditsResponse)

    const result = await service.getAudits('test-id')

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuditsResponse.data)
  })
})
