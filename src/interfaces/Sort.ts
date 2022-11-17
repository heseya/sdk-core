type SortDirection = 'asc' | 'desc'
export type FieldSort<Field extends string> = `${Field}:${SortDirection}`
