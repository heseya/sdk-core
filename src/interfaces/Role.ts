import { UUID } from './UUID'

export interface Role {
  id: UUID
  name: string
  description: string
  assignable: boolean
  permissions: string[] // Permission[]
}

export interface RoleDTO {
  name: string
  description: string
  permissions: string[] // Permission[]
}
