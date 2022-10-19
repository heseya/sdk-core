import { AxiosInstance } from 'axios'

import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'
import { normalizePagination } from './normalizePagination'
import { stringifyQueryParams } from '../../../utils/stringifyQueryParams'
import { ListResponse } from '../../../interfaces/Response'
import { DefaultParams } from '../types/DefaultParams'

const prefixPath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

/**
 * Factory for the GET of the single resource
 */
export const createGetOneRequest =
  <Item>(axios: AxiosInstance, route: string, options?: { byId: boolean }, subroute?: string) =>
  async (slugOrId: string, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})
    const suffix = subroute && !subroute.startsWith('/') ? `/${subroute}` : ''

    const prefix = options?.byId ? 'id:' : ''
    const response = await axios.get<HeseyaResponse<Item>>(
      encodeURI(`${prefixPath(route)}/${prefix}${slugOrId}${suffix}?${stringParams}`),
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

    const response = await axios.get<HeseyaPaginatedResponse<Item[]>>(
      `${prefixPath(route)}?${stringParams}`,
    )
    const { data, meta } = response.data

    return { data, pagination: normalizePagination(meta) }
  }

/**
 * Factory for the GET of the resource list - without pagination
 */
export const createGetSimpleListRequest =
  <Item>(axios: AxiosInstance, route: string) =>
  async (params?: DefaultParams): Promise<Item[]> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.get<HeseyaResponse<Item[]>>(`${prefixPath(route)}?${stringParams}`)
    const { data } = response.data

    return data
  }

/**
 * Factory for the POST of the resource
 */
export const createPostRequest =
  <Item, ItemDto>(axios: AxiosInstance, route: string, subroute?: string) =>
  async (payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})
    const suffix = subroute && !subroute.startsWith('/') ? `/${subroute}` : ''

    const response = await axios.post<HeseyaResponse<Item>>(
      encodeURI(`${prefixPath(route)}${suffix}?${stringParams}`),
      payload,
    )

    return response.data.data
  }

/**
 * Factory for the POST of the nested resource
 */
export const createPostNestedRequest =
  <Item, ItemDto>(axios: AxiosInstance, parentRoute: string, route: string) =>
  async (parentId: UUID, payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})

    const response = await axios.post<HeseyaResponse<Item>>(
      encodeURI(`${prefixPath(parentRoute)}/id:${parentId}${prefixPath(route)}?${stringParams}`),
      payload,
    )

    return response.data.data
  }

/**
 * Factory for the PATCH of the resource
 */
export const createPatchRequest =
  <Item, ItemDto>(
    axios: AxiosInstance,
    route: string,
    options: { byId: boolean } = { byId: true },
    subroute?: string,
  ) =>
  async (id: UUID, payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})
    const suffix = subroute && !subroute.startsWith('/') ? `/${subroute}` : ''
    const prefix = options?.byId ? 'id:' : ''

    const response = await axios.patch<HeseyaResponse<Item>>(
      encodeURI(`${prefixPath(route)}/${prefix}${id}${suffix}?${stringParams}`),
      payload,
    )

    return response.data.data
  }

/**
 * Factory for the PATCH of the nested resource
 */
export const createPatchNestedRequest =
  <Item, ItemDto>(axios: AxiosInstance, parentRoute: string, route: string) =>
  async (parentId: UUID, payload: ItemDto, params?: DefaultParams): Promise<Item> => {
    const stringParams = stringifyQueryParams(params || {})
    const response = await axios.patch<HeseyaResponse<Item>>(
      encodeURI(`${prefixPath(parentRoute)}/id:${parentId}${prefixPath(route)}?${stringParams}`),
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
    await axios.delete<never>(encodeURI(`${prefixPath(route)}/id:${id}?${stringParams}`))
    return true
  }
