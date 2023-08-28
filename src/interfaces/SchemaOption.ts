import { MetadataFields } from './Metadata'
import { Price, PriceDto } from './Price'
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
  disabled: boolean
  available: boolean
  prices: Price[]
  items: SchemaItem[]
}

export interface SchemaItem {
  id: UUID
  name: string
  sku: string
}

export interface SchemaOptionDto
  extends Omit<
      SchemaOption,
      'id' | 'items' | 'translations' | 'name' | 'prices' | keyof MetadataFields
    >,
    TranslationsCreateDto<SchemaOptionTranslatable> {
  items: UUID[]
  prices: PriceDto[]
}
