import { StrNumber } from './Number'

export interface AnalyticsPayment {
  amount: StrNumber
  count: number
  currency: string
}

export interface AnalyticsPaymentsSummary {
  [key: string]: AnalyticsPayment[]
}
