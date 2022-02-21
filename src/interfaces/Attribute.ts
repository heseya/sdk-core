/* eslint-disable camelcase */
import { UUID } from './UUID'

// ? ---------------------------------------------------------------
// ? BASE
// ? ---------------------------------------------------------------

export enum AttributeType {
  SingleOption = 'single-option',
  Number = 'number',
  Date = 'date',
}
interface AttributeOptionBase {
  id: UUID
  index: number
  name: string
  value_number: number | null
  value_date: string | null // Date
}
interface AttributeBase {
  id: UUID
  name: string
  slug: string
  description: string
  global: boolean
  sortable: boolean
  type: AttributeType
  min: number | string | null
  max: number | string | null
  options: AttributeOption[]
}

// ? ---------------------------------------------------------------
// ? DETAILED
// ? ---------------------------------------------------------------

// DtoHelper
type MakeAttributeDto<Attr, Option> = Omit<Attr, 'id' | 'min' | 'max' | 'options'> & {
  options: (Option & { id?: UUID })[]
}

// * Single Option -------------------------------------------------
interface AttributeSingleOptionOption extends AttributeOptionBase {
  value_number: null
  value_date: null
}
type AttributeSingleOptionOptionDto = Omit<AttributeSingleOptionOption, 'id' | 'index'>

interface AttributeSingleOption extends AttributeBase {
  type: AttributeType.SingleOption
  min: null
  max: null
  options: AttributeSingleOptionOption[]
}
type AttributeSingleOptionDto = MakeAttributeDto<AttributeSingleOption, AttributeSingleOptionOption>

// * Number --------------------------------------------------------
interface AttributeNumberOption extends AttributeOptionBase {
  value_number: number
  value_date: null
}
type AttributeNumberOptionDto = Omit<AttributeNumberOption, 'id' | 'index'>

interface AttributeNumber extends AttributeBase {
  type: AttributeType.Date
  min: number
  max: number
  options: AttributeNumberOption[]
}
type AttributeNumberDto = MakeAttributeDto<AttributeNumber, AttributeNumberOption>

// * Date ----------------------------------------------------------
interface AttributeDateOption extends AttributeOptionBase {
  value_number: null
  value_date: string // Date
}
type AttributeDateOptionDto = Omit<AttributeDateOption, 'id' | 'index'>

interface AttributeDate extends AttributeBase {
  type: AttributeType.Date
  min: string // Date
  max: string // Date
  options: AttributeDateOption[]
}
type AttributeDateDto = MakeAttributeDto<AttributeDate, AttributeDateOption>

// ? ---------------------------------------------------------------
// ? SUMMARY
// ? ---------------------------------------------------------------

export type AttributeOption =
  | AttributeSingleOptionOption
  | AttributeNumberOption
  | AttributeDateOption

export type AttributeOptionDto =
  | AttributeSingleOptionOptionDto
  | AttributeNumberOptionDto
  | AttributeDateOptionDto

export type Attribute = AttributeSingleOption | AttributeNumber | AttributeDate

export type AttributeDto = AttributeSingleOptionDto | AttributeNumberDto | AttributeDateDto

// ? ---------------------------------------------------------------
// ? Attributes in products
// ? ---------------------------------------------------------------

export interface ProductListAttribute {
  name: string
  selected_option: AttributeOption
}

interface ProductAttributeBase extends ProductListAttribute {
  id: UUID
  description: string
  global: boolean
}

interface ProductAttributeSingleOption extends ProductAttributeBase {
  type: AttributeType.SingleOption
  selected_option: AttributeSingleOptionOption
}
interface ProductAttributeNumber extends ProductAttributeBase {
  type: AttributeType.Number
  selected_option: AttributeNumberOption
}
interface ProductAttributeDate extends ProductAttributeBase {
  type: AttributeType.Date
  selected_option: AttributeDateOption
}

export type ProductAttribute =
  | ProductAttributeSingleOption
  | ProductAttributeNumber
  | ProductAttributeDate
