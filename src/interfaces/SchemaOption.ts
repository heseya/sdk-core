import { MetadataFields } from './Metadata'
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
  // TODO: new prices?
  price: number
  items: SchemaItem[]
}

export interface SchemaItem {
  id: UUID
  name: string
}

export interface SchemaOptionDto
  extends Omit<SchemaOption, 'id' | 'items' | 'translations' | 'name' | keyof MetadataFields>,
    TranslationsCreateDto<SchemaOptionTranslatable> {
  items: UUID[]
}
