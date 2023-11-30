/* eslint-disable camelcase */
import { UUID } from './UUID'
import { Role } from './Role'
import { Permission } from './Permissions'

import { UserSavedAddress } from './Address'
import { CreateMetadataFields, Metadata, MetadataFields } from './Metadata'
import { UserConsent, UserConsentDto } from './Consent'

export interface UserList extends MetadataFields {
  id: UUID
  name: string
  email: string
  /**
   * ISO 8601 date string
   */
  birthday_date: string | null
  /**
   * Full phone number
   */
  phone: string | null
  /**
   * Country code for the phone
   */
  phone_country: string | null
  /**
   * Phone number without country prefix
   */
  phone_number: string | null
  /**
   * URL to the user's avatar
   */
  avatar: string
  is_tfa_active: boolean
  roles: Role[]
  metadata_personal?: Metadata
  created_at: string
}

export interface User extends UserList {
  permissions: Permission[]
  preferences: UserPreferences
  shipping_addresses: UserSavedAddress[]
  billing_addresses: UserSavedAddress[]
  consents: UserConsent[]
  organization_token?: string
}

export interface UserUpdateDto {
  name: string
  email: string
  /**
   * ISO 8601 date string
   */
  birthday_date?: string
  /**
   * Full phone number
   */
  phone?: string
  roles: UUID[]
  email_verify_url: string
}

export interface UserCreateDto extends UserUpdateDto, CreateMetadataFields {
  password: string
}

export interface UserRegisterDto {
  name: string
  email: string
  /**
   * ISO 8601 date string
   */
  birthday_date?: string
  /**
   * Full phone number
   */
  phone?: string
  /**
   * List of role IDs to assign to the user
   */
  roles?: UUID[]
  password: string
  consents: UserConsentDto
  metadata_personal?: Metadata
  email_verify_url: string
}

export interface UserProfileUpdateDto {
  name?: string
  /**
   * ISO 8601 date string
   */
  birthday_date?: string
  /**
   * Full phone number
   */
  phone?: string
  consents?: UserConsentDto
  preferences?: UserPreferences
}

export interface UserPreferences {
  successful_login_attempt_alert: boolean
  failed_login_attempt_alert: boolean
  new_localization_login_alert: boolean
  recovery_code_changed_alert: boolean
}
