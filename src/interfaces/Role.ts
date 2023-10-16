import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Permission } from './Permissions'
import { UUID } from './UUID'

export interface Role extends MetadataFields {
  id: UUID
  name: string
  description: string
  users_count: number
  assignable: boolean
  permissions: Permission[]
  /**
   * If true, this role can be claimed by users during registration.
   */
  is_registration_role: boolean
  /**
   * If true, this role can be joined by users at any time
   */
  is_joinable: boolean
}

export interface RoleCreateDto extends CreateMetadataFields {
  name: string
  description: string
  permissions: Permission[]
  /**
   * If true, this role can be claimed by users during registration.
   */
  is_registration_role?: boolean
  /**
   * If true, this role can be joined by users at any time
   */
  is_joinable?: boolean
}

export type RoleUpdateDto = Omit<RoleCreateDto, keyof CreateMetadataFields>
