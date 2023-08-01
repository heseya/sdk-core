import { CartItemSchemaValue } from './CartItem'
import { CreateMetadataFields, MetadataFields } from './Metadata'
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

export interface SchemaBase {
  id: UUID
  name: string
  type: SchemaType
  // TODO: new prices?
  price: number
  hidden: boolean
  required: boolean
  default: string | null
}

export interface SchemaList extends SchemaBase, MetadataFields {
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

export interface SchemaOption extends MetadataFields {
  id: UUID
  name: string
  disabled: boolean
  available: boolean
  // TODO: new prices?
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

export interface OrderSchema {
  id: UUID
  name: string
  // TODO: new prices?
  price: number
  // TODO: new prices?
  price_initial: number
  value: CartItemSchemaValue
}
