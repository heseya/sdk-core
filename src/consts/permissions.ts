import {
  Permission,
  AdminPermission,
  AnalyticsPermission,
  AppsPermission,
  AuthPermission,
  AuditsPermission,
  ProductSetsPermission,
  CountriesPermission,
  ShippingMethodsPermission,
  DepositsPermission,
  SalesPermission,
  CouponsPermission,
  ItemsPermission,
  SchemasPermission,
  CartPermission,
  OrdersPermission,
  PackagesPermission,
  PagesPermission,
  PaymentsPermission,
  PaymentMethodsPermission,
  ProductsPermission,
  SettingsPermission,
  StatusesPermission,
  TagsPermission,
  UsersPermission,
  RolesPermission,
  SeoPermission,
  WebhooksPermission,
  AttributesPermission,
} from '../interfaces/Permissions'

export const PERMISSIONS_TREE = {
  Admin: AdminPermission,
  Analytics: AnalyticsPermission,
  Apps: AppsPermission,
  Auth: AuthPermission,
  Audits: AuditsPermission,
  Attributes: AttributesPermission,
  ProductSets: ProductSetsPermission,
  Countries: CountriesPermission,
  ShippingMethods: ShippingMethodsPermission,
  Deposits: DepositsPermission,
  Sales: SalesPermission,
  Coupons: CouponsPermission,
  Items: ItemsPermission,
  Schemas: SchemasPermission,
  Cart: CartPermission,
  Orders: OrdersPermission,
  Packages: PackagesPermission,
  Pages: PagesPermission,
  Payments: PaymentsPermission,
  PaymentMethods: PaymentMethodsPermission,
  Products: ProductsPermission,
  Settings: SettingsPermission,
  Statuses: StatusesPermission,
  Tags: TagsPermission,
  Users: UsersPermission,
  Roles: RolesPermission,
  Seo: SeoPermission,
  Webhooks: WebhooksPermission,
}

export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS_TREE)
  .map((o) => Object.values(o))
  .flat()
