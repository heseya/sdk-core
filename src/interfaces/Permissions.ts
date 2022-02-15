import { UUID } from './UUID'

// TODO: add all permissions
export type Permission = string

export interface PermissionObject {
  id: UUID
  name: Permission
  // eslint-disable-next-line camelcase
  display_name: string
  description: string
  assignable: boolean
}
