import { Permission } from './Permissions'
import { UUID } from './UUID'

/**
 * -----------------------------------------------------------------------------
 * ? Webhook CRUD interfaces
 * -----------------------------------------------------------------------------
 */

/**
 * Webhook CRUD entry
 */
export enum WebhookEventType {
  OrderCreated = 'OrderCreated',
  OrderUpdated = 'OrderUpdated',
  OrderUpdatedStatus = 'OrderUpdatedStatus',
  SendOrderUrls = 'SendOrderUrls',
  OrderRequestedShipping = 'OrderRequestedShipping',
  ProductCreated = 'ProductCreated',
  ProductUpdated = 'ProductUpdated',
  ProductDeleted = 'ProductDeleted',
  ProductPriceUpdate = 'ProductPriceUpdate',
  ItemCreated = 'ItemCreated',
  ItemUpdated = 'ItemUpdated',
  ItemUpdatedQuantity = 'ItemUpdatedQuantity',
  ItemDeleted = 'ItemDeleted',
  PageCreated = 'PageCreated',
  PageUpdated = 'PageUpdated',
  PageDeleted = 'PageDeleted',
  ProductSetCreated = 'ProductSetCreated',
  ProductSetUpdated = 'ProductSetUpdated',
  ProductSetDeleted = 'ProductSetDeleted',
  UserCreated = 'UserCreated',
  UserUpdated = 'UserUpdated',
  UserDeleted = 'UserDeleted',
  SaleCreated = 'SaleCreated',
  SaleUpdated = 'SaleUpdated',
  SaleDeleted = 'SaleDeleted',
  CouponCreated = 'CouponCreated',
  CouponUpdated = 'CouponUpdated',
  CouponDeleted = 'CouponDeleted',
  TfaInit = 'TfaInit',
  TfaSecurityCode = 'TfaSecurityCode',
  TfaRecoveryCodesChanged = 'TfaRecoveryCodesChanged',
  PasswordReset = 'PasswordReset',
  SuccessfulLoginAttempt = 'SuccessfulLoginAttempt',
  NewLocalizationLoginAttempt = 'NewLocalizationLoginAttempt',
  FailedLoginAttempt = 'FailedLoginAttempt',
  AddOrderDocument = 'AddOrderDocument',
  RemoveOrderDocument = 'RemoveOrderDocument',
  SendOrderDocument = 'SendOrderDocument',
  OrderUpdatedPaid = 'OrderUpdatedPaid',
  OrderUpdatedShippingNumber = 'OrderUpdatedShippingNumber',
}

export interface WebhookEventEntry {
  key: WebhookEventType
  name: string
  description: string
  encrypted: boolean
  required_permissions: Permission[]
  required_hidden_permissions: Permission[]
}

export interface WebhookEventLog {
  id: UUID
  web_hook: WebhookEventEntry
  event: string //TODO: Should be WebhookEventType, but API returns it but capitalized
  triggered_at: string
  url: string
  status_code: number
  payload: unknown
  response: unknown
}

export interface WebHookEventObject {
  key: WebhookEventType
  name: string
  description: string
  encrypted: boolean
}

export interface WebhookEntry {
  id: UUID
  name: string
  url: string
  secret: string
  with_issuer: boolean
  with_hidden: boolean
  events: WebhookEventType[]
}

export type WebhookEntryCreateDto = Omit<WebhookEntry, 'id' | 'logs'>
export type WebhookEntryUpdateDto = WebhookEntryCreateDto

/**
 * -----------------------------------------------------------------------------
 * ? Webhook emitted events interfaces
 * -----------------------------------------------------------------------------
 */

/**
 * Webhook event issuer type
 */
export enum WebhookEventIssuerType {
  User = 'user',
  App = 'app',
}

interface WebhookUserIssuer {
  id: UUID
  email: string
  name: string
  avatar: string
}

interface WebhookAppIssuer {
  id: UUID
  url: string
  microfrontend_url: string
  name: string
  slug: string
  version: string
  description: string
  icon: string
  author: string
}

interface WebhookEventBase<
  Payload,
  DataType = string,
  Event extends WebhookEventType = WebhookEventType,
> {
  event: Event
  data_type: DataType
  /**
   * Date ISO 8601
   */
  triggered_at: string
  data: Payload
}

interface WebhookEventWithUser<Payload, DataType, Event extends WebhookEventType = WebhookEventType>
  extends WebhookEventBase<Payload, DataType, Event> {
  issuer?: WebhookUserIssuer
  issuer_type: WebhookEventIssuerType.User
}
interface WebhookEventWithApp<Payload, DataType, Event extends WebhookEventType = WebhookEventType>
  extends WebhookEventBase<Payload, DataType, Event> {
  issuer?: WebhookAppIssuer
  issuer_type: WebhookEventIssuerType.App
}

/**
 * Webhook event payloads
 *
 * @example WebhookEvent<Order, 'order'>
 */
export type WebhookEvent<
  Payload,
  DataType = string,
  Event extends WebhookEventType = WebhookEventType,
> = WebhookEventWithUser<Payload, DataType, Event> | WebhookEventWithApp<Payload, DataType, Event>
