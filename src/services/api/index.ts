import { AxiosInstance } from 'axios'

import { createAuthService } from './modules/auth'
import { createUserProfileService } from './modules/userProfile'
import { createProductsService } from './modules/products'
import { createAttributesService } from './modules/attributes'
import { createPagesService } from './modules/pages'
import { createProductSetsService } from './modules/productSets'
import { createOrdersService } from './modules/orders'
import { createGlobalSeoService } from './modules/globalSeo'
import { createPaymentMethodsService } from './modules/paymentMethods'
import { createSettingsService } from './modules/settings'
import { createMediaService } from './modules/media'
import { createWarehouseService } from './modules/items'

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
  Auth: createAuthService(axios),
  UserProfile: createUserProfileService(axios),
  Products: createProductsService(axios),
  Warehouse: createWarehouseService(axios),
  Attributes: createAttributesService(axios),
  Pages: createPagesService(axios),
  ProductSets: createProductSetsService(axios),
  Orders: createOrdersService(axios),
  GlobalSeo: createGlobalSeoService(axios),
  PaymentMethods: createPaymentMethodsService(axios),
  Settings: createSettingsService(axios),
  Media: createMediaService(axios),
})

export type HeseyaApiService = ReturnType<typeof createHeseyaApiService>
