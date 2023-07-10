import { UUID } from './UUID'

export interface Tag {
  id: UUID
  name: string
  /**
   * String representing hex color of the tag. It is saved without hash (#) sign.
   * @example color: 'ff0000' // for red color.
   */
  color: string
}

export interface TagCreateDto {
  id?: UUID
  name: string
  /**
   * String representing hex color of the tag. It is saved without hash (#) sign.
   * @example color: 'ff0000' // for red color.
   */
  color?: string
}
export type TagUpdateDto = Partial<TagCreateDto>
