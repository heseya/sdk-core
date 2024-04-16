import { HeseyaResponse } from '../../../../interfaces/Response'
import { User, UserProfileUpdateDto } from '../../../../interfaces/User'
import { App } from '../../../../interfaces/App'
import { ServiceFactory } from '../../types/Service'
import { Order, OrderListed } from '../../../../interfaces/Order'

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
import { Metadata, MetadataUpdateDto, OrderProductPublic } from '../../../../interfaces'
import { DefaultParams, PaginationParams } from '../../types/DefaultParams'
import { UUID } from '../../../../interfaces/UUID'

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

  saveShippingAddress: CreateEntityRequest<UserSavedAddress[], UserSavedAddressCreateDto>
  updateShippingAddress: UpdateEntityRequest<UserSavedAddress[], UserSavedAddressUpdateDto>
  removeShippingAddress: DeleteEntityRequest

  saveBillingAddress: CreateEntityRequest<UserSavedAddress[], UserSavedAddressCreateDto>
  updateBillingAddress: UpdateEntityRequest<UserSavedAddress[], UserSavedAddressUpdateDto>
  removeBillingAddress: DeleteEntityRequest

  Orders: {
    /**
     * Get list of user owned orders.
     */
    get: GetEntityRequest<OrderListed, OrdersListParams>

    /**
     * Get user own order by its Code.
     */
    getOneByCode: GetOneEntityRequest<
      Order,
      DefaultParams & {
        /**
         * If present, attribute of the given slug will be returned
         * Otherwise, product will not have any attributes
         */
        attribute_slug?: string
      }
    >

    /**
     * Get list of user owned products.
     */
    getProducts: GetEntityRequest<
      OrderProductPublic,
      PaginationParams & {
        shipping_digital?: boolean
        /**
         * If present, attribute of the given slug will be returned
         * Otherwise, product will not have any attributes
         */
        attribute_slug?: string
      }
    >
  }

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

  saveShippingAddress: createPostRequest(axios, '/auth/profile/shipping-addresses'),
  updateShippingAddress: createPatchRequest(axios, '/auth/profile/shipping-addresses'),
  removeShippingAddress: createDeleteRequest(axios, '/auth/profile/shipping-addresses'),

  saveBillingAddress: createPostRequest(axios, '/auth/profile/billing-addresses'),
  updateBillingAddress: createPatchRequest(axios, '/auth/profile/billing-addresses'),
  removeBillingAddress: createDeleteRequest(axios, '/auth/profile/billing-addresses'),

  async updateMetadataPersonal(metadata) {
    const { data } = await axios.patch<{ data: Metadata }>(
      `/auth/profile/metadata-personal`,
      metadata,
    )
    return data.data
  },

  TwoFactorAuthentication: createTwoFactorAuthService(axios),

  Orders: {
    get: createGetListRequest<OrderListed>(axios, 'orders/my'),
    getOneByCode: createGetOneRequest<Order>(axios, 'orders/my'),
    getProducts: createGetListRequest<OrderProductPublic>(axios, 'orders/my-products'),
  },
})
