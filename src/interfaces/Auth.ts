import { User } from './User'

export interface HeseyaAuthResponse {
  user: User
  token: string
  identity_token: string
  refresh_token: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  identityToken: string
  refreshToken: string
}
