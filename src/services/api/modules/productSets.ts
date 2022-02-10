import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { CrudService, ServiceFactory } from '../types/Service'

import { normalizePagination } from '../utils/normalizePagination'
import { stringifyQueryParams } from '../utils/stringifyQueryParams'

export type ProductSetsService = CrudService<ProductSet, ProductSetList>

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => ({
  async getOne(slug, params) {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaResponse<ProductSet>>(
      `/product-sets/${slug}?${stringParams}`,
    )
    return response.data.data
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaPaginatedResponse<ProductSetList[]>>(
      `/product-sets?${stringParams}`,
    )
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  },
})
