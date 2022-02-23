import queryString from 'query-string'
import flatten from 'flat'

import { DefaultParams } from '../types/DefaultParams'

export const stringifyQueryParams = (params: DefaultParams): string => {
  const flatParams = flatten(params, { safe: true }) as Record<string, any>
  return queryString.stringify(flatParams, {
    arrayFormat: 'bracket',
    skipNull: true,
  })
}
