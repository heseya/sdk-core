/* eslint-disable camelcase */
import { UUID } from './UUID'

export enum AttributeType {
  Text = 'text',
  Number = 'number',
}

export interface Attribute {
  id: UUID
  name: string
  description: string
  type: AttributeType
  global: boolean
  options: AttributeOption[]
}

export interface AttributeOption {
  id: UUID
  value_text: string
  value: number | null
}

export type AttributeDto = Omit<Attribute, 'id'>

export interface AttributeOptionDto {
  value_text: string
  value: number | null
}

// ?  Attributes in products

export interface ProductListAttribute {
  name: string
  selected_option: AttributeOption
}

export interface ProductAttribute extends ProductListAttribute {
  id: UUID
  description: string
  type: AttributeType
  global: boolean
}
