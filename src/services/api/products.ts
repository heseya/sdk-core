import { Product, ListProduct } from '../../interfaces/Product'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../interfaces/Response'
import { CrudServiceFactory } from './interfaces/CrudService'

import { normalizePagination } from './utils/normalizePagination'
import { stringifyQueryParams } from './utils/stringifyQueryParams'

export const createProductsService: CrudServiceFactory<Product, ListProduct> = (axios) => ({
  async getOne(slug) {
    const response = await axios.get<HeseyaResponse<Product>>(`/products/${slug}`)
    return response.data.data
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params)

    const response = await axios.get<HeseyaPaginatedResponse<Product[]>>(
      `/products?${stringParams}`,
    )
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  },
})
