import { CreateMetadataFields, MetadataFields } from './Metadata'
import { OrderPrice } from './Price'

import { SchemaOption, SchemaOptionCreateDto, SchemaOptionUpdateDto } from './SchemaOption'

import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

export interface SchemaTranslatable {
  name: string
  description: string
}

export interface SchemaBase {
  id: UUID
  name: string
  hidden: boolean
  required: boolean
  default: string | null
}

export interface SchemaListed
  extends SchemaTranslatable,
    Translations<SchemaTranslatable>,
    PublishedTranslations,
    SchemaBase,
    MetadataFields {
  id: UUID
  product_id: UUID
  description: string
  options: SchemaOption[]
  used_schemas: UUID[]
  shipping_time: number | null
  shipping_date: string | null
  available: boolean
}

/**
 * @deprecated use SchemaListed instead
 */
export type SchemaList = SchemaListed

export type Schema = SchemaListed

/**
 * -----------------------------------------------------------------------------
 * ? Schema DTO
 * -----------------------------------------------------------------------------
 */

export interface SchemaCreateDto
  extends PublishedTranslationsCreateDto,
    TranslationsCreateDto<SchemaTranslatable>,
    CreateMetadataFields {
  id?: UUID
  options: SchemaOptionCreateDto[]
  required: boolean
  used_schemas: UUID[]
  product_id: UUID | null
  hidden: boolean
}

export type SchemaUpdateDto = Omit<
  SchemaCreateDto,
  keyof CreateMetadataFields | 'translations' | 'published' | 'options'
> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<SchemaTranslatable> & {
    options: SchemaOptionUpdateDto[]
  }

/**
 * -----------------------------------------------------------------------------
 * ? Order Schema
 * -----------------------------------------------------------------------------
 */

export interface OrderSchema {
  id: UUID
  name: string
  price: OrderPrice
  price_initial: OrderPrice
  value: string
}
