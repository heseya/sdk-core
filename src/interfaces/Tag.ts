import { UUID } from './UUID'

export interface Tag {
  id: UUID
  name: string
  color: string
}

export type TagCreateDto = Omit<Tag, 'id'>
export type TagUpdateDto = TagCreateDto
