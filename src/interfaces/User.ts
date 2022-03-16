/* eslint-disable camelcase */
import { UUID } from './UUID'
import { Role } from './Role'
import { Permission } from './Permissions'

import { UserSavedAddress } from './Address'
import { MetadataFields } from './Metadata'

export interface User extends MetadataFields {
  id: UUID
  name: string
  email: string
  avatar: string
  is_tfa_active: boolean
  roles: Role[]
  permissions: Permission[]
  delivery_addresses: UserSavedAddress[]
  invoice_addresses: UserSavedAddress[]
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  roles: UUID[]
}
export interface EditUserDTO {
  id: UUID
  name: string
  email: string
  roles: UUID[]
}
