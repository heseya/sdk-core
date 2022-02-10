import { Page, ListPage } from '../../../interfaces/Page'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { CrudService, ServiceFactory } from '../types/Service'

import { normalizePagination } from '../utils/normalizePagination'
import { stringifyQueryParams } from '../utils/stringifyQueryParams'

export type PagesService = CrudService<Page, ListPage>

export const createPagesService: ServiceFactory<PagesService> = (axios) => ({
  async getOne(slug, params) {
    const stringParams = stringifyQueryParams(params || {})
    const response = await axios.get<HeseyaResponse<Page>>(`/pages/${slug}?${stringParams}`)
    return response.data.data
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaPaginatedResponse<ListPage[]>>(`/pages?${stringParams}`)
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  },
})
