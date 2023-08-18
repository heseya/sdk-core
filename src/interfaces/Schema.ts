import { CartItemSchemaValue } from './CartItem'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Price, PriceDto } from './Price'

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

export enum SchemaType {
  String = 'string',
  Select = 'select',
  Numeric = 'numeric',
  Boolean = 'boolean',
  Multiply = 'multiply',
  MultiplySchema = 'multiply_schema',
  Date = 'date',
  File = 'file',
}

interface SchemaTranslatable {
  name: string
  description: string
}

export interface SchemaBase {
  id: UUID
  name: string
  type: SchemaType
  prices: Price[]
  hidden: boolean
  required: boolean
  default: string | null
}

export interface SchemaList
  extends SchemaTranslatable,
    Translations<SchemaTranslatable>,
    PublishedTranslations,
    SchemaBase,
    MetadataFields {
  id: UUID
  type: SchemaType
  description: string
  min: number | null
  max: number | null
  step: number | null
  pattern: string | null
  validation: string | null
  options: SchemaOption[]
  used_schemas: UUID[]
  shipping_time: number | null
  shipping_date: string | null
}

export type Schema = SchemaList

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
  prices: PriceDto[]
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
  // TODO: new prices?
  price: number
  // TODO: new prices?
  price_initial: number
  value: CartItemSchemaValue
}
