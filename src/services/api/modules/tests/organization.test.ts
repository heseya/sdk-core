import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaResponse } from '../../../../interfaces'

import { META_LANGUAGE } from '../../../../../test/mock/responseMeta'
import { OrganizationDetail } from '../../../../interfaces/Organization'
import { createOrganizationService } from '../organization'

const dummyOrganizationResponse: HeseyaResponse<OrganizationDetail> = {
  data: {
    id: '1',
    name: 'ABC',
    description: 'Heseya',
    phone: '123123123',
    email: 'abc@heseya.com',
  } as OrganizationDetail,
  meta: {
    language: META_LANGUAGE,
  },
}

const orgId = '1'
let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('organization service test', () => {
  it('should make a request to accept invite organization', async () => {
    const service = createOrganizationService(axios)
    const expectedUrl = `/organizations/id:${orgId}/accept`

    mock.onPost(expectedUrl).reply(200, dummyOrganizationResponse)
    const result = await service.accept(orgId, 'https://heseya.com')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    //console.log(dummyOrganizationResponse, result)
    expect(result).toEqual(dummyOrganizationResponse.data)
  })

  it('should make a request to invite organization', async () => {
    const service = createOrganizationService(axios)
    const expectedUrl = `/organizations/id:${orgId}/invite`

    mock.onPost(expectedUrl).reply(204)
    const result = await service.invite(orgId, 'https://heseya.com', ['abc@heseya.com'])

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to reject invite organization', async () => {
    const service = createOrganizationService(axios)
    const expectedUrl = `/organizations/id:${orgId}/reject`

    mock.onPost(expectedUrl).reply(200, dummyOrganizationResponse)
    const result = await service.reject(orgId)

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrganizationResponse.data)
  })
})
