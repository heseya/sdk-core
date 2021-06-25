export enum DiscountCodeType {
  Percentage = 0,
  Amount = 1,
}

export interface DiscountCode {
  id: string
  code: string
  description?: string
  type: DiscountCodeType
  discount: number
  uses: number
  max_uses: number
  available: boolean
}
