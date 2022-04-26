import { HeseyaResponse } from '../../../../interfaces/Response'
import { User, UserProfileUpdateDto } from '../../../../interfaces/User'
import { App } from '../../../../interfaces/App'
import { ServiceFactory } from '../../types/Service'
import { Order, OrderList } from '../../../../interfaces/Order'

import { createTwoFactorAuthService, TwoFactorAuthService } from './twoFactorAuth'
import { createGetListRequest, createGetOneRequest } from '../../utils/requests'
import { GetEntityRequest, GetOneEntityRequest } from '../../types/Requests'
import { OrdersListParams } from '../orders'
import {
  UserSavedAddress,
  UserSavedAddressCreateDto,
  UserSavedAddressUpdateDto,
} from '../../../../interfaces/Address'
import { CreateEntityRequest, DeleteEntityRequest, UpdateEntityRequest } from '../../types/Requests'
import { createDeleteRequest, createPatchRequest, createPostRequest } from '../../utils/requests'

export interface UserProfileService {
  /**
   * Fetch the logged user profile.
   * Returns the App if the token belongs to the application.
   */
  get(): Promise<User | App>

  update(payload: UserProfileUpdateDto): Promise<User>

  /**
   * Change logged user password.
   */
  changePassword(payload: { currentPassword: string; newPassword: string }): Promise<true>

  saveDeliveryAddress: CreateEntityRequest<UserSavedAddress, UserSavedAddressCreateDto>
  updateDeliveryAddress: UpdateEntityRequest<UserSavedAddress, UserSavedAddressUpdateDto>
  removeDeliveryAddress: DeleteEntityRequest

  saveInviceAddress: CreateEntityRequest<UserSavedAddress, UserSavedAddressCreateDto>
  updateInviceAddress: UpdateEntityRequest<UserSavedAddress, UserSavedAddressUpdateDto>
  removeInviceAddress: DeleteEntityRequest

  Orders: {
    /**
     * Get list of user owned orders.
     */
    get: GetEntityRequest<OrderList, OrdersListParams>

    /**
     * Get user own order by its ID.
     */
    getById: GetOneEntityRequest<Order>
  }

  TwoFactorAuthentication: TwoFactorAuthService
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

  async changePassword({ currentPassword, newPassword }) {
    await axios.put('/users/password', {
      password: currentPassword,
      password_new: newPassword,
      password_confirmation: newPassword,
    })
    return true
  },

  saveDeliveryAddress: createPostRequest(axios, '/auth/profile/delivery-addresses'),
  updateDeliveryAddress: createPatchRequest(axios, '/auth/profile/delivery-addresses'),
  removeDeliveryAddress: createDeleteRequest(axios, '/auth/profile/delivery-addresses'),

  saveInviceAddress: createPostRequest(axios, '/auth/profile/invoice-addresses'),
  updateInviceAddress: createPatchRequest(axios, '/auth/profile/invoice-addresses'),
  removeInviceAddress: createDeleteRequest(axios, '/auth/profile/invoice-addresses'),

  TwoFactorAuthentication: createTwoFactorAuthService(axios),

  Orders: {
    get: createGetListRequest<OrderList>(axios, 'orders/my'),
    getById: createGetOneRequest<Order>(axios, 'orders/my', { byId: true }),
  },
})
