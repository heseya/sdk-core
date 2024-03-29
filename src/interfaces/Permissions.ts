import { PERMISSIONS_TREE } from '../consts/permissions'
import { UUID } from './UUID'

// -------------------------------------------------------------
// ? Enums
// -------------------------------------------------------------

export enum AdminPermission {
  Login = 'admin.login',
}

export enum AnalyticsPermission {
  Payments = 'analytics.payments',
}

export enum AppsPermission {
  Show = 'apps.show',
  Install = 'apps.install',
  Remove = 'apps.remove',
}

export enum AuthPermission {
  Register = 'auth.register',
  PasswordReset = 'auth.password_reset',
  PasswordChange = 'auth.password_change',
  ProvidersManage = 'auth.providers.manage',
  CheckIdentity = 'auth.check_identity',
}

export enum ProfilePermission {
  AddressesManage = 'profile.addresses_manage',
  WishlistManage = 'profile.wishlist_manage',
}

export enum AttributesPermission {
  Show = 'attributes.show',
  Add = 'attributes.add',
  Edit = 'attributes.edit',
  Remove = 'attributes.remove',
  ShowMetadataPrivate = 'attributes.show_metadata_private',
}

export enum BannersPermission {
  Show = 'banners.show',
  Add = 'banners.add',
  Edit = 'banners.edit',
  Remove = 'banners.remove',
  ShowMetadataPrivate = 'banners.show_metadata_private',
}

export enum ProductSetsPermission {
  Show = 'product_sets.show',
  ShowDetails = 'product_sets.show_details',
  ShowHidden = 'product_sets.show_hidden',
  Add = 'product_sets.add',
  Edit = 'product_sets.edit',
  Remove = 'product_sets.remove',
  ShowMetadataPrivate = 'product_sets.show_metadata_private',
}

export enum ConsentsPermission {
  Show = 'consents.show',
  Add = 'consents.add',
  Edit = 'consents.edit',
  Remove = 'consents.remove',
  ShowMetadataPrivate = 'consents.show_metadata_private',
}

export enum CountriesPermission {
  Show = 'countries.show',
}

export enum ShippingMethodsPermission {
  Show = 'shipping_methods.show',
  Add = 'shipping_methods.add',
  Edit = 'shipping_methods.edit',
  Remove = 'shipping_methods.remove',
  ShowMetadataPrivate = 'shipping_methods.show_metadata_private',
}

export enum DepositsPermission {
  Show = 'deposits.show',
  Add = 'deposits.add',
}

export enum CouponsPermission {
  Show = 'coupons.show',
  ShowDetails = 'coupons.show_details',
  Add = 'coupons.add',
  Edit = 'coupons.edit',
  Remove = 'coupons.remove',
  ShowMetadataPrivate = 'coupons.show_metadata_private',
}

export enum SalesPermission {
  Show = 'sales.show',
  Add = 'sales.add',
  Edit = 'sales.edit',
  Remove = 'sales.remove',
  ShowMetadataPrivate = 'sales.show_metadata_private',
}

export enum ItemsPermission {
  Show = 'items.show',
  ShowDetails = 'items.show_details',
  Add = 'items.add',
  Edit = 'items.edit',
  Remove = 'items.remove',
  ShowMetadataPrivate = 'items.show_metadata_private',
}

export enum SchemasPermission {
  Remove = 'schemas.remove',
  ShowMetadataPrivate = 'schemas.show_metadata_private',
}

export enum CartPermission {
  Verify = 'cart.verify',
}

export enum MediaPermission {
  Show = 'media.show',
  ShowMetadataPrivate = 'media.show_metadata_private',
  Add = 'media.add',
  Edit = 'media.edit',
  Remove = 'media.remove',
}

export enum OrdersPermission {
  Show = 'orders.show',
  Add = 'orders.add',
  ShowDetails = 'orders.show_details',
  ShowSummary = 'orders.show_summary',
  Edit = 'orders.edit',
  EditStatus = 'orders.edit.status',
  ShowMetadataPrivate = 'orders.show_metadata_private',
}

export enum PagesPermission {
  Show = 'pages.show',
  ShowDetails = 'pages.show_details',
  ShowHidden = 'pages.show_hidden',
  Add = 'pages.add',
  Edit = 'pages.edit',
  Remove = 'pages.remove',
  ShowMetadataPrivate = 'pages.show_metadata_private',
}

