import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createAuthAxiosInstance } from '.'

import { resolveInRandomTime } from '../../../test/helpers/utils'

const BASE_URL = 'https://api.heseya.com'

let mock: MockAdapter

describe('HeseyaSdkService', () => {
  jest.setTimeout(5000)

  let refreshMethodCallsCount = 0

  const originalToken = 'integrationToken'
  const applicationState = {
    refreshToken: 'refreshToken',
    accessToken: originalToken,
    uninstallToken: 'uninstallToken',
  }
  const refreshedToken = 'refreshedIntegrationToken'

  const authAxiosConfig = {
    baseURL: BASE_URL,
    getAccessToken: () => applicationState.accessToken,
    getRefreshToken: () => applicationState.refreshToken,
    setAccessToken: (token: string) => (applicationState.refreshToken = token),
    setRefreshToken: (token: string) => (applicationState.refreshToken = token),
  }

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  beforeEach(async () => {
    applicationState.accessToken = originalToken
    refreshMethodCallsCount = 0

    mock.onPost(`${BASE_URL}/auth/refresh`).reply(() =>
      resolveInRandomTime(() => {
        refreshMethodCallsCount++
        const newToken =
          applicationState.accessToken === originalToken
            ? refreshedToken
            : 'nextToken-' + Math.random().toString(36).substring(0, 5)

        return [
          200,
          {
            data: {
              token: newToken,
              identity_token: 'identity_token',
              refresh_token: 'refresh_token',
            },
          },
        ]
      }),
    )

    mock.onGet(`${BASE_URL}/users`).reply(200, { data: [] })

    // Quick fail
    mock.onGet(`${BASE_URL}/items`).reply((config) =>
      resolveInRandomTime(
        () => {
          // Simulate that original token is expired
          if (config.headers?.Authorization === `Bearer ${originalToken}`)
            return [401, { message: 'Token Expired' }]
          return [200, { data: [] }]
        },
        20,
        40,
      ),
    )

    mock.onGet(`${BASE_URL}/products`).reply((config) =>
      resolveInRandomTime(
        () => {
          // Simulate that original token is expired
          if (config.headers?.Authorization === `Bearer ${originalToken}`)
            return [401, { message: 'Token Expired' }]
          return [200, { data: [] }]
        },
        200,
        400,
      ),
    )
  })

  it('axios should make proper requests to API', async () => {
    const heseyaAxios = createAuthAxiosInstance(authAxiosConfig)

    const result = await heseyaAxios.get('/users')

    expect(result.data).toEqual({ data: [] })
    expect(mock.history.get[0].headers?.Authorization).toEqual(`Bearer ${originalToken}`)
  })

  it('axios should refresh token when token expires', async () => {
    const heseyaAxios = createAuthAxiosInstance(authAxiosConfig)
    const url = `/products`

    const result = await heseyaAxios.get(url)

    expect(result.data).toEqual({ data: [] })
    expect(mock.history.get[0].headers?.Authorization).toEqual(`Bearer ${refreshedToken}`)
    expect(mock.history.get[1].headers?.Authorization).toEqual(`Bearer ${refreshedToken}`)
    expect(mock.history.get.length).toBe(2)
    expect(refreshMethodCallsCount).toBe(1)
  })

  it('axios should refresh token when multiple async requests fails', async () => {
    const heseyaAxios = createAuthAxiosInstance(authAxiosConfig)

    /**
     * First request will fail quickly, and token will start to refresh
     * Token will be refreshed quicker, than other two requests will be finished, so they need to be retried immediately
     */
    const result = await Promise.all([
      heseyaAxios.get('/items'),
      heseyaAxios.get('/products'),
      heseyaAxios.get('/products'),
    ])

    result.forEach((r) => expect(r.data).toEqual({ data: [] }))
    mock.history.get.forEach((config) => {
      expect(config.headers?.Authorization).toEqual(`Bearer ${refreshedToken}`)
    })
    expect(mock.history.get.length).toBe(6)
    expect(refreshMethodCallsCount).toBe(1)
  })
})
