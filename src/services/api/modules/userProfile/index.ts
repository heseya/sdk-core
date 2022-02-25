import { HeseyaResponse } from '../../../../interfaces/Response'
import { User } from '../../../../interfaces/User'
import { App } from '../../../../interfaces/App'
import { ServiceFactory } from '../../types/Service'
import { Order, OrderList } from '../../../../interfaces/Order'

import { createTwoFactorAuthService, TwoFactorAuthService } from './twoFactorAuth'
import { createGetListRequest, createGetOneRequest } from '../../utils/requests'
import { GetEntityRequest, getOneEntityRequest } from '../../types/Requests'
import { OrdersListParams } from '../orders'

export interface UserProfileService {
  /**
   * Fetch the logged user profile.
   * Returns the App if the token belongs to the application.
   */
  get(): Promise<User | App>

  /**
   * Change logged user password.
   */
  changePassword(payload: { currentPassword: string; newPassword: string }): Promise<true>

  Orders: {
    /**
     * Get list of user owned orders.
     */
    get: GetEntityRequest<OrderList, OrdersListParams>

    /**
     * Get user own order by its ID.
     */
    getById: getOneEntityRequest<Order>
  }

  TwoFactorAuthentication: TwoFactorAuthService
}

export const createUserProfileService: ServiceFactory<UserProfileService> = (axios) => ({
  async get() {
    const { data } = await axios.get<HeseyaResponse<User | App>>(`/auth/profile`)
    return data.data
  },

  async changePassword({ currentPassword, newPassword }) {
    await axios.patch('/users/password', {
      password: currentPassword,
      password_new: newPassword,
      password_confirmation: newPassword,
    })
    return true
  },

  TwoFactorAuthentication: createTwoFactorAuthService(axios),

  Orders: {
    get: createGetListRequest<OrderList>(axios, 'orders/my'),
    getById: createGetOneRequest<Order>(axios, 'orders/my', { byId: true }),
  },
})
