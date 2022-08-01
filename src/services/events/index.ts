import { CartDto, Product, User } from '../../interfaces'

type EventCallbackFunction<Payload = any> = (payload: Payload) => void

type GetTypeFromInterface<T> = T extends EventCallbackFunction<infer Payload> ? Payload : any

// TODO: Fix emit payload type
type EventsListenerService = () => {
  emit: (event: keyof Events, payload: GetTypeFromInterface<Events[typeof event]>) => void
  on: (event: keyof Events, cb: EventCallbackFunction) => void
}

export interface Events {
  /**
   * The addition of an item to a shopping cart or basket.
   */
  addToCart: EventCallbackFunction<Product>[]

  /**
   * The addition of items to a wishlist.
   */
  addToWishlist: EventCallbackFunction<Product>[]

  /**
   * A submission of information by a customer in exchange for a service provided by your business
   */
  completeRegistration: EventCallbackFunction<User>[]

  /**
   * A telephone, SMS, email, chat or other type of contact between a customer and your business.
   */
  contact: EventCallbackFunction[]

  /**
   * The customisation of products through a configuration tool or other application that your business owns.
   */
  customizeProduct: EventCallbackFunction<Product>[]

  /**
   * The donation of funds to your organisation or cause.
   */
  donate: EventCallbackFunction[]
  /**
   * When a person finds one of your locations via web, with an intention to visit.
   */
  findLocation: EventCallbackFunction[]

  /**
   * The start of a checkout process
   */
  initiateCheckout: EventCallbackFunction<CartDto>[]

  /**
   * A submission of information by a customer with the understanding that they may be contacted at a later date by your business.
   */
  lead: EventCallbackFunction[]

  /**
   * The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt.
   */
  onPurchase: EventCallbackFunction<CartDto>[]

  /**
   * Remove item from cart.
   */
  removeFromCart: EventCallbackFunction<Product>[]

  /**
   * The booking of an appointment to visit one of your locations.
   */
  schedule: EventCallbackFunction[]

  /**
   * A search performed on your website, app or other property.
   */
  search: EventCallbackFunction<string>[]

  /**
   * User sign up.
   */
  signUp: EventCallbackFunction<User>[]

  /**
   * A visit to a web page you care about.
   */
  viewContent: EventCallbackFunction[]
}

export const createEventsListenerInstance: EventsListenerService = () => {
  const map: Events = {
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
    emit: (event: keyof Events, payload: GetTypeFromInterface<Events[typeof event]>) => {
      map[event].forEach((cb: EventCallbackFunction) => {
        cb(payload)
      })
    },

    on: (event: keyof Events, cb: EventCallbackFunction) => {
      map[event].push(cb)
    },
  }
}
