import { AxiosInstance } from 'axios'

import { createProductsService } from './modules/products'
import { createPagesService } from './modules/pages'
import { createProductSetsService } from './modules/productSets'
import { createOrdersService } from './modules/orders'
import { createGlobalSeoService } from './modules/globalSeo'
import { createPaymentMethodsService } from './modules/paymentMethods'
import { createSettingsService } from './modules/settings'

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
  Settings: createSettingsService(axios),

  // TODO: more services
})

export type HeseyaApiService = ReturnType<typeof createHeseyaApiService>
