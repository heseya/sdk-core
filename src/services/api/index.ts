import { AxiosInstance } from 'axios'

import { createProductsService } from './modules/products'
import { createPagesService } from './modules/pages'
import { createProductSetsService } from './modules/productSets'
import { createOrdersService } from './modules/orders'

export const createHeseyaService = (axios: AxiosInstance) => ({
  Products: createProductsService(axios),
  Pages: createPagesService(axios),
  ProductSets: createProductSetsService(axios),
  Orders: createOrdersService(axios),

  // TODO: more services
  // Settings: CrudService<Env>
  // Seo: CrudService<SeoMetadata>
  // Auth: AuthService
})

export type HeseyaService = ReturnType<typeof createHeseyaService>

// -----------------------------------------------------------------------------

declare const heseya: HeseyaService

heseya.Orders.get({ search: 'test' })
