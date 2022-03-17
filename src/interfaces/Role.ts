import { MetadataFields } from './Metadata'
import { Permission } from './Permissions'
import { UUID } from './UUID'

export interface Role extends MetadataFields {
  id: UUID
  name: string
  description: string
  assignable: boolean
  permissions: Permission[]
}

export interface RoleDto {
  name: string
  description: string
  permissions: Permission[]
}
