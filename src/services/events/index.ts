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
    [HeseyaEvent.AddToCart]: [],
    [HeseyaEvent.AddToWishlist]: [],
    [HeseyaEvent.CompleteRegistration]: [],
    [HeseyaEvent.Contact]: [],
    [HeseyaEvent.CustomizeProduct]: [],
    [HeseyaEvent.Donate]: [],
    [HeseyaEvent.FindLocation]: [],
    [HeseyaEvent.InitiateCheckout]: [],
    [HeseyaEvent.Lead]: [],
    [HeseyaEvent.OnPurchase]: [],
    [HeseyaEvent.RemoveFromCart]: [],
    [HeseyaEvent.Schedule]: [],
    [HeseyaEvent.Search]: [],
    [HeseyaEvent.SignUp]: [],
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
