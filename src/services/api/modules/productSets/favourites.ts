import {
  FavouriteProductSet,
  FavouriteProductSetCreateDto,
} from '../../../../interfaces/FavouriteProductSet'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
} from '../../types/Requests'
import { ServiceFactory } from '../../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPostRequest,
} from '../../utils/requests'

export interface FavouriteProductSetService {
  /**
   * Return a list of entities
   */
  get: GetEntityRequest<FavouriteProductSet>
  /**
   * Return a single wishlist item searched by product_id
   */
  getOne: GetOneEntityRequest<FavouriteProductSet>
  /**
   * Add Product to wishlist
   */
  add: CreateEntityRequest<FavouriteProductSet, FavouriteProductSetCreateDto>
  /**
   * Removes product from wishlist by product_id
   */
  delete: DeleteEntityRequest
}

export const createFavouriteProductSetService: ServiceFactory<FavouriteProductSetService> = (
  axios,
) => {
  const route = '/product-sets/favourites'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    add: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
