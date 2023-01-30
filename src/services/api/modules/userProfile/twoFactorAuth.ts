import { HeseyaResponse } from '../../../..'
import { ServiceFactory } from '../../types/Service'

type TfaSetupResponse = HeseyaResponse<
  | { type: 'email' }
  | {
      type: 'app'
      secret: string
      qr_code_url: string
    }
>

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

export const createTwoFactorAuthService: ServiceFactory<TwoFactorAuthService> = (axios) => ({
  async setup(type) {
    const { data } = await axios.post<TfaSetupResponse>('/auth/2fa/setup', {
      type,
    })

    if (type === 'app' && data.data.type === 'app')
      return { secret: data.data.secret, qrCodeUrl: data.data.qr_code_url }

    // This needs to be returned as any, otherwise ts is complaining
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return true as any
  },

  async confirm(securityCode) {
    const { data } = await axios.post<HeseyaResponse<{ recovery_codes: string[] }>>(
      '/auth/2fa/confirm',
      { code: securityCode },
    )
    return { recoveryCodes: data.data.recovery_codes }
  },

  async generateRecoveryCodes(password) {
    const { data } = await axios.post<HeseyaResponse<{ recovery_codes: string[] }>>(
      '/auth/2fa/recovery/create',
      { password },
    )
    return { recoveryCodes: data.data.recovery_codes }
  },

  async remove(password) {
    await axios.post('/auth/2fa/remove', { password })
    return true
  },
})
