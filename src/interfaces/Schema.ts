import { CartItemSchemaValue } from './CartItem'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Price } from './Price'

import { SchemaOption, SchemaOptionDto } from './SchemaOption'

import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface SchemaTranslatable {
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
  min: number | null
  max: number | null
  step: number | null
  options: SchemaOption[]
  used_schemas: UUID[]
  shipping_time: number | null
  shipping_date: string | null
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
  extends Omit<
      Schema,
      | 'id'
      | 'options'
      | 'name'
      | 'description'
      | 'translations'
      | 'published'
      | 'prices'
      | 'shipping_date'
      | 'shipping_time'
      | keyof MetadataFields
    >,
    PublishedTranslationsCreateDto,
    TranslationsCreateDto<SchemaTranslatable>,
    CreateMetadataFields {
  options: SchemaOptionDto[]
}

export type SchemaUpdateDto = Omit<
  SchemaCreateDto,
  keyof CreateMetadataFields | 'translations' | 'published'
> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<SchemaTranslatable>

/**
 * -----------------------------------------------------------------------------
 * ? Order Schema
 * -----------------------------------------------------------------------------
 */

export interface OrderSchema {
  id: UUID
  name: string
  price: Price
  price_initial: Price
  value: CartItemSchemaValue
}
