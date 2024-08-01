import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
  prefixPath,
} from '../utils/requests'

import {
  PriceMap,
  PriceMapCreateDto,
  PriceMapUpdateDto,
  PriceMapListed,
  PriceMapPrice,
  PriceMapPriceUpdateDto,
} from '../../../interfaces/PriceMap'
import { PaginationParams } from '../types/DefaultParams'
import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginatedResponse, HeseyaResponse, ListResponse } from '../../../interfaces'
import { ProductsListParams } from './products'
import { stringifyQueryParams } from '../../../utils'
import { normalizePagination } from '../utils/normalizePagination'

type PriceMapsListParams = PaginationParams

export type PriceMapsService = CrudService<
  PriceMap,
  PriceMapListed,
  PriceMapCreateDto,
  PriceMapUpdateDto,
  PriceMapsListParams
> & {
  getPrices(id: UUID, params?: ProductsListParams): Promise<ListResponse<PriceMapPrice>>
  updatePrices(id: UUID, data: PriceMapPriceUpdateDto): Promise<PriceMapPrice[]>
}

export const createPriceMapsService: ServiceFactory<PriceMapsService> = (axios) => {
  const route = 'price-maps'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    getPrices: async (id, params) => {
      const stringParams = stringifyQueryParams(params || {})

      const {
        data: { data, meta },
      } = await axios.get<HeseyaPaginatedResponse<PriceMapPrice[]>>(
        `${prefixPath(route)}/id:${id}/prices?${stringParams}`,
      )
      return { data, pagination: normalizePagination(meta) }
    },

    updatePrices: async (id, data) => {
      const response = await axios.patch<HeseyaResponse<PriceMapPrice[]>>(
        `${prefixPath(route)}/id:${id}/prices`,
        data,
      )
      return response.data.data
    },
  }
}
