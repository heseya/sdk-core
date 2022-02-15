import { AxiosInstance } from 'axios'

import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { normalizePagination } from './normalizePagination'
import { stringifyQueryParams } from './stringifyQueryParams'
import { ListResponse } from '../../../interfaces/Response'
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
 * Factory for the POST of the resource list
 */
export const createPostRequest =
  <Item, ItemDto>(axios: AxiosInstance, route: string) =>
  async (payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.post<HeseyaResponse<Item>>(`/${route}?${stringParams}`, payload)

    return response.data.data
  }

/**
 * Factory for the PATCH of the resource list
 */
export const createPatchRequest =
  <Item, ItemDto>(axios: AxiosInstance, route: string) =>
  async (id: UUID, payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.patch<HeseyaResponse<Item>>(
      `/${route}/id:${id}?${stringParams}`,
      payload,
    )

    return response.data.data
  }

/**
 * Factory for the DELETE of the resource
 */
export const createDeleteRequest =
  <Params extends DefaultParams>(axios: AxiosInstance, route: string) =>
  async (id: UUID, params?: Params): Promise<true> => {
    const stringParams = stringifyQueryParams(params || {})
    await axios.delete<never>(`/${route}/id:${id}?${stringParams}`)
    return true
  }
