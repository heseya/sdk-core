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
  /**
   * Returns the price of the product collection for the base version of the product,
   * not including variants,
   * but including product discounts and including discounts for the current user
   */
  async getProductsPrices(productIds) {
    const params = stringifyQueryParams({ ids: productIds })
    const { data } = await axios.get<HeseyaResponse<ProductPrice[]>>(`/prices/products?${params}`)
    return data.data
  },
})
