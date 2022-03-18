import { UUID } from './UUID'

export interface Tag {
  id: UUID
  name: string
  color: string
}

export type TagDto = Omit<Tag, 'id'>
