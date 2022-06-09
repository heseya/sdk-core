import { WishlistProduct, WishlistProductCreateDto } from '../../../interfaces/Wishlist'
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
   * Add Product to wishlist
   */
  add: CreateEntityRequest<WishlistProduct, WishlistProductCreateDto>
  /**
   * Removes product from wishlist by product_id
   */
  delete: DeleteEntityRequest
}

export const createWishlistService: ServiceFactory<WishlistService> = (axios) => {
  const route = '/wishlist'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    add: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
