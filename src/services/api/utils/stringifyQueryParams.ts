import queryString from 'query-string'
import flatten from 'flat'
import { isBoolean } from 'lodash'

import { DefaultParams } from '../types/DefaultParams'

const transformBooleanParams = (params: DefaultParams): DefaultParams => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, isBoolean(value) ? +value : value]),
  )
}

export const stringifyQueryParams = (params: DefaultParams): string => {
  const flattenedParams = flatten<DefaultParams, DefaultParams>(params, { safe: true })
  const transformedParams = transformBooleanParams(flattenedParams)

  return queryString.stringify(transformedParams, {
    arrayFormat: 'bracket',
    skipNull: true,
  })
}
