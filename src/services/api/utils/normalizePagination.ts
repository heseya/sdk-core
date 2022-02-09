import { HeseyaPaginatedResponseMeta, HeseyaPaginationMeta } from '../../../interfaces/Response'

export const normalizePagination = (rawMeta: HeseyaPaginatedResponseMeta): HeseyaPaginationMeta => {
  return {
    perPage: rawMeta.per_page,
    currentPage: rawMeta.current_page,
    lastPage: rawMeta.last_page,
    total: rawMeta.total,
  }
}
