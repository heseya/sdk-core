import { UserList } from './User'
import { UUID } from './UUID'

export interface EntityAudits<Entity> {
  id: UUID
  event: 'created' | 'updated'
  created_at: string
  old_values: Partial<Entity>
  new_values: Partial<Entity>
  user: UserList
}
