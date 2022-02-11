import { AxiosInstance } from 'axios'

import { createProductsService } from './modules/products'
import { createPagesService } from './modules/pages'
import { createProductSetsService } from './modules/productSets'
import { createOrdersService } from './modules/orders'
import { createGlobalSeoService } from './modules/globalSeo'
import { createPaymentMethodsService } from './modules/paymentMethods'

/**
 * Factory to create whole Heseya e-commerce API service
 *
 * Why not use the default axios instance?
 * Because, user may want to extend axios instance with some middlewares/interceptors (ex. for user token refreshment)
 *
 * What axios instance should have to this to work:
 * - Base URL
 * - Authentication header
 *
 * @example
 * heseya.Products.get() // Return all products
 */
export const createHeseyaApiService = (axios: AxiosInstance) => ({
  Products: createProductsService(axios),
  Pages: createPagesService(axios),
  ProductSets: createProductSetsService(axios),
  Orders: createOrdersService(axios),
  GlobalSeo: createGlobalSeoService(axios),
  PaymentMethods: createPaymentMethodsService(axios),

  // TODO: more services
  // Settings: CrudService<Env>
  // Auth: AuthService
})

export type HeseyaApiService = ReturnType<typeof createHeseyaApiService>

//
//
//
//
// ? -----------------------------------------------------------------------------
// ?  Type tests
// ? -----------------------------------------------------------------------------

declare const heseya: HeseyaApiService

heseya.Orders.getOneByCode('test')
heseya.Orders.pay('test', 'xd', 'xd')

heseya.Products.get({ search: 'xd' })
