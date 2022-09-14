import { HeseyaResponse } from '../../../interfaces/Response'
import { User, UserRegisterDto } from '../../../interfaces/User'
import { ServiceFactory } from '../types/Service'

export interface HeseyaAuthResponse {
  user: User
  token: string
  identity_token: string
  refresh_token: string
}

interface AuthResponse {
  user: User
  accessToken: string
  identityToken: string
  refreshToken: string
}

export interface AuthService {
  /**
   * Allows a user to login to the application.
   */
  login: (email: string, password: string, securityCode?: string) => Promise<AuthResponse>

  /**
   * Allows a user to register to the application.
   */
  register(payload: UserRegisterDto): Promise<User>

  /**
   * Allows a user to logout from the application.
   */
  logout(): Promise<true>

  /**
   * Refresh the user access & identity tokens.
   */
  refreshToken(refreshToken: string): Promise<AuthResponse>

  /**
   * Verifies token & email before showing the set password form.
   */
  verifyResetPasswordToken(token: string, email: string): Promise<true>

  /**
   * Allows a user to request an email with password reset instruction.
   * @param email - The email of the user.
   * @param redirectUrl - The url to redirect the user after the email has been sent. It will be modified by api in following way: {redirect_url}?token={token}&email={email}
   */
  requestResetPassword(email: string, redirectUrl: string): Promise<true>

  /**
   * Confirms a password reset for the user and sets the new password.
   */
  resetPassword(payload: { token: string; email: string; password: string }): Promise<true>

  /**
   * Allows to check someones `identityToken` and to get its owner.
   *
   * If `identityToken` is not provided, the Unauthenticated user model will be returned.
   */
  checkIdentity(identityToken?: string): Promise<User>
}

export const createAuthService: ServiceFactory<AuthService> = (axios) => ({
  async login(email, password, securityCode) {
    const { data } = await axios.post<{ data: HeseyaAuthResponse }>('/login', {
      email,
      password,
      code: securityCode,
    })
    return {
      user: data.data.user,
      accessToken: data.data.token,
      identityToken: data.data.identity_token,
      refreshToken: data.data.refresh_token,
    }
  },

  async refreshToken(token) {
    const { data } = await axios.post<{ data: HeseyaAuthResponse }>('/auth/refresh', {
      refresh_token: token,
    })
    return {
      user: data.data.user,
      accessToken: data.data.token,
      identityToken: data.data.identity_token,
      refreshToken: data.data.refresh_token,
    }
  },

  async register(payload) {
    const { data } = await axios.post<HeseyaResponse<User>>('/register', payload)
    return data.data
  },

  async logout() {
    await axios.post('/auth/logout')
    return true
  },

  async verifyResetPasswordToken(token, email) {
    await axios.get(`/users/reset-password/${token}/${email}`)
    return true
  },

  async requestResetPassword(email, redirectUrl) {
    await axios.post('/users/reset-password', { email, redirect_url: redirectUrl })
    return true
  },

  async resetPassword(payload) {
    await axios.put('/users/save-reset-password', payload)
    return true
  },

  async checkIdentity(identityToken) {
    const { data } = await axios.get<HeseyaResponse<User>>(
      `/auth/check${identityToken ? `/${identityToken}` : ''}`,
    )
    return data.data
  },
})
