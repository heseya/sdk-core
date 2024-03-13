import { HeseyaResponse } from '../../../interfaces'
import { UUID } from '../../../interfaces/UUID'
import { WishlistProduct, WishlistProductCreateDto } from '../../../interfaces/Wishlist'
import { stringifyQueryParams } from '../../../utils'
import { DefaultParams } from '../types/DefaultParams'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
} from '../types/Requests'
import { ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPostRequest,
} from '../utils/requests'

export interface WishlistService {
  /**
   * Return a list of entities
   */
  get: GetEntityRequest<WishlistProduct>
  /**
   * Return a single wishlist item searched by product_id
   */
  getOne: GetOneEntityRequest<WishlistProduct>
  /**
   * Return a wishlist items searched by product_ids
   * Only products that are in the wishlist will be returned
   */
  check: (productIds: UUID[], params?: DefaultParams) => Promise<UUID[]>
  /**
   * Add Product to wishlist
   */
  add: CreateEntityRequest<WishlistProduct, WishlistProductCreateDto>
  /**
   * Removes product from wishlist by product_id
   */
  delete: DeleteEntityRequest
  /**
   * Clears the entire wishlist
   */
  clear: (params?: DefaultParams) => Promise<boolean>
}

export const createWishlistService: ServiceFactory<WishlistService> = (axios) => {
  const route = '/wishlist'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    add: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    check: async (productIds, params) => {
      const stringParams = stringifyQueryParams({ ...(params || {}), product_ids: productIds })
      const { data } = await axios.get<HeseyaResponse<{ products_in_wishlist: UUID[] }>>(
        `${route}/check?${stringParams}`,
      )
      return data.data.products_in_wishlist
    },
    clear: async (params) => {
      const stringParams = stringifyQueryParams(params || {})
      await axios.delete<never>(encodeURI(`${route}?${stringParams}`))
      return true
    },
  }
}
