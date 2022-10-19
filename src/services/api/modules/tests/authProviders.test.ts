import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { AuthProviderKey } from '../../../../interfaces/AuthProviders'
import { User } from '../../../../interfaces/User'
import { HeseyaResponse } from '../../../../interfaces/Response'
import { HeseyaAuthResponse } from '../../../../interfaces/Auth'

import { createAuthProvidersService } from '../auth/providers'

const dummyRedirectResponse = {
  redirect_url: 'https://provider.com',
}
const dummyLoginResponse: HeseyaResponse<HeseyaAuthResponse> = {
  data: {
    user: { name: 'John' } as User,
    token: 'accessToken',
    identity_token: 'identityToken',
    refresh_token: 'refreshToken',
  },
  meta: {
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

describe('AuthProviders service test', () => {
  it('should make a request to redirect to provider page', async () => {
    const service = createAuthProvidersService(axios)
    const expectedUrl = 'auth/providers/google/redirect'

    mock.onPost(expectedUrl).reply(200, dummyRedirectResponse)

    const result = await service.redirect(AuthProviderKey.Google, 'https://example.com/login')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyRedirectResponse.redirect_url)
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
})
