import { AxiosInstance } from 'axios'
import { HeseyaResponse } from '../../../interfaces'
import { ReorderEntityRequest } from '../types/Reorder'
import { stringifyQueryParams } from './stringifyQueryParams'

/**
 * Factory for the reorder of the given item
 */
export const createReorderPostRequest =
  (axios: AxiosInstance, route: string, bodyKey: string): ReorderEntityRequest =>
  async (ids, params) => {
    const stringParams = stringifyQueryParams(params || {})

    await axios.post<HeseyaResponse<undefined>>(`/${route}/reorder?${stringParams}`, {
      [bodyKey]: ids,
    })

    return true
  }
