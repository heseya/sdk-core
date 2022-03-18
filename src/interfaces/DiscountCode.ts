import { MetadataFields } from './Metadata'
import { UUID } from './UUID'

export enum DiscountCodeType {
  Percentage = 0,
  Amount = 1,
}

export interface DiscountCode extends MetadataFields {
  id: UUID
  code: string
  description?: string
  type: DiscountCodeType
  discount: number
  uses: number
  max_uses: number
  available: boolean
  starts_at: string | null
  expires_at: string | null
}

export type DiscountCodeDto = Omit<DiscountCode, 'id' | 'uses'>
