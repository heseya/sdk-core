import { User } from '../../../interfaces/User'
// import { ServiceFactory } from '../types/Service'

interface AuthResponse {
  user: User
  token: string
  identity_token: string
  refresh_token: string
}

export interface AuthService {
  /**
   * Allows a user to login to the application.
   */
  login: (email: string, password: string, securityCode?: string) => Promise<AuthResponse>

  /**
   * Allows a user to register to the application.
   */
  register(payload: { name: string; email: string; password: string }): Promise<User>

  /**
   * Allows a user to logout from the application.
   */
  logout(): Promise<true>

  /**
   * Refresh the user access & identity tokens.
   */
  refreshToken(refreshToken: string): Promise<AuthResponse>

  /**
   * Allows a user to request a password reset.
   */
  requestResetPassword(email: string): Promise<true>

  /**
   * Confirms a password reset for the user and change the password.
   */
  resetPassword(payload: { token: string; email: string; password: string }): Promise<true>

  /**
   * Allows to check someones identityToken and to get its owner.
   */
  checkIdentity(identityToken: string): Promise<User>
}

export interface TwoFactorAuthService {
  /**
   * Initiates a 2FA authentication setup process.
   */
  setup(type: 'app'): Promise<{ secret: string; qrCodeUrl: string }>
  setup(type: 'email'): Promise<true>

  /**
   * Confirms a 2FA authentication for the user.
   */
  confirm(securityCode: string): Promise<{ recoveryCodes: string[] }>

  /**
   * Regenerate a 2FA authentication recovery codes for the user.
   */
  generateRecoveryCodes(password: string): Promise<{ recoveryCodes: string[] }>

  /**
   * Removes a 2FA authentication for the user.
   */
  remove(password: string): Promise<true>
}

export interface UserProfileService {
  /**
   * Fetch the logged user profile.
   */
  get(): Promise<User>

  /**
   * Change logged user password.
   */
  changePassword(payload: { currentPassword: string; newPassword: string }): Promise<void>
}

// TODO: create auth service
// export const createAuthService: ServiceFactory<AuthService> = (axios) => ({})
