import { CreateMetadataFields, MetadataFields } from './Metadata'
import { ProductList } from './Product'
import { UUID } from './UUID'

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

export interface SchemaList extends MetadataFields {
  id: UUID
  name: string
  type: SchemaType
  description: string
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

export interface SchemaOption extends MetadataFields {
  id: UUID
  name: string
  disabled: boolean
  available: boolean
  price: number
  items: SchemaItem[]
}

export interface SchemaItem {
  id: UUID
  name: string
}

/**
 * -----------------------------------------------------------------------------
 * ? Schema DTO
 * -----------------------------------------------------------------------------
 */

export interface SchemaOptionDto extends Omit<SchemaOption, 'id' | 'items' | keyof MetadataFields> {
  items: UUID[]
}

export interface SchemaCreateDto
  extends Omit<Schema, 'id' | 'options' | keyof MetadataFields>,
    CreateMetadataFields {
  options: SchemaOptionDto[]
}
export type SchemaUpdateDto = Omit<SchemaCreateDto, keyof CreateMetadataFields>
