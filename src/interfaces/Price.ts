import { StrNumber } from './Number'
import { UUID } from './UUID'

interface PriceBase {
  gross: StrNumber
  net: StrNumber
  currency: string
}

export interface Price extends PriceBase {
  sales_channel_id: UUID
}

export interface PriceDto {
  /**
   * This is currently net value
   */
  value: StrNumber
  currency: string
}

export interface OrderPrice extends PriceBase {
  vat_rate: StrNumber
}
