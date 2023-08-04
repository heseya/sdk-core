import { AxiosInstance } from 'axios'

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
import { createPaymentsService } from './modules/payments'
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
import { createWishlistService } from './modules/wishlist'
import { createPricesService } from './modules/prices'
import { createLanguagesService } from './modules/languages'

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
export const createHeseyaApiService = (axios: AxiosInstance) => {
  if (!axios) throw new Error('Axios instance is required, but it was not provided')

  return {
    Analytics: createAnalyticsService(axios),
    Apps: createAppsService(axios),
    Auth: createAuthService(axios),
    Banners: createBannersService(axios),
    UserProfile: createUserProfileService(axios),
    Roles: createRolesService(axios),
    Users: createUsersService(axios),
    Products: createProductsService(axios),
    Prices: createPricesService(axios),
    Schemas: createSchemasService(axios),
    Tags: createTagsService(axios),
    ProductSets: createProductSetsService(axios),
    Warehouse: createWarehouseService(axios),
    Attributes: createAttributesService(axios),
    Pages: createPagesService(axios),
    Sales: createSalesService(axios),
    Coupons: createCouponsService(axios),
    Orders: createOrdersService(axios),
    OrderStatuses: createOrderStatusesService(axios),
    ShippingMethods: createShippingMethodsService(axios),
    PackagesTemplates: createPackagesTemplatesService(axios),
    GlobalSeo: createGlobalSeoService(axios),
    PaymentMethods: createPaymentMethodsService(axios),
    Payments: createPaymentsService(axios),
    Settings: createSettingsService(axios),
    Media: createMediaService(axios),
    Webhooks: createWebhooksService(axios),
    Wishlist: createWishlistService(axios),
    Consents: createConsentsService(axios),
    Languages: createLanguagesService(axios),
  }
}

export type HeseyaApiService = ReturnType<typeof createHeseyaApiService>
