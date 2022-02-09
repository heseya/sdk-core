import queryString from 'query-string'

export const stringifyQueryParams = (params: Record<string, any>): string =>
  queryString.stringify(params, {
    arrayFormat: 'bracket',
  })
