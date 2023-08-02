import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { AuthProviderKey } from '../../../../interfaces/AuthProviders'
import { User } from '../../../../interfaces/User'
import { HeseyaResponse } from '../../../../interfaces/Response'
import { HeseyaAuthResponse } from '../../../../interfaces/Auth'

import { createAuthProvidersService } from '../auth/providers'

const dummyRedirectResponse: HeseyaResponse<{ redirect_url: string }> = {
  data: {
    redirect_url: 'https://provider.com',
  },
  meta: {
    language: { symbol: 'pl' },
  },
}
const dummyLoginResponse: HeseyaResponse<HeseyaAuthResponse> = {
  data: {
    user: { name: 'John' } as User,
    token: 'accessToken',
    identity_token: 'identityToken',
    refresh_token: 'refreshToken',
  },
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

describe('AuthProviders service test', () => {
  it('should make a request to redirect to provider page', async () => {
    const service = createAuthProvidersService(axios)
    const expectedUrl = 'auth/providers/google/redirect'

    mock.onPost(expectedUrl).reply(200, dummyRedirectResponse)

    const result = await service.redirect(AuthProviderKey.Google, 'https://example.com/login')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyRedirectResponse.data.redirect_url)
  })

  it('should make a request to login with provider', async () => {
    const service = createAuthProvidersService(axios)
    const expectedUrl = 'auth/providers/google/login'

    mock.onPost(expectedUrl).reply(200, dummyLoginResponse)

    const result = await service.login(AuthProviderKey.Google, 'https://example.com/login?code=123')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({
      user: { name: 'John' },
      accessToken: 'accessToken',
      identityToken: 'identityToken',
      refreshToken: 'refreshToken',
    })
  })

  it('should make a request to merge accounts', async () => {
    const service = createAuthProvidersService(axios)
    const expectedUrl = 'auth/providers/merge-account'

    mock.onPost(expectedUrl).reply(204)

    const result = await service.mergeAccount('mergeToken')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(mock.history.post[0]?.data).toEqual('{"merge_token":"mergeToken"}')
    expect(result).toEqual(true)
  })
})
