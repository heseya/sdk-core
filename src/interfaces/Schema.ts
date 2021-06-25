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

export interface Schema {
  id: string
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

export interface SchemaOption {
  id: string
  name: string
  disabled: boolean
  available: boolean
  price: number
  items: SchemaItem[]
}

export interface SchemaItem {
  id: string
  name: string
}
