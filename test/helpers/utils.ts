import { HeseyaResponse } from '../../src'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveInRandomTime = <FuncType extends (...args: any) => any>(
  cb: FuncType,
  minTime = 100,
  maxTime = 400,
) =>
  new Promise<ReturnType<FuncType>>((resolve) =>
    setTimeout(() => {
      resolve(cb())
      // The greater the spread, the higher chance of token being refreshed before some of the initial requests fails
    }, Math.random() * (maxTime - minTime) + minTime),
  )

export const makeDummyHeseyaResponse = <T>(data: T): HeseyaResponse<T> => ({
  data,
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
})
