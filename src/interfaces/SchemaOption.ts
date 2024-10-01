import { MetadataFields } from './Metadata'
import { Price } from './Price'
import { UUID } from './UUID'
import { Translations, TranslationsCreateDto } from './languages'

export interface SchemaOptionTranslatable {
  name: string
}

export interface SchemaOption
  extends MetadataFields,
    SchemaOptionTranslatable,
    Translations<SchemaOptionTranslatable> {
  id: UUID
  available: boolean
  price: Price
  items: SchemaItem[]
  default: boolean
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
      'id' | 'items' | 'translations' | 'name' | 'price' | 'available' | keyof MetadataFields
    >,
    TranslationsCreateDto<SchemaOptionTranslatable> {
  items: UUID[]
}

export interface SchemaOptionUpdateDto extends SchemaOptionCreateDto {
  id?: UUID
}
