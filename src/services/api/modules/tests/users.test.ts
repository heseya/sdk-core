import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaResponse, User } from '../../../../interfaces'
import { createUsersService } from '../users'

const dummyResponse: HeseyaResponse<User> = {
  data: {
    id: '1',
    name: 'John',
  } as User,
  meta: {
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

describe('users service test', () => {
  it('should make a request to remove 2FA', async () => {
    const service = createUsersService(axios)
    const expectedUrl = '/users/id:ID/2fa/remove'

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.removeTwoFactorAuth('ID')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponse.data)
  })

  it('should make a request to remove user as self', async () => {
    const service = createUsersService(axios)
    const expectedUrl = '/users/self-remove'

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.deleteSelf('password')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
