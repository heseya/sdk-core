import { UUID } from './UUID'
import { Address } from './Address'
import { SalesChannel } from './SalesChannel'
import { User } from './User'

export enum OrganizationStatus {
  Unverified = 'Unverified',
  Verified = 'Verified',
  Rejected = 'Rejected',
}

export interface OrganizationCreateDto {
  name: string
  description?: string
  email: string
  phone: string
  address: Address
}

export interface OrganizationUpdateDto {
  name?: string
  description?: string
  email?: string
  phone?: string
  address?: Address
  sales_channel_id?: UUID
}

export interface OrganizationBase {
  id: UUID
  name: string
  description: string
  phone: string
  email: string
  address: Address
  status: OrganizationStatus
  sales_channel: SalesChannel
}

export interface OrganizationDetail extends OrganizationBase {
  assistants: User[]
  users: User[]
}
