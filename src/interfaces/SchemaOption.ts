import { MetadataFields } from './Metadata'
import { Price } from './Price'
import { UUID } from './UUID'
import { Translations, TranslationsCreateDto } from './languages'

interface SchemaOptionTranslatable {
  name: string
}

export interface SchemaOption
  extends MetadataFields,
    SchemaOptionTranslatable,
    Translations<SchemaOptionTranslatable> {
  id: UUID
  available: boolean
  // @deprecated there will be some other price
  prices: Price[]
  price: Price
  items: SchemaItem[]
}

export interface SchemaItem {
  id: UUID
  name: string
  sku: string
  quantity: number
}

export interface SchemaOptionCreateDto
  extends Omit<
      SchemaOption,
      'id' | 'items' | 'translations' | 'name' | 'prices' | keyof MetadataFields
    >,
    TranslationsCreateDto<SchemaOptionTranslatable> {
  items: UUID[]
}

export interface SchemaOptionUpdateDto extends SchemaOptionCreateDto {
  id?: UUID
}

// @deprecated use SchemaOptionCreateDto or SchemaOptionUpdateDto instead
export type SchemaOptionDto = SchemaOptionCreateDto
