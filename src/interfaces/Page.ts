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

interface PageTranslatableList {
  name: string
}
interface PageTranslatable extends PageTranslatableList {
  content_html: string
  seo?: SeoMetadata
}

type PageTranslatableDto = Omit<PageTranslatable, 'seo'> & { seo?: SeoMetadataDto }

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
    TranslationsCreateDto<PageTranslatableDto> {
  slug: string
  public?: boolean
}

export interface PageUpdateDto
  extends PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<Partial<PageTranslatableDto>> {
  slug?: string
  public?: boolean
}
