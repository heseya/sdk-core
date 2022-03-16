import { MetadataFields } from './Metadata'
import { UUID } from './UUID'

export enum SchemaType {
  String = 'string',
  Select = 'select',
  Numeric = 'numeric',
  Boolean = 'boolean',
  Multiply = 'multiply',
  MultiplySchema = 'multiply_schema',
  // Date = 'date',
  // File = 'file',
}

export interface Schema extends MetadataFields {
  id: UUID
  name: string
  type: SchemaType
  description: ''
  price: number
  hidden: boolean
  required: boolean
  available: boolean
  min: number
  max: number
  step: number
  default: string
  pattern: string
  validation: string
  options: SchemaOption[]
  used_schemas: string[]
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
