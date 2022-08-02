import { HeseyaEvents, EventCallbackFunction, GetTypeFromInterface } from './utils/types'

type EventCallbackWrapper<T extends keyof HeseyaEvents> = EventCallbackFunction<
  GetTypeFromInterface<HeseyaEvents[T][0]>
>
export interface HeseyaEventListenerService {
  emit: <Key extends keyof HeseyaEvents>(
    event: Key,
    payload?: GetTypeFromInterface<HeseyaEvents[Key][0]> | undefined,
  ) => void
  on: <Key extends keyof HeseyaEvents>(event: Key, cb: EventCallbackWrapper<Key>) => void
  unsubscribe: <Key extends keyof HeseyaEvents>(event: Key, cb: EventCallbackWrapper<Key>) => void
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
      const filteredEvent = [...map[event]].filter((el) => el !== cb)
      map[event] = [...filteredEvent] as EventCallbackFunction<any>[]
    },
  }
}

export { EventType } from './utils/types'
