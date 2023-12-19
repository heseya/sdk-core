import { EventCallbackFunction, HeseyaEventToPayloadMap, HeseyaEvent } from './utils/types'

export interface HeseyaEventBusService {
  emit: <Key extends HeseyaEvent>(
    event: Key,
    ...payloads: HeseyaEventToPayloadMap[Key] extends undefined
      ? [undefined?]
      : [HeseyaEventToPayloadMap[Key]]
  ) => void
  on: <Key extends HeseyaEvent>(
    event: Key,
    cb: EventCallbackFunction<HeseyaEventToPayloadMap[Key]>,
  ) => void
  unsubscribe: <Key extends HeseyaEvent>(
    event: Key,
    cb: EventCallbackFunction<HeseyaEventToPayloadMap[Key]>,
  ) => void
}

export const createHeseyaEventBusService = (): HeseyaEventBusService => {
  const callbackMap: Record<HeseyaEvent, EventCallbackFunction<unknown>[]> = {
    [HeseyaEvent.ViewProduct]: [],
    [HeseyaEvent.ViewProductList]: [],
    [HeseyaEvent.ViewCart]: [],
    [HeseyaEvent.AddToCart]: [],
    [HeseyaEvent.AddToWishlist]: [],
    [HeseyaEvent.Login]: [],
    [HeseyaEvent.Register]: [],
    [HeseyaEvent.CustomizeProduct]: [],
    [HeseyaEvent.InitiateCheckout]: [],
    [HeseyaEvent.AddShippingInfo]: [],
    [HeseyaEvent.AddPaymentInfo]: [],
    [HeseyaEvent.Purchase]: [],
    [HeseyaEvent.RemoveFromCart]: [],
    [HeseyaEvent.Search]: [],
    [HeseyaEvent.ViewContent]: [],
  }
  return {
    emit: (event, payload = undefined) => {
      callbackMap[event].forEach((cb) => {
        cb(payload)
      })
    },

    on: (event, cb) => {
      callbackMap[event].push(cb as EventCallbackFunction<unknown>)
    },

    unsubscribe: (event, cb) => {
      callbackMap[event] = callbackMap[event].filter((el) => el !== cb)
    },
  }
}

export { HeseyaEvent } from './utils/types'
