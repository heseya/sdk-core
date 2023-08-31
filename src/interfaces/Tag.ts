import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface TagTranslatable {
  name: string
}

export interface Tag extends TagTranslatable, PublishedTranslations, Translations<TagTranslatable> {
  id: UUID
  /**
   * String representing hex color of the tag. It is saved without hash (#) sign.
   * @example color: 'ff0000' // for red color.
   */
  color: string
}

export interface TagCreateDto
  extends PublishedTranslationsCreateDto,
    TranslationsCreateDto<TagTranslatable> {
  id?: UUID
  /**
   * String representing hex color of the tag. It is saved without hash (#) sign.
   * @example color: 'ff0000' // for red color.
   */
  color?: string
}

export type TagUpdateDto = PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<Partial<TagTranslatable>> &
  Pick<TagCreateDto, 'color'>
