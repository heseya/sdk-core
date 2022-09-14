import queryString from 'query-string'
import flatten from 'flat'
import { isBoolean, isDate } from 'lodash'

import { DefaultParams } from '../services/api/types/DefaultParams'

const transformParam = (value: unknown): unknown => {
  if (isBoolean(value)) return +value
  if (isDate(value)) return value.toISOString()
  return value
}

const transformAllParamValues = (params: DefaultParams): DefaultParams => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, transformParam(value)]),
  )
}

export const stringifyQueryParams = (params: DefaultParams): string => {
  const flattenedParams = flatten<DefaultParams, DefaultParams>(params, { safe: true })
  const transformedParams = transformAllParamValues(flattenedParams)

  return queryString.stringify(transformedParams, {
    arrayFormat: 'bracket',
    skipNull: true,
  })
}
