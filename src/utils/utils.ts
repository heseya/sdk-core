export const isString = (value: unknown): value is string => typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && isFinite(value)

export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

export const isNull = (value: unknown): value is null => value === null

export const isNil = (value: unknown): value is null | undefined =>
  isUndefined(value) || isNull(value)

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

export const isDate = (value: unknown): value is Date => value instanceof Date

export const round = (value: number, precision = 2): number => {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}
