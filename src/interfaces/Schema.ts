import { CartItemSchemaValue } from './CartItem'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { ProductList } from './Product'
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

export interface SchemaList
  extends SchemaTranslatable,
    Translations<SchemaTranslatable>,
    PublishedTranslations,
    MetadataFields {
  id: UUID
  type: SchemaType
  price: number
  hidden: boolean
  required: boolean
  available: boolean
  min: number | null
  max: number | null
  step: number | null
  default: string | null
  pattern: string | null
  validation: string | null
  options: SchemaOption[]
  used_schemas: string[]
}

export interface Schema extends SchemaList {
  products: ProductList[]
}

/**
 * -----------------------------------------------------------------------------
 * ? Schema DTO
 * -----------------------------------------------------------------------------
 */

export interface SchemaCreateDto
  extends Omit<Schema, 'id' | 'options' | 'translations' | 'published' | keyof MetadataFields>,
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
  price: number
  price_initial: number
  value: CartItemSchemaValue
}
