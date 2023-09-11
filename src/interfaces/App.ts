import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Permission, PermissionEntry } from './Permissions'
import { UUID } from './UUID'

export interface AppInternalPermission extends Omit<PermissionEntry, 'name'> {
  unauthenticated?: boolean
  name: string
}

export interface App extends MetadataFields {
  id: UUID
  name: string
  url: string
  microfrontend_url?: string
  slug: string
  version: string
  description?: string
  icon?: string
  author?: string
  permissions: Permission[]
}

export interface AppCreateDto extends CreateMetadataFields {
  url: string
  name?: string // [TODO]
  licence_key?: string
  allowed_permissions: string[]
  public_app_permissions?: string[]
}

export interface IntegrationInfo {
  name: string
  description: string
  author: string
  version: string
  icon?: string
  microfrontend_url?: string
  licence_required?: boolean
  api_version: string // '^1.2.0' [TODO]
  required_permissions: Permission[]
  optional_permissions?: Permission[]
  internal_permissions: AppInternalPermission[]
}

//  CONFIG

interface AppConfigBase {
  key: string
  label: string
  placeholder: string
  type: string
  default_value: string | number | boolean
  required: boolean
  value?: string | number | boolean
}
interface AppConfigInput extends AppConfigBase {
  type: 'text' | 'number' | 'color' | 'date' | 'datetime-local' | 'checkbox'
}

interface AppConfigSelect extends AppConfigBase {
  type: 'select'
  options: { value: string; label: string }[]
}

export type AppConfigField = AppConfigSelect | AppConfigInput

// Actions

export interface AppAction {
  method: 'post' | 'patch' | 'get' | 'put' | 'delete'
  /**
   * Relative string, without app domain
   */
  url: string
  /**
   * Permissions required to run action
   */
  permissions: string[]
  /**
   * Text to describe action
   */
  name: string
}
