import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import { createHeseyaApiService } from '../api'
import { composeBearerToken } from './utils'

interface AuthAxiosConfig {
  heseyaUrl: string
  getAccessToken: () => string
  getRefreshToken: () => string
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setIdentityToken?: (token: string) => void
  shouldIncludeAuthorizationHeader?: (request: AxiosRequestConfig) => boolean
}

type OnRefreshFunction = (accessToken: string | null) => void

export const enhanceAxiosWithAuthTokenRefreshing = (
  instance: AxiosInstance,
  config: AuthAxiosConfig,
): AxiosInstance => {
  const sdk = createHeseyaApiService(instance)

  instance.defaults.baseURL = config.heseyaUrl
  instance.defaults.headers.common.Authorization = composeBearerToken(config.getAccessToken())

  let isRefreshing = false
  let subscribers: OnRefreshFunction[] = []

  const subscribeAccessTokenRefresh = (cb: OnRefreshFunction) => subscribers.push(cb)

  const onRefreshed: OnRefreshFunction = (accessToken) => {
    subscribers.map((cb) => cb(accessToken))
    subscribers = []
    isRefreshing = false
  }

  instance.defaults.headers.common.Authorization = composeBearerToken(config.getAccessToken())

  instance.interceptors.request.use((request: AxiosRequestConfig) => {
    if (!request.headers) request.headers = {}
    request.headers.Authorization =
      config.shouldIncludeAuthorizationHeader?.(request) ?? true
        ? instance.defaults.headers.common.Authorization
        : undefined
    return request
  })

  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const originalRequest = error.config

    // Checks if token in axios was changed before this response was received
    const wasTokenRefreshedInTheMeantime =
      originalRequest.headers?.Authorization !== instance.defaults.headers.common.Authorization

    // If error is due to the token expired but token was refreshed in the meantime, simply retry the request
    if (error.response?.status === 401 && wasTokenRefreshedInTheMeantime) {
      if (originalRequest.headers)
        originalRequest.headers.Authorization = instance.defaults.headers.common.Authorization

      return instance.request(originalRequest)
    }

    // If error is on token refreshing endpoint, just forward the error
    if (originalRequest.url === '/auth/refresh') throw error

    // If error is due to the token expired, refresh the token and retry the request
    if (error.response?.status === 401 && !originalRequest._retried) {
      originalRequest._retried = true

      if (!isRefreshing) {
        isRefreshing = true

        sdk.Auth.refreshToken(config.getRefreshToken())
          .then(({ accessToken, refreshToken, identityToken }) => {
            config.setAccessToken(accessToken)
            config.setRefreshToken(refreshToken)
            config.setIdentityToken?.(identityToken)

            onRefreshed(accessToken)
          })
          .catch(() => {
            onRefreshed(null)
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

          instance.defaults.headers.common.Authorization = composeBearerToken(newAccessToken)

          // If refreshed sucessfully, retry last request
          return resolve(instance.request(originalRequest))
        })
      })
    }

    throw error
  })

  return instance
}
