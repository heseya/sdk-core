import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Permission } from './Permissions'
import { UUID } from './UUID'

export interface Role extends MetadataFields {
  id: UUID
  name: string
  description: string
  assignable: boolean
  permissions: Permission[]
}

export interface RoleCreateDto extends CreateMetadataFields {
  name: string
  description: string
  permissions: Permission[]
}

export type RoleUpdateDto = Omit<RoleCreateDto, keyof CreateMetadataFields>
