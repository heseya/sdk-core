/* eslint-disable camelcase */
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

// ? ---------------------------------------------------------------
// ? BASE
// ? ---------------------------------------------------------------

export enum AttributeType {
  SingleOption = 'single-option',
  MultiChoiceOption = 'multi-choice-option',
  Number = 'number',
  Date = 'date',
}
interface AttributeOptionBase extends CreateMetadataFields {
  id: UUID
  index: number
  name: string
  value_number: number | null
  value_date: string | null // Date
}
interface AttributeBase extends CreateMetadataFields {
  id: UUID
  name: string
  slug: string
  description: string
  global: boolean
  sortable: boolean
  type: AttributeType
  min: number | string | null
  max: number | string | null
}

// ? ---------------------------------------------------------------
// ? DETAILED
// ? ---------------------------------------------------------------

// DtoHelper
type MakeAttributeDto<Attr> = Omit<Attr, 'id' | 'min' | 'max'>
type MakeAttributeCreateDto<Attr> = MakeAttributeDto<Attr> & { id?: UUID }

// * Single Option -------------------------------------------------
interface AttributeSingleOptionOption extends AttributeOptionBase {
  value_number: null
  value_date: null
}
type AttributeSingleOptionOptionCreateDto = Omit<AttributeSingleOptionOption, 'id' | 'index'> & {
  id?: UUID
}
// May be used in future
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AttributeSingleOptionOptionUpdateDto = Omit<
  AttributeSingleOptionOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeSingleOption extends AttributeBase {
  type: AttributeType.SingleOption
  min: null
  max: null
}
type AttributeSingleOptionCreateDto = MakeAttributeCreateDto<AttributeSingleOption>
type AttributeSingleOptionUpdateDto = MakeAttributeDto<
  Omit<AttributeSingleOption, keyof CreateMetadataFields>
>

// * Multi Option --------------------------------------------------------
type AttributeMultiOptionOption = AttributeSingleOptionOption
type AttributeMultiOptionOptionCreateDto = Omit<AttributeMultiOptionOption, 'id' | 'index'> & {
  id?: UUID
}
// May be used in future
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AttributeMultiOptionOptionUpdateDto = Omit<
  AttributeMultiOptionOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeMultiOption extends AttributeBase {
  type: AttributeType.MultiChoiceOption
  min: null
  max: null
}
type AttributeMultiOptionCreateDto = MakeAttributeCreateDto<AttributeMultiOption>
type AttributeMultiOptionUpdateDto = MakeAttributeDto<
  Omit<AttributeMultiOption, keyof CreateMetadataFields>
>

// * Number --------------------------------------------------------
interface AttributeNumberOption extends AttributeOptionBase {
  value_number: number
  value_date: null
}
type AttributeNumberOptionCreateDto = Omit<AttributeNumberOption, 'id' | 'index'> & {
  id?: UUID
}
// May be used in future
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AttributeNumberOptionUpdateDto = Omit<
  AttributeNumberOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeNumber extends AttributeBase {
  type: AttributeType.Number
  min: number
  max: number
}
type AttributeNumberCreateDto = MakeAttributeCreateDto<AttributeNumber>
type AttributeNumberUpdateDto = MakeAttributeDto<Omit<AttributeNumber, keyof CreateMetadataFields>>

// * Date ----------------------------------------------------------
interface AttributeDateOption extends AttributeOptionBase {
  value_number: null
  value_date: string // Date
}
type AttributeDateOptionCreateDto = Omit<AttributeDateOption, 'id' | 'index'> & {
  id?: UUID
}
// May be used in future
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AttributeDateOptionUpdateDto = Omit<AttributeDateOptionCreateDto, keyof CreateMetadataFields>

interface AttributeDate extends AttributeBase {
  type: AttributeType.Date
  min: string // Date
  max: string // Date
}
type AttributeDateCreateDto = MakeAttributeCreateDto<AttributeDate>
type AttributeDateUpdateDto = MakeAttributeDto<Omit<AttributeDate, keyof CreateMetadataFields>>

// ? ---------------------------------------------------------------
// ? SUMMARY
// ? ---------------------------------------------------------------

export type AttributeOption =
  | AttributeSingleOptionOption
  | AttributeMultiOptionOption
  | AttributeNumberOption
  | AttributeDateOption

export type AttributeOptionDto = Omit<AttributeOptionBase, 'id' | 'index'> & { id?: UUID }

export type Attribute =
  | AttributeSingleOption
  | AttributeMultiOption
  | AttributeNumber
  | AttributeDate

export type ProductSetAttribute = Omit<Attribute, 'options'>

export type AttributeCreateDto =
  | AttributeSingleOptionCreateDto
  | AttributeMultiOptionCreateDto
  | AttributeNumberCreateDto
  | AttributeDateCreateDto

export type AttributeUpdateDto =
  | AttributeSingleOptionUpdateDto
  | AttributeMultiOptionUpdateDto
  | AttributeNumberUpdateDto
  | AttributeDateUpdateDto

// ? ---------------------------------------------------------------
// ? Attributes in products
// ? ---------------------------------------------------------------

export interface ProductListAttribute {
  name: string
  slug: string
  selected_options: AttributeOption[]
}

interface ProductAttributeBase extends ProductListAttribute, MetadataFields {
  id: UUID
  slug: string
  description: string
  global: boolean
  sortable: boolean
}

interface ProductAttributeSingleOption extends ProductAttributeBase {
  type: AttributeType.SingleOption
  selected_options: AttributeSingleOptionOption[]
}
interface ProductAttributeMultiOption extends ProductAttributeBase {
  type: AttributeType.MultiChoiceOption
  selected_options: AttributeSingleOptionOption[]
}
interface ProductAttributeNumber extends ProductAttributeBase {
  type: AttributeType.Number
  selected_options: AttributeNumberOption[]
}
interface ProductAttributeDate extends ProductAttributeBase {
  type: AttributeType.Date
  selected_options: AttributeDateOption[]
}

export type ProductAttribute =
  | ProductAttributeSingleOption
  | ProductAttributeMultiOption
  | ProductAttributeNumber
  | ProductAttributeDate
