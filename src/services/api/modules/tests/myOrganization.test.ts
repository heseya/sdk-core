import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'

import { createUserMyOrganizationService } from '../userProfile/myOrganization'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('myOrganization test service', () => {
  it('should return details of own organization', async () => {
    const service = createUserMyOrganizationService(axios)
    const expectedUrl = `/my/organization`

    mock.onGet(expectedUrl).reply(200, { data: { id: 'id' } })

    const result = await service.get()
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ id: 'id' })
  })

  it('should update details of own organization', async () => {
    const service = createUserMyOrganizationService(axios)
    const expectedUrl = `/my/organization`

    mock.onPatch(expectedUrl).reply(200, { data: { id: 'id' } })

    const result = await service.update({})
    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ id: 'id' })
  })
})
