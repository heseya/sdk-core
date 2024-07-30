import { ServiceFactory } from '../../types/Service'
import { Order, OrderListed } from '../../../../interfaces/Order'

import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../../utils/requests'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  UpdateEntityRequest,
} from '../../types/Requests'
import { OrdersListParams } from '../orders'
import {
  OrderProductPublic,
  UserSavedAddress,
  UserSavedAddressCreateDto,
  UserSavedAddressUpdateDto,
} from '../../../../interfaces'
import { DefaultParams, PaginationParams } from '../../types/DefaultParams'
import { createUserMyOrganizationService, UserMyOrganizationService } from './myOrganization'

export interface MyOrdersService {
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
}

export interface UserMyDataService {
  Orders: {
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
  } & MyOrdersService

  ShippingAddresses: {
    create: CreateEntityRequest<UserSavedAddress[], UserSavedAddressCreateDto>
    update: UpdateEntityRequest<UserSavedAddress[], UserSavedAddressUpdateDto>
    remove: DeleteEntityRequest
  }

  BillingAddresses: {
    create: CreateEntityRequest<UserSavedAddress[], UserSavedAddressCreateDto>
    update: UpdateEntityRequest<UserSavedAddress[], UserSavedAddressUpdateDto>
    remove: DeleteEntityRequest
  }

  Organization: UserMyOrganizationService
}

export const createUserMyDataService: ServiceFactory<UserMyDataService> = (axios) => ({
  Orders: {
    get: createGetListRequest<OrderListed>(axios, '/my/orders'),
    getOneByCode: createGetOneRequest<Order>(axios, '/my/orders'),
    getProducts: createGetListRequest<OrderProductPublic>(axios, '/my/orders/products'),
  },

  // TODO: maybe change to `/my/shipping-addresses` and `/my/billing-addresses`
  ShippingAddresses: {
    create: createPostRequest(axios, '/auth/profile/shipping-addresses'),
    update: createPatchRequest(axios, '/auth/profile/shipping-addresses'),
    remove: createDeleteRequest(axios, '/auth/profile/shipping-addresses'),
  },

  BillingAddresses: {
    create: createPostRequest(axios, '/auth/profile/billing-addresses'),
    update: createPatchRequest(axios, '/auth/profile/billing-addresses'),
    remove: createDeleteRequest(axios, '/auth/profile/billing-addresses'),
  },

  Organization: createUserMyOrganizationService(axios),
})
