import { AxiosInstance } from 'axios'

import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { ListResponse } from '../types/Service'
import { normalizePagination } from './normalizePagination'
import { stringifyQueryParams } from './stringifyQueryParams'

type DefaultParams = Record<string, any>

export const getOneApiCall =
  <T>(axios: AxiosInstance, path: string) =>
  async (slug: string, params?: DefaultParams) => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaResponse<T>>(`/${path}/${slug}?${stringParams}`)

    return response.data.data
  }

export const getApiCall =
  <T>(axios: AxiosInstance, path: string) =>
  async (params?: DefaultParams): Promise<ListResponse<T>> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaPaginatedResponse<T[]>>(`/${path}?${stringParams}`)
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  }
