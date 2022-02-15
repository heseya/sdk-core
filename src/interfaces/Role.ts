import { Permission } from './Permissions'
import { UUID } from './UUID'

export interface Role {
  id: UUID
  name: string
  description: string
  assignable: boolean
  permissions: Permission[]
}

export interface RoleDTO {
  name: string
  description: string
  permissions: Permission[]
}
