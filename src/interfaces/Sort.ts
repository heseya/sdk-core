type SortDirection = 'asc' | 'desc'

export type FieldSort<Field extends string> = `${Field}:${SortDirection}`

export type PriceSort<Currency extends string = string> = `price:${Currency}:${SortDirection}`
