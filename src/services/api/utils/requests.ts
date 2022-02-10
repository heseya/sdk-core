import { AxiosInstance } from 'axios'

import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { normalizePagination } from './normalizePagination'
import { stringifyQueryParams } from './stringifyQueryParams'
import { ListResponse } from '../types/Requests'
import { DefaultParams } from '../types/DefaultParams'

/**
 * Factory for the GET of the single resource
 */
export const createGetOneRequest =
  <Item>(axios: AxiosInstance, route: string, options?: { byId: boolean }) =>
  async (slugOrId: string, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})

    const prefix = options?.byId ? 'id:' : ''
    const response = await axios.get<HeseyaResponse<Item>>(
      `/${route}/${prefix}${slugOrId}?${stringParams}`,
    )

    return response.data.data
  }

/**
 * Factory for the GET of the resource list
 */
export const createGetListRequest =
  <Item>(axios: AxiosInstance, route: string) =>
  async (params?: DefaultParams): Promise<ListResponse<Item>> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaPaginatedResponse<Item[]>>(`/${route}?${stringParams}`)
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
