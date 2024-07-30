import { HeseyaResponse } from '../../../../interfaces/Response'
import { User, UserProfileUpdateDto } from '../../../../interfaces/User'
import { App } from '../../../../interfaces/App'
import { ServiceFactory } from '../../types/Service'

import { createTwoFactorAuthService, TwoFactorAuthService } from './twoFactorAuth'
import { Metadata, MetadataUpdateDto } from '../../../../interfaces'
import { UUID } from '../../../../interfaces/UUID'
import { createUserMyDataService, UserMyDataService } from './my'

export interface UserProfileService {
  /**
   * Fetch the logged user profile.
   * Returns the App if the token belongs to the application.
   */
  get(): Promise<User | App>

  update(payload: UserProfileUpdateDto): Promise<User>

  /**
   * Allow to join or leave some of the user roles.
   * Only roles with `is_joinable` flag can be joined or left.
   */
  updateRoles(payload: { roles: UUID[] }): Promise<User>

  /**
   * Change logged user password.
   */
  changePassword(payload: { currentPassword: string; newPassword: string }): Promise<true>

  My: UserMyDataService
  TwoFactorAuthentication: TwoFactorAuthService

  /**
   * Allows to update personal metadata.
   */
  updateMetadataPersonal: (metadata: MetadataUpdateDto) => Promise<Metadata>
}

export const createUserProfileService: ServiceFactory<UserProfileService> = (axios) => ({
  async get() {
    const { data } = await axios.get<HeseyaResponse<User | App>>(`/auth/profile`)
    return data.data
  },

  async update(payload) {
    const { data } = await axios.patch<HeseyaResponse<User>>(`/auth/profile`, payload)
    return data.data
  },

  async updateRoles(payload) {
    const { data } = await axios.patch<HeseyaResponse<User>>(`/auth/profile/roles`, payload)
    return data.data
  },

  async changePassword({ currentPassword, newPassword }) {
    await axios.put('/users/password', {
      password: currentPassword,
      password_new: newPassword,
      password_confirmation: newPassword,
    })
    return true
  },

  async updateMetadataPersonal(metadata) {
    const { data } = await axios.patch<{ data: Metadata }>(
      `/auth/profile/metadata-personal`,
      metadata,
    )
    return data.data
  },

  TwoFactorAuthentication: createTwoFactorAuthService(axios),
  My: createUserMyDataService(axios),
})