export enum PaymentsPermission {
  Show = 'payments.show',
  ShowDetails = 'payments.show_details',
  Edit = 'payments.edit',
  Add = 'payments.add',
  Offline = 'payments.offline',
}

export enum PaymentMethodsPermission {
  Show = 'payment_methods.show',
  ShowDetails = 'payment_methods.show_details',
  ShowHidden = 'payment_methods.show_hidden',
  Add = 'payment_methods.add',
  Edit = 'payment_methods.edit',
  Remove = 'payment_methods.remove',
}

export enum ProductsPermission {
  Show = 'products.show',
  ShowDetails = 'products.show_details',
  ShowHidden = 'products.show_hidden',
  Add = 'products.add',
  Edit = 'products.edit',
  Remove = 'products.remove',
  ShowMetadataPrivate = 'products.show_metadata_private',
}

export enum SettingsPermission {
  Show = 'settings.show',
  ShowHidden = 'settings.show_hidden',
  ShowDetails = 'settings.show_details',
  Add = 'settings.add',
  Edit = 'settings.edit',
  Remove = 'settings.remove',
  ShowMetadataPrivate = 'settings.show_metadata_private',
}

export enum StatusesPermission {
  Show = 'statuses.show',
  Add = 'statuses.add',
  Edit = 'statuses.edit',
  Remove = 'statuses.remove',
  ShowMetadataPrivate = 'statuses.show_metadata_private',
}

export enum TagsPermission {
  Show = 'tags.show',
  Add = 'tags.add',
  Edit = 'tags.edit',
  Remove = 'tags.remove',
  ShowMetadataPrivate = 'tags.show_metadata_private',
}

export enum UsersPermission {
  Show = 'users.show',
  ShowDetails = 'users.show_details',
  Add = 'users.add',
  Edit = 'users.edit',
  Remove = 'users.remove',
  TfaRemove = 'users.2fa_remove',
  ShowMetadataPrivate = 'users.show_metadata_private',
}

export enum RolesPermission {
  Show = 'roles.show',
  ShowDetails = 'roles.show_details',
  Add = 'roles.add',
  Edit = 'roles.edit',
  Remove = 'roles.remove',
  ShowMetadataPrivate = 'roles.show_metadata_private',
}

export enum SeoPermission {
  Edit = 'seo.edit',
}

export enum WebhooksPermission {
  Show = 'webhooks.show',
  ShowDetails = 'webhooks.show_details',
  Add = 'webhooks.add',
  Edit = 'webhooks.edit',
  Remove = 'webhooks.remove',
  ShowMetadataPrivate = 'webhooks.show_metadata_private',
}

export enum LanguagesPermission {
  ShowHidden = 'languages.show_hidden',
  Add = 'languages.add',
  Edit = 'languages.edit',
  Remove = 'languages.remove',
}

export enum SalesChannelsPermission {
  Add = 'sales_channels.add',
  Edit = 'sales_channels.edit',
  Remove = 'sales_channels.remove',
  ShowHidden = 'sales_channels.show_hidden',
}

export enum RedirectsPermission {
  Show = 'redirects.show',
  Add = 'redirects.add',
  Edit = 'redirects.edit',
  Remove = 'redirects.remove',
}

// -------------------------------------------------------------
// ? General type
// -------------------------------------------------------------

export type Permission =
  | AdminPermission
  | AnalyticsPermission
  | AppsPermission
  | AuthPermission
  | ProfilePermission
  | AttributesPermission
  | BannersPermission
  | ProductSetsPermission
  | ConsentsPermission
  | CountriesPermission
  | ShippingMethodsPermission
  | DepositsPermission
  | CouponsPermission
  | SalesPermission
  | ItemsPermission
  | SchemasPermission
  | CartPermission
  | MediaPermission
  | OrdersPermission
  | PagesPermission
  | PaymentsPermission
  | PaymentMethodsPermission
  | ProductsPermission
  | SettingsPermission
  | StatusesPermission
  | TagsPermission
  | UsersPermission
  | RolesPermission
  | WebhooksPermission
  | SeoPermission
  | LanguagesPermission
  | SalesChannelsPermission
  | RedirectsPermission

export interface PermissionEntry {
  id: UUID
  name: Permission
  // eslint-disable-next-line camelcase
  display_name: string
  description: string
  assignable: boolean
}

export type PermissionsTree = typeof PERMISSIONS_TREE
