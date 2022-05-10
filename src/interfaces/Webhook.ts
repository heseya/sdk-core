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
export type WebhookEventType = string // TODO: enum with all events

export interface WebhookEventEntry {
  key: WebhookEventType
  name: string
  description: string
  encrypted: boolean
  required_permissions: Permission[]
  required_hidden_permissions: Permission[]
}

export interface WebhookLogEntry {
  id: UUID
  triggered_at: string
  url: string
  status_code: number
}

export interface WebhookEntry {
  id: UUID
  name: string
  url: string
  secret: string
  with_issuer: boolean
  with_hidden: boolean
  events: WebhookEventType[]
  logs: WebhookLogEntry[]
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

interface WebhookEventBase<Payload, DataType = string> {
  event: WebhookEventType
  data_type: DataType
  /**
   * Date ISO 8601
   */
  triggered_at: string
  data: Payload
}

interface WebhookEventWithUser<Payload, DataType> extends WebhookEventBase<Payload, DataType> {
  issuer?: WebhookUserIssuer
  issuer_type: WebhookEventIssuerType.User
}
interface WebhookEventWithApp<Payload, DataType> extends WebhookEventBase<Payload, DataType> {
  issuer?: WebhookAppIssuer
  issuer_type: WebhookEventIssuerType.App
}

/**
 * Webhook event payloads
 *
 * @example WebhookEvent<Order, 'order'>
 */
export type WebhookEvent<Payload, DataType = string> =
  | WebhookEventWithUser<Payload, DataType>
  | WebhookEventWithApp<Payload, DataType>
