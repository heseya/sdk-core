import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import { createHeseyaApiService } from '../api'
import { composeBearerToken } from './utils'

export interface AxiosWithAuthTokenRefreshingConfig {
  heseyaUrl: string
  getAccessToken: () => string | null | Promise<string | null>
  getRefreshToken: () => string | null | Promise<string | null>
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setIdentityToken?: (token: string) => void
  onTokenRefreshError?: (error: AxiosError) => void
  shouldIncludeAuthorizationHeader?: (request: AxiosRequestConfig) => boolean
}

type OnRefreshFunction = (accessToken: string | null) => void

export const enhanceAxiosWithAuthTokenRefreshing = (
  instance: AxiosInstance,
  config: AxiosWithAuthTokenRefreshingConfig,
): AxiosInstance => {
  const sdk = createHeseyaApiService(instance)

  instance.defaults.baseURL = config.heseyaUrl

  let isRefreshing = false
  let subscribers: OnRefreshFunction[] = []

  const subscribeAccessTokenRefresh = (cb: OnRefreshFunction) => subscribers.push(cb)

  const onRefreshed: OnRefreshFunction = (accessToken) => {
    subscribers.map((cb) => cb(accessToken))
    subscribers = []
    isRefreshing = false
  }

  instance.interceptors.request.use(async (request: AxiosRequestConfig) => {
    // Do not modify the request if its being retried
    if (request._retried) return request

    const accessToken = await config.getAccessToken()

    if (!request.headers) request.headers = {}
    request.headers.Authorization =
      (config.shouldIncludeAuthorizationHeader?.(request) ?? true) && accessToken
        ? composeBearerToken(accessToken)
        : undefined

    return request
  })

  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const originalRequest = error.config
    const currentAccessToken = await config.getAccessToken()

    // Checks if token in axios was changed before this response was received
    const wasTokenRefreshedInTheMeantime =
      currentAccessToken &&
      originalRequest.headers?.Authorization !== composeBearerToken(currentAccessToken)

    // If error is due to the token expired but token was refreshed in the meantime, simply retry the request
    if (error.response?.status === 401 && wasTokenRefreshedInTheMeantime && currentAccessToken) {
      if (originalRequest.headers)
        originalRequest.headers.Authorization = composeBearerToken(currentAccessToken)

      return instance.request(originalRequest)
    }

    // If error is on token refreshing endpoint, just forward the error
    if (originalRequest.url === '/auth/refresh') throw error

    // If error is due to the token expired, refresh the token and retry the request
    const refreshToken = await config.getRefreshToken()
    if (error.response?.status === 401 && !originalRequest._retried && refreshToken) {
      originalRequest._retried = true

      if (!isRefreshing) {
        isRefreshing = true

        sdk.Auth.refreshToken(refreshToken)
          .then(({ accessToken, refreshToken, identityToken }) => {
            config.setAccessToken(accessToken)
            config.setRefreshToken(refreshToken)
            config.setIdentityToken?.(identityToken)

            onRefreshed(accessToken)
          })
          .catch(() => {
            onRefreshed(null)
            config.onTokenRefreshError?.(error)
          })
      }

      return new Promise((resolve, reject) => {
        subscribeAccessTokenRefresh((newAccessToken) => {
          // If token not refreshed -> logout
          if (!newAccessToken) {
            return reject(error)
          }

          if (originalRequest.headers)
            originalRequest.headers.Authorization = composeBearerToken(newAccessToken)

          // If refreshed sucessfully, retry last request
          return resolve(instance.request(originalRequest))
        })
      })
    }

    throw error
  })

  return instance
}
