import queryString from 'query-string'
import { DefaultParams } from '../types/DefaultParams'

export const stringifyQueryParams = (params: DefaultParams): string =>
  queryString.stringify(params, {
    arrayFormat: 'bracket',
  })
