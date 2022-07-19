import { App } from './App'
import { UserList } from './User'
import { UUID } from './UUID'

type Issuer =
  | {
      issuer_type: 'user'
      issuer: UserList
    }
  | {
      issuer_type: 'app'
      issuer: App
    }

interface EntityAuditsList<Entity> {
  id: UUID
  event: 'created' | 'updated'
  created_at: string
  old_values: Partial<Entity>
  new_values: Partial<Entity>
}

export type EntityAudits<Entity> = EntityAuditsList<Entity> & Issuer
