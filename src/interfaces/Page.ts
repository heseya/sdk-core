/* eslint-disable camelcase */

import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface PageTranslatableList {
  name: string
}
interface PageTranslatable extends PageTranslatableList {
  content_html: string
  seo?: SeoMetadata
}

export interface PageList extends MetadataFields, Translations<PageTranslatableList> {
  id: UUID
  name: string
  slug: string
  public: boolean
}

export interface Page
  extends MetadataFields,
    PublishedTranslations,
    Translations<PageTranslatable> {
  id: UUID
  name: string
  slug: string
  public: boolean
  content_html: string
  seo?: SeoMetadata
}

export interface PageCreateDto
  extends CreateMetadataFields,
    PublishedTranslationsCreateDto,
    TranslationsCreateDto<PageTranslatable> {
  slug: string
  public?: boolean
}

export interface PageUpdateDto
  extends PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<Partial<PageTranslatable>> {
  slug?: string
  public?: boolean
}
