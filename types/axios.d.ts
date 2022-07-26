import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    _retried?: boolean
  }
}
