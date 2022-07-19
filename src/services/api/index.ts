import axios, { AxiosInstance } from 'axios'

import { createAuthService } from './modules/auth'
import { createUserProfileService } from './modules/userProfile'
import { createProductsService } from './modules/products'
import { createAttributesService } from './modules/attributes'
import { createBannersService } from './modules/banners'
import { createPagesService } from './modules/pages'
import { createProductSetsService } from './modules/productSets'
import { createOrdersService } from './modules/orders'
import { createGlobalSeoService } from './modules/globalSeo'
import { createPaymentMethodsService } from './modules/paymentMethods'
import { createSettingsService } from './modules/settings'
import { createMediaService } from './modules/media'
import { createWarehouseService } from './modules/warehouse'
import { createWebhooksService } from './modules/webhooks'
import { createShippingMethodsService } from './modules/shippingMethods'
import { createAppsService } from './modules/apps'
import { createPackagesTemplatesService } from './modules/packagesTemplates'
import { createTagsService } from './modules/tags'
import { createOrderStatusesService } from './modules/orderStatuses'
import { createRolesService } from './modules/roles'
import { createUsersService } from './modules/users'
import { createSalesService } from './modules/sales'
import { createCouponsService } from './modules/coupons'
import { createSchemasService } from './modules/schema'
import { createAnalyticsService } from './modules/analytics'
import { createConsentsService } from './modules/consents'

const createHeseyaApiServiceFromAxios = (axiosInstance: AxiosInstance) => ({
  Analytics: createAnalyticsService(axiosInstance),
  Apps: createAppsService(axiosInstance),
  Auth: createAuthService(axiosInstance),
  Banners: createBannersService(axiosInstance),
  UserProfile: createUserProfileService(axiosInstance),
  Roles: createRolesService(axiosInstance),
  Users: createUsersService(axiosInstance),
  Products: createProductsService(axiosInstance),
  Schemas: createSchemasService(axiosInstance),
  Tags: createTagsService(axiosInstance),
  ProductSets: createProductSetsService(axiosInstance),
  Warehouse: createWarehouseService(axiosInstance),
  Attributes: createAttributesService(axiosInstance),
  Pages: createPagesService(axiosInstance),
  Sales: createSalesService(axiosInstance),
  Coupons: createCouponsService(axiosInstance),
  Orders: createOrdersService(axiosInstance),
  OrderStatuses: createOrderStatusesService(axiosInstance),
  ShippingMethods: createShippingMethodsService(axiosInstance),
  PackagesTemplates: createPackagesTemplatesService(axiosInstance),
  GlobalSeo: createGlobalSeoService(axiosInstance),
  PaymentMethods: createPaymentMethodsService(axiosInstance),
  Settings: createSettingsService(axiosInstance),
  Media: createMediaService(axiosInstance),
  Webhooks: createWebhooksService(axiosInstance),
  Consents: createConsentsService(axiosInstance),
})

const createHeseyaApiServiceFromBaseUrl = (baseURL: string) =>
  createHeseyaApiServiceFromAxios(axios.create({ baseURL }))

export type HeseyaApiService = ReturnType<typeof createHeseyaApiServiceFromAxios>

type HeseyaApiServiceFactory = {
  (axios: AxiosInstance): HeseyaApiService
  (baseURL: string): HeseyaApiService
}

/**
 * Factory to create whole Heseya e-commerce API service
 *
 * You can only pass the Heseya BaseURL to create the service, but it is recommended to use own Axios instance
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
export const createHeseyaApiService: HeseyaApiServiceFactory = (axiosOrBaseUrl) => {
  if (!axiosOrBaseUrl) throw new Error('Axios instance or base URL is required')

  if (typeof axiosOrBaseUrl === 'string') {
    return createHeseyaApiServiceFromBaseUrl(axiosOrBaseUrl)
  }
  return createHeseyaApiServiceFromAxios(axiosOrBaseUrl)
}
