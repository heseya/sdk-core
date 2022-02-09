import { SeoMetadata } from './Seo'

export interface HeseyaResponseMeta {
  currency: { name: string; symbol: string; decimals: number }
  language: { symbol: string }
  seo?: SeoMetadata
}

export interface HeseyaPaginatedResponseMeta extends HeseyaResponseMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface HeseyaPaginationMeta {
  perPage: number
  currentPage: number
  lastPage: number
  total: number
}

export interface HeseyaResponse<Data> {
  data: Data
  meta: HeseyaResponseMeta
}

export interface HeseyaPaginatedResponse<Data> {
  data: Data
  meta: HeseyaPaginatedResponseMeta
}
