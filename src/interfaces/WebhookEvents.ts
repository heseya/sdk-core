import { WebhookEvent, WebhookEventType as WebEv } from './Webhook'

import { Order } from './Order'
import { Product } from './Product'
import { WarehouseItem } from './WarehouseItem'
import { Page } from './Page'
import { ProductSet } from './ProductSet'
import { User } from './User'
import { Coupon, Sale } from './SalesAndCoupons'
import { OrderDocument } from './OrderDocuments'

export type WebhookEventOrderCreated = WebhookEvent<Order, 'Order', WebEv.OrderCreated>
export type WebhookEventOrderUpdated = WebhookEvent<Order, 'Order', WebEv.OrderUpdated>
export type WebhookEventOrderUpdatedStatus = WebhookEvent<Order, 'Order', WebEv.OrderUpdatedStatus>
export type WebhookEventOrderUpdatedPaid = WebhookEvent<Order, 'Order', WebEv.OrderUpdatedPaid>
export type WebhookEventOrderUpdatedShippingNumber = WebhookEvent<
  Order,
  'Order',
  WebEv.OrderUpdatedShippingNumber
>
export type WebhookEventSendOrderUrls = WebhookEvent<Order, 'Order', WebEv.SendOrderUrls>

export type WebhookEventProductCreated = WebhookEvent<Product, 'Product', WebEv.ProductCreated>
export type WebhookEventProductUpdated = WebhookEvent<Product, 'Product', WebEv.ProductUpdated>
export type WebhookEventProductDeleted = WebhookEvent<Product, 'Product', WebEv.ProductDeleted>

export type WebhookEventProductPriceUpdate = WebhookEvent<
  Product,
  'ProductPrices',
  WebEv.ProductPriceUpdate
>

export type WebhookEventItemCreated = WebhookEvent<WarehouseItem, 'Item', WebEv.ItemCreated>
export type WebhookEventItemUpdated = WebhookEvent<WarehouseItem, 'Item', WebEv.ItemUpdated>
export type WebhookEventItemUpdatedQuantity = WebhookEvent<WarehouseItem, 'Item', WebEv.ItemUpdated>
export type WebhookEventItemDeleted = WebhookEvent<WarehouseItem, 'Item', WebEv.ItemDeleted>

export type WebhookEventPageCreated = WebhookEvent<Page, 'Page', WebEv.PageCreated>
export type WebhookEventPageUpdated = WebhookEvent<Page, 'Page', WebEv.PageUpdated>
export type WebhookEventPageDeleted = WebhookEvent<Page, 'Page', WebEv.PageDeleted>

export type WebhookEventProductSetCreated = WebhookEvent<
  ProductSet,
  'ProductSet',
  WebEv.ProductSetCreated
>
export type WebhookEventProductSetUpdated = WebhookEvent<
  ProductSet,
  'ProductSet',
  WebEv.ProductSetUpdated
>
export type WebhookEventProductSetDeleted = WebhookEvent<
  ProductSet,
  'ProductSet',
  WebEv.ProductSetDeleted
>

export type WebhookEventUserCreated = WebhookEvent<User, 'User', WebEv.UserCreated>
export type WebhookEventUserUpdated = WebhookEvent<User, 'User', WebEv.UserUpdated>
export type WebhookEventUserDeleted = WebhookEvent<User, 'User', WebEv.UserDeleted>

export type WebhookEventSaleCreated = WebhookEvent<Sale, 'Sale', WebEv.SaleCreated>
export type WebhookEventSaleUpdated = WebhookEvent<Sale, 'Sale', WebEv.SaleUpdated>
export type WebhookEventSaleDeleted = WebhookEvent<Sale, 'Sale', WebEv.SaleDeleted>

export type WebhookEventCouponCreated = WebhookEvent<Coupon, 'Coupon', WebEv.CouponCreated>
export type WebhookEventCouponUpdated = WebhookEvent<Coupon, 'Coupon', WebEv.CouponUpdated>
export type WebhookEventCouponDeleted = WebhookEvent<Coupon, 'Coupon', WebEv.CouponDeleted>

export type WebhookEventTfaInit = WebhookEvent<
  { security_code: string; user: User },
  'TfaCode',
  WebEv.TfaInit
>
export type WebhookEventTfaSecurityCode = WebhookEvent<
  { security_code: string; user: User },
  'TfaCode',
  WebEv.TfaSecurityCode
>

export type WebhookEventTfaRecoveryCodesChanged = WebhookEvent<
  User,
  'User',
  WebEv.TfaRecoveryCodesChanged
>

export type WebhookEventPasswordReset = WebhookEvent<
  { recovery_url: string; user: User; redirect_url: string },
  'PasswordRecovery',
  WebEv.PasswordReset
>

export type WebhookEventAddOrderDocument = WebhookEvent<
  { order: Order; document: OrderDocument },
  'OrderDocument',
  WebEv.AddOrderDocument
>
export type WebhookEventRemoveOrderDocument = WebhookEvent<
  { order: Order; document: OrderDocument },
  'OrderDocument',
  WebEv.RemoveOrderDocument
>

export type WebhookEventSendOrderDocument = WebhookEvent<
  { order: Order; documents: OrderDocument[] },
  'SendOrderDocument',
  WebEv.SendOrderDocument
>

export type WebhookEventNewLocalizationLoginAttempt = WebhookEvent<
  { user_agent: string; ip: string; user: User; date: string },
  'LocalizedLoginAttempt',
  WebEv.NewLocalizationLoginAttempt
>
export type WebhookEventSuccessfullLoginAttempt = WebhookEvent<
  { user_agent: string; ip: string; user: User; date: string },
  'LocalizedLoginAttempt',
  WebEv.SuccessfulLoginAttempt
>
export type WebhookEventFailedLoginAttempt = WebhookEvent<
  { user_agent: string; ip: string; user: User; date: string },
  'LocalizedLoginAttempt',
  WebEv.FailedLoginAttempt
>
