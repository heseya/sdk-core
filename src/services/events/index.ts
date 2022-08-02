import { HeseyaEvents, EventCallbackFunction, EventToPayloadMap } from './utils/types'

export interface HeseyaEventListenerService {
  emit: <Key extends keyof HeseyaEvents>(
    event: Key,
    ...payloads: EventToPayloadMap[Key] extends undefined ? [undefined?] : [EventToPayloadMap[Key]]
  ) => void
  on: <Key extends keyof HeseyaEvents>(
    event: Key,
    cb: EventCallbackFunction<EventToPayloadMap[Key]>,
  ) => void
  unsubscribe: <Key extends keyof HeseyaEvents>(
    event: Key,
    cb: EventCallbackFunction<EventToPayloadMap[Key]>,
  ) => void
}

export const createHeseyaEventListenerService = (): HeseyaEventListenerService => {
  const map: HeseyaEvents = {
    addToCart: [],
    addToWishlist: [],
    completeRegistration: [],
    contact: [],
    customizeProduct: [],
    donate: [],
    findLocation: [],
    initiateCheckout: [],
    lead: [],
    onPurchase: [],
    removeFromCart: [],
    schedule: [],
    search: [],
    signUp: [],
    viewContent: [],
  }
  return {
    emit: (event, payload = undefined) => {
      map[event].forEach((cb: EventCallbackFunction<any>) => {
        cb(payload)
      })
    },

    on: (event, cb) => {
      map[event].push(cb as EventCallbackFunction<any>)
    },

    unsubscribe: (event, cb) => {
      map[event] = [...map[event]].filter((el) => el !== cb) as EventCallbackFunction<any>[]
    },
  }
}

export { HeseyaEventType } from './utils/types'
