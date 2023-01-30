import { HeseyaPaginatedResponseMeta, HeseyaPaginationMeta } from '../../../interfaces/Response'

export const normalizePagination = (
  rawMeta: Pick<HeseyaPaginatedResponseMeta, 'per_page' | 'current_page' | 'last_page' | 'total'>,
): HeseyaPaginationMeta => {
  return {
    perPage: rawMeta.per_page,
    currentPage: rawMeta.current_page,
    lastPage: rawMeta.last_page,
    total: rawMeta.total,
  }
}
