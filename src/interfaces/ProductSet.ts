import { ProductSetAttribute } from './Attribute'
import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata, SeoMetadataDto } from './Seo'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface ProductSetTranslatableList {
  name: string
}
interface ProductSetTranslatable extends ProductSetTranslatableList {
  description_html: string
}

export interface ProductSetList
  extends ProductSetTranslatableList,
    Translations<ProductSetTranslatableList>,
    PublishedTranslations,
    MetadataFields {
  id: UUID
  slug: string
  slug_suffix: string
  slug_override: boolean
  cover: CdnMedia | null
  public: boolean
  visible: boolean
  attributes: ProductSetAttribute[]
  parent_id: string | null
  children?: ProductSet[]
  children_ids?: UUID[]
  seo?: SeoMetadata
}

export interface ProductSet
  extends ProductSetTranslatable,
    Translations<ProductSetTranslatable>,
    PublishedTranslations,
    Omit<ProductSetList, 'parent_id' | 'translations'> {
  parent: ProductSetList | null
}

export interface ProductSetCreateDto
  extends CreateMetadataFields,
    PublishedTranslationsCreateDto,
    TranslationsCreateDto<ProductSetTranslatable> {
  id?: UUID
  slug_suffix: string
  slug_override: boolean
  parent_id?: UUID | null
  public?: boolean
  children_ids?: UUID[]
  cover_id?: UUID
  attributes?: UUID[]
  seo?: SeoMetadataDto
}

export type ProductSetUpdateDto = Omit<
  Partial<ProductSetCreateDto>,
  keyof CreateMetadataFields | 'id'
> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<Partial<ProductSetTranslatable>>
