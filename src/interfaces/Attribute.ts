/* eslint-disable camelcase */
import { CreateMetadataFields } from './Metadata'
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
  options: AttributeOption[]
}

// ? ---------------------------------------------------------------
// ? DETAILED
// ? ---------------------------------------------------------------

// DtoHelper
type MakeAttributeDto<Attr, OptionDto> = Omit<Attr, 'id' | 'min' | 'max' | 'options'> & {
  options: (OptionDto & { id?: UUID })[]
}

// * Single Option -------------------------------------------------
interface AttributeSingleOptionOption extends AttributeOptionBase {
  value_number: null
  value_date: null
}
type AttributeSingleOptionOptionCreateDto = Omit<AttributeSingleOptionOption, 'id' | 'index'>
type AttributeSingleOptionOptionUpdateDto = Omit<
  AttributeSingleOptionOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeSingleOption extends AttributeBase {
  type: AttributeType.SingleOption
  min: null
  max: null
  options: AttributeSingleOptionOption[]
}
type AttributeSingleOptionCreateDto = MakeAttributeDto<
  AttributeSingleOption,
  AttributeSingleOptionOptionCreateDto
>
type AttributeSingleOptionUpdateDto = MakeAttributeDto<
  Omit<AttributeSingleOption, keyof CreateMetadataFields>,
  AttributeSingleOptionOptionUpdateDto
>

// * Multi Option --------------------------------------------------------
type AttributeMultiOptionOption = AttributeSingleOptionOption
type AttributeMultiOptionOptionCreateDto = Omit<AttributeMultiOptionOption, 'id' | 'index'>
type AttributeMultiOptionOptionUpdateDto = Omit<
  AttributeMultiOptionOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeMultiOption extends AttributeBase {
  type: AttributeType.MultiChoiceOption
  min: null
  max: null
  options: AttributeMultiOptionOption[]
}
type AttributeMultiOptionCreateDto = MakeAttributeDto<
  AttributeMultiOption,
  AttributeMultiOptionOptionCreateDto
>
type AttributeMultiOptionUpdateDto = MakeAttributeDto<
  Omit<AttributeMultiOption, keyof CreateMetadataFields>,
  AttributeMultiOptionOptionUpdateDto
>

// * Number --------------------------------------------------------
interface AttributeNumberOption extends AttributeOptionBase {
  value_number: number
  value_date: null
}
type AttributeNumberOptionCreateDto = Omit<AttributeNumberOption, 'id' | 'index'>
type AttributeNumberOptionUpdateDto = Omit<
  AttributeNumberOptionCreateDto,
  keyof CreateMetadataFields
>

interface AttributeNumber extends AttributeBase {
  type: AttributeType.Number
  min: number
  max: number
  options: AttributeNumberOption[]
}
type AttributeNumberCreateDto = MakeAttributeDto<AttributeNumber, AttributeNumberOptionCreateDto>
type AttributeNumberUpdateDto = MakeAttributeDto<
  Omit<AttributeNumber, keyof CreateMetadataFields>,
  AttributeNumberOptionUpdateDto
>

// * Date ----------------------------------------------------------
interface AttributeDateOption extends AttributeOptionBase {
  value_number: null
  value_date: string // Date
}
type AttributeDateOptionCreateDto = Omit<AttributeDateOption, 'id' | 'index'>
type AttributeDateOptionUpdateDto = Omit<AttributeDateOptionCreateDto, keyof CreateMetadataFields>

interface AttributeDate extends AttributeBase {
  type: AttributeType.Date
  min: string // Date
  max: string // Date
  options: AttributeDateOption[]
}
type AttributeDateCreateDto = MakeAttributeDto<AttributeDate, AttributeDateOptionCreateDto>
type AttributeDateUpdateDto = MakeAttributeDto<
  Omit<AttributeDate, keyof CreateMetadataFields>,
  AttributeDateOptionUpdateDto
>

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
  selected_options: AttributeOption[]
}

interface ProductAttributeBase extends ProductListAttribute {
  id: UUID
  description: string
  global: boolean
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
