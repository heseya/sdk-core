import { AxiosInstance } from 'axios'

import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { ListResponse } from '../types/Service'
import { normalizePagination } from './normalizePagination'
import { stringifyQueryParams } from './stringifyQueryParams'

type Params = Record<string, any>

/**
 * Factory for the GET of the single resource
 */
export const createGetOneRequest =
  <T>(axios: AxiosInstance, route: string, options?: { byId: boolean }) =>
  async (slugOrId: string, params?: Params): Promise<T> => {
    const stringParams = stringifyQueryParams(params || {})

    const prefix = options?.byId ? 'id:' : ''
    const response = await axios.get<HeseyaResponse<T>>(
      `/${route}/${prefix}${slugOrId}?${stringParams}`,
    )

    return response.data.data
  }

/**
 * Factory for the GET of the resource list
 */
export const createGetListRequest =
  <T>(axios: AxiosInstance, route: string) =>
  async (params?: Params): Promise<ListResponse<T>> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaPaginatedResponse<T[]>>(`/${route}?${stringParams}`)
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  }

/**
 * Factory for the DELETE of the resource
 */
export const createDeleteRequest =
  (axios: AxiosInstance, route: string) =>
  async (id: UUID): Promise<true> => {
    await axios.delete<never>(`/${route}/id:${id}`)
    return true
  }
