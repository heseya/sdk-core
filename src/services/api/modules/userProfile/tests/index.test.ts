import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { makeDummyHeseyaResponse } from '../../../../../../test/helpers/utils'

import { createUserProfileService } from '..'
import { User } from '../../../../../interfaces'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('user profile service test', () => {
  it('should make a request to get user profile', async () => {
    const service = createUserProfileService(axios)
    const expectedUrl = '/auth/profile'

    const dummyResponse = makeDummyHeseyaResponse<User>({ email: 'test@heseya.com' } as User)

    mock.onGet(expectedUrl).reply(200, dummyResponse)

    const result = await service.get()

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponse.data)
  })

  it('should make a request to update user profile', async () => {
    const service = createUserProfileService(axios)
    const expectedUrl = '/auth/profile'

    const dummyResponse = makeDummyHeseyaResponse<User>({ email: 'test@heseya.com' } as User)

    mock.onPatch(expectedUrl).reply(200, dummyResponse)

    const result = await service.update({ name: 'User' })

    expect(mock.history.patch[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponse.data)
  })

  it('should make a request to change password', async () => {
    const service = createUserProfileService(axios)
    const expectedUrl = '/users/password'

    mock.onPut(expectedUrl).reply(204)

    const result = await service.changePassword({
      currentPassword: 'OldPass',
      newPassword: 'NewPass',
    })

    expect(mock.history.put[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
