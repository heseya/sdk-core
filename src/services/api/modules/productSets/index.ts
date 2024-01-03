import { CrudService, ServiceFactory } from '../../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../../utils/requests'

import {
  ProductSet,
  ProductSetList,
  ProductSetCreateDto,
  ProductSetUpdateDto,
} from '../../../../interfaces/ProductSet'
import {
  DefaultParams,
  MetadataParams,
  PaginationParams,
  SearchParam,
} from '../../types/DefaultParams'
import { createEntityMetadataService, EntityMetadataService } from '../metadata'
import { ReorderEntityRequest } from '../../types/Reorder'
import { createReorderPostRequest } from '../../utils/reorder'
import { UUID } from '../../../../interfaces/UUID'
import { stringifyQueryParams } from '../../../../utils/stringifyQueryParams'
import {
  HeseyaPaginatedResponse,
  LanguageParams,
  ListResponse,
  ProductList,
} from '../../../../interfaces'
import { normalizePagination } from '../../utils/normalizePagination'
import { createFavouriteProductSetService, FavouriteProductSetService } from './favourites'

interface ProductSetsListParams
  extends SearchParam,
    MetadataParams,
    PaginationParams,
    LanguageParams {
  root?: boolean
  /**
   * @deprecated in 7.0 this will be replaced with `depth`
   */
  tree?: boolean
  name?: string
  slug?: string
  parent_id?: UUID
  public?: boolean
  ids?: UUID[]
}

export interface ProductSetsService
  extends CrudService<
      ProductSet,
      ProductSetList,
      ProductSetCreateDto,
      ProductSetUpdateDto,
      ProductSetsListParams
    >,
    EntityMetadataService {
  reorder: ReorderEntityRequest
  reorderChild: (parentId: UUID, ids: UUID[], params?: DefaultParams) => Promise<true>
  /**
   * Returns all products that are connected directly to the set
   */
  getProducts: (
    id: UUID,
    params?: DefaultParams & PaginationParams,
  ) => Promise<ListResponse<ProductList>>
  updateProducts: (
    id: UUID,
    productsIds: UUID[],
    params?: DefaultParams,
  ) => Promise<ListResponse<ProductList>>
  /**
   * Returns all products that are connected directly or indirectly (inherited from child sets) to the set
   */
  getAllProducts: (
    id: UUID,
    params?: DefaultParams & PaginationParams,
  ) => Promise<ListResponse<ProductList>>
  reorderProducts: (
    setId: UUID,
    products: { id: UUID; order: number }[],
    params?: DefaultParams,
  ) => Promise<true>
  Favourites: FavouriteProductSetService
}

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => {
  const route = 'product-sets'
  const reorderBodyKey = 'product_sets'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    reorder: createReorderPostRequest(axios, route, reorderBodyKey),

    async reorderChild(parentId, ids, params) {
      const stringParams = stringifyQueryParams(params || {})

      await axios.post(`/${route}/reorder/id:${parentId}?${stringParams}`, {
        [reorderBodyKey]: ids,
      })

      return true
    },

    async getProducts(setId, params) {
      const stringParams = stringifyQueryParams(params || {})

      const { data } = await axios.get<HeseyaPaginatedResponse<ProductList[]>>(
        `/${route}/id:${setId}/products?${stringParams}`,
      )

      return { data: data.data, pagination: normalizePagination(data.meta) }
    },

    async updateProducts(setId, productsIds, params) {
      const stringParams = stringifyQueryParams(params || {})

      const { data } = await axios.post<HeseyaPaginatedResponse<ProductList[]>>(
        `/${route}/id:${setId}/products?${stringParams}`,
        { products: productsIds },
      )

      return { data: data.data, pagination: normalizePagination(data.meta) }
    },

    async getAllProducts(setId, params) {
      const stringParams = stringifyQueryParams(params || {})

      const { data } = await axios.get<HeseyaPaginatedResponse<ProductList[]>>(
        `/${route}/id:${setId}/products-all?${stringParams}`,
      )

      return { data: data.data, pagination: normalizePagination(data.meta) }
    },

    async reorderProducts(setId, products, params) {
      const stringParams = stringifyQueryParams(params || {})

      await axios.post(`/${route}/id:${setId}/products/reorder?${stringParams}`, {
        products,
      })

      return true
    },

    Favourites: createFavouriteProductSetService(axios),

    ...createEntityMetadataService(axios, route),
  }
}
