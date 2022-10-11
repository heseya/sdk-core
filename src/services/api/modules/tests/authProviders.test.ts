import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { AuthProviderKey, HeseyaResponse, User } from '../../../../interfaces'
import { HeseyaAuthResponse } from '../../../../interfaces/Auth'
import { createAuthProvidersService } from '../AuthProviders'

const dummyRedirectResponse: HeseyaResponse<{ redirect_url: string }> = {
  data: {
    redirect_url: 'https://provider.com',
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}
const dummyLoginResponse: HeseyaResponse<HeseyaAuthResponse> = {
  data: {
    user: {} as User,
    token: '',
    identity_token: '',
    refresh_token: '',
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
    expect(result).toEqual(dummyRedirectResponse.data.redirect_url)
  })

  it('should make a request to login with provider', async () => {
    const service = createAuthProvidersService(axios)
    const expectedUrl = 'auth/providers/google/login'

    mock.onPost(expectedUrl).reply(200, dummyLoginResponse)

    const result = await service.login(AuthProviderKey.Google, {})

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ user: {}, accessToken: '', identityToken: '', refreshToken: '' })
  })
})
