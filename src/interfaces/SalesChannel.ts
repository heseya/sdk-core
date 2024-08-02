import { PaymentMethodListed } from './PaymentMethods'
import { PriceMapListed } from './PriceMap'
import { ShippingMethod } from './ShippingMethod'
import { UUID } from './UUID'
import {
  Language,
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

export interface TranslatableSalesChannel {
  name: string
}

export enum SalesChannelStatus {
  Public = 'public',
  Private = 'private',
}

export enum SalesChannelActivity {
  Active = 'active',
  Inactive = 'inactive',
}

export interface OrderSalesChannel extends TranslatableSalesChannel {
  id: UUID
  slug: string
}

export interface SalesChannelListed {
  id: UUID
  slug: string
  name: string
  status: SalesChannelStatus
  activity: SalesChannelActivity
  language: Language
  default: boolean
}

export interface SalesChannel
  extends SalesChannelListed,
    Translations<TranslatableSalesChannel>,
    PublishedTranslations {
  vat_rate: string
  price_map: PriceMapListed
  language: Language
  shipping_methods: ShippingMethod[]
  payment_methods: PaymentMethodListed[]
  organization_count: number
}

export interface SalesChannelCreateDto
  extends TranslationsCreateDto<TranslatableSalesChannel>,
    PublishedTranslationsCreateDto {
  id?: UUID
  slug: string
  status: SalesChannelStatus
  activity: SalesChannelActivity
  vat_rate: string
  language_id: UUID
  price_map_id: UUID
  shipping_method_ids: UUID[]
  payment_method_ids: UUID[]
  default: boolean
}

export type SalesChannelUpdateDto = Partial<
  Omit<SalesChannelCreateDto, 'id' | 'translations' | 'published'>
> &
  TranslationsUpdateDto<TranslatableSalesChannel> &
  PublishedTranslationsUpdateDto
