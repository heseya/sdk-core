/* eslint-disable camelcase */
import { UUID } from './UUID'
import { Role } from './Role'
import { Permission } from './Permissions'

import { UserSavedAddress } from './Address'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UserConsent, UserConsentDto } from './Consent'

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
  consents: UserConsent[]
}

export interface UserUpdateDto {
  name: string
  email: string
  roles: UUID[]
}

export interface UserCreateDto extends UserUpdateDto, CreateMetadataFields {
  password: string
}

export interface UserRegisterDto {
  name: string
  email: string
  password: string
  consents: UserConsentDto
}

export interface UserProfileUpdateDto {
  name?: string
  preferences?: UserPreferences
  consents?: UserConsentDto[]
}

export interface UserPreferences {
  successfull_login_attempt_alert: boolean
  failed_login_attempt_alert: boolean
  new_localization_login_alert: boolean
  recovery_code_changed_alert: boolean
}
