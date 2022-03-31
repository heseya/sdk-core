/* eslint-disable camelcase */
import { UUID } from './UUID'
import { Role } from './Role'
import { Permission } from './Permissions'

import { UserSavedAddress } from './Address'
import { MetadataFields } from './Metadata'

export interface UserList extends MetadataFields {
  id: UUID
  name: string
  email: string
  avatar: string
  is_tfa_active: boolean
  roles: Role[]
}

export interface User extends UserList {
  permissions: Permission[]
  delivery_addresses: UserSavedAddress[]
  invoice_addresses: UserSavedAddress[]
}

export interface UserUpdateDto {
  name: string
  email: string
  roles: UUID[]
}

export interface UserCreateDto extends UserUpdateDto {
  password: string
}
