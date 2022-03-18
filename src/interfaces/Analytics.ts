export interface AnalyticsPayment {
  amount: number
  count: number
}

export interface AnalyticsPaymentsSummary {
  [key: string]: AnalyticsPayment
}
