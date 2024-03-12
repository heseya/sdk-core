import { AxiosInstance } from 'axios'
import { HeseyaResponse, ProductPrice } from '../../../interfaces'
import { UUID } from '../../../interfaces/UUID'
import { stringifyQueryParams } from '../../../utils'

export interface PricesService {
  /**
   * Returns prices for the given entity.
   */
  getProductsPrices: (productIds: UUID[]) => Promise<ProductPrice[]>
}

export const createPricesService = (axios: AxiosInstance): PricesService => ({
  async getProductsPrices(productIds) {
    const params = stringifyQueryParams({ ids: productIds })
    const { data } = await axios.get<HeseyaResponse<ProductPrice[]>>(`/prices/products?${params}`)
    return data.data
  },
})
