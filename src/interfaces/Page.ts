/* eslint-disable camelcase */

import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata, SeoMetadataDto } from './Seo'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface PageTranslatableListed {
  name: string
}
interface PageTranslatable extends PageTranslatableListed {
  content_html: string
}

export interface PageListed extends MetadataFields, Translations<PageTranslatableListed> {
  id: UUID
  name: string
  slug: string
  public: boolean
}

/**
 * @deprecated use PageListed instead
 */
export type PageList = PageListed

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
  seo?: SeoMetadataDto
}

export interface PageUpdateDto
  extends PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<Partial<PageTranslatable>> {
  slug?: string
  public?: boolean
  seo?: SeoMetadataDto
}
