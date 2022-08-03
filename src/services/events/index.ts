import { EventCallbackFunction, HeseyaEventToPayloadMap, HeseyaEventType } from './utils/types'

export interface HeseyaEventListenerService {
  emit: <Key extends HeseyaEventType>(
    event: Key,
    ...payloads: HeseyaEventToPayloadMap[Key] extends undefined
      ? [undefined?]
      : [HeseyaEventToPayloadMap[Key]]
  ) => void
  on: <Key extends HeseyaEventType>(
    event: Key,
    cb: EventCallbackFunction<HeseyaEventToPayloadMap[Key]>,
  ) => void
  unsubscribe: <Key extends HeseyaEventType>(
    event: Key,
    cb: EventCallbackFunction<HeseyaEventToPayloadMap[Key]>,
  ) => void
}

export const createHeseyaEventListenerService = (): HeseyaEventListenerService => {
  const map: Record<HeseyaEventType, EventCallbackFunction<unknown>[]> = {
    [HeseyaEventType.AddToCart]: [],
    [HeseyaEventType.AddToWishlist]: [],
    [HeseyaEventType.CompleteRegistration]: [],
    [HeseyaEventType.Contact]: [],
    [HeseyaEventType.CustomizeProduct]: [],
    [HeseyaEventType.Donate]: [],
    [HeseyaEventType.FindLocation]: [],
    [HeseyaEventType.InitiateCheckout]: [],
    [HeseyaEventType.Lead]: [],
    [HeseyaEventType.OnPurchase]: [],
    [HeseyaEventType.RemoveFromCart]: [],
    [HeseyaEventType.Schedule]: [],
    [HeseyaEventType.Search]: [],
    [HeseyaEventType.SignUp]: [],
    [HeseyaEventType.ViewContent]: [],
  }
  return {
    emit: (event, payload = undefined) => {
      map[event].forEach((cb) => {
        cb(payload)
      })
    },

    on: (event, cb) => {
      map[event].push(cb as EventCallbackFunction<unknown>)
    },

    unsubscribe: (event, cb) => {
      map[event] = map[event].filter((el) => el !== cb)
    },
  }
}

export { HeseyaEventType } from './utils/types'
