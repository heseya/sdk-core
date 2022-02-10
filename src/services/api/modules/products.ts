import { Product, ListProduct } from '../../../interfaces/Product'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { CrudService, ServiceFactory } from '../types/Service'

import { normalizePagination } from '../utils/normalizePagination'
import { stringifyQueryParams } from '../utils/stringifyQueryParams'

export type ProductsService = CrudService<Product, ListProduct>

export const createProductsService: ServiceFactory<ProductsService> = (axios) => ({
  async getOne(slug, params = {}) {
    const stringParams = stringifyQueryParams(params)
    const response = await axios.get<HeseyaResponse<Product>>(`/products/${slug}?${stringParams}`)
    return response.data.data
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params)

    const response = await axios.get<HeseyaPaginatedResponse<ListProduct[]>>(
      `/products?${stringParams}`,
    )
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  },
})
