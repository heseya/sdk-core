import { normalizePagination } from '../normalizePagination'

describe('normalizePagination tests', () => {
  it('should transform correct object to normalized version', () => {
    const input = {
      current_page: 1,
      last_page: 10,
      per_page: 12,
      total: 120,
    }
    expect(normalizePagination(input)).toEqual({
      perPage: 12,
      currentPage: 1,
      lastPage: 10,
      total: 120,
    })
  })
})
