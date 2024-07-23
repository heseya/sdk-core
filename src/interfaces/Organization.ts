import { UUID } from './UUID'
import { Address } from './Address'
import { SalesChannel } from './SalesChannel'
import { Consent } from './Consent'

/**
 * ? -----------------------------------------------------------------------------
 * ? Organization CRUD
 * ? -----------------------------------------------------------------------------
 */

export interface OrganizationCreateDto {
  id?: UUID
  client_id: string | null
  billing_email: string
  billing_address: Address
  consents: Record<UUID, boolean>
  sales_channel_id?: UUID
  shipping_addresses: OrganizationSavedAddress[]
}

export interface OrganizationRegisterDto {
  billing_email: string
  billing_address: Address
  // Wszystkie adresy dostawy są niezweryfikowane
  shipping_adresses: OrganizationSavedAddressCreateDto[]
  consents: Record<UUID, boolean>
  // Dane osoby tworzącej organizacje, na ich podstawie utworzony zostanie użytkownik
  creator_email: string
  creator_password: string
  creator_name: string
}

export interface OrganizationUpdateDto {
  client_id?: string | null
  billing_email?: string
  billing_address?: Address
  sales_channel_id?: UUID
  consents?: Record<UUID, boolean>
}

export interface OrganizationPublicUpdateDto {
  billing_email?: string
  billing_address?: Address
  consents: Record<UUID, boolean>
}

/**
 * ? -----------------------------------------------------------------------------
 * ? Organization resource
 * ? -----------------------------------------------------------------------------
 */

export interface OrganizationListed {
  id: UUID
  client_id: string | null
  billing_email: string
  billing_address: Address
  sales_channel: SalesChannel
}

export interface Organization extends OrganizationListed {
  consents: (Consent & { value: boolean })[]
}

/**
 * ? -----------------------------------------------------------------------------
 * ? Organization shipping addresses
 * ? -----------------------------------------------------------------------------
 */
export interface OrganizationSavedAddress {
  id: UUID
  default: boolean
  name: string
  address: Address
}
export interface OrganizationSavedAddressCreateDto {
  id?: UUID
  default: boolean
  name: string
  address: Address
}
export interface OrganizationSavedAddressUpdateDto {
  default: boolean
  name: string
  address: Address
}
