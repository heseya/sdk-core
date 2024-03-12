import { UUID } from '../UUID'

export interface PublishedTranslations {
  /**
   * Array of language ids for which this entity is published
   */
  published: UUID[]
}

export type PublishedTranslationsCreateDto = PublishedTranslations
export type PublishedTranslationsUpdateDto = Partial<PublishedTranslations>

export type TranslationsRecord<Content extends object> = Record<UUID, Content>

/**
 * Map that contains translations for any given language (UUID is id of language)
 */
export type Translations<Content extends object> = {
  translations?: TranslationsRecord<Content>
}

/**
 * Map that contains translations for any given language (UUID is id of language)
 */
export type TranslationsCreateDto<ContentDto extends object> = {
  translations: TranslationsRecord<ContentDto>
}

/**
 * Map that contains translations for any given language (UUID is id of language)
 */
export type TranslationsUpdateDto<ContentDto extends object> = {
  translations?: TranslationsRecord<ContentDto>
}
