import { AxiosInstance } from 'axios'

import { createProductsService, ProductsService } from './modules/products'
import { createPagesService, PagesService } from './modules/pages'
import { createProductSetsService, ProductSetsService } from './modules/productSets'
import { createOrdersService, OrdersService } from './modules/orders'

export interface HeseyaService {
  Products: ProductsService
  Pages: PagesService
  ProductSets: ProductSetsService
  Orders: OrdersService

  // TODO: more services
  // Settings: CrudService<Env>
  // Seo: CrudService<SeoMetadata>
  // Auth: AuthService
}

export const createHeseyaService = (axios: AxiosInstance): HeseyaService => ({
  Products: createProductsService(axios),
  Pages: createPagesService(axios),
  ProductSets: createProductSetsService(axios),
  Orders: createOrdersService(axios),
})
