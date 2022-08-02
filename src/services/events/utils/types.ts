import { CartDto, Product, User } from '../../../interfaces'

export type EventCallbackFunction<Payload = undefined> = (payload: Payload) => void

export type GetCallbackPayload<T> = T extends EventCallbackFunction<infer Payload>
  ? Payload
  : undefined

export enum HeseyaEventType {
  addToCart = 'addToCart',
  addToWishlist = 'addToWishlist',
  completeRegistration = 'completeRegistration',
  contact = 'contact',
  customizeProduct = 'customizeProduct',
  donate = 'donate',
  findLocation = 'findLocation',
  initiateCheckout = 'initiateCheckout',
  lead = 'lead',
  onPurchase = 'onPurchase',
  removeFromCart = 'removeFromCart',
  schedule = 'schedule',
  search = 'search',
  signUp = 'signUp',
  viewContent = 'viewContent',
}

export interface HeseyaEvents {
  /**
   * The addition of an item to a shopping cart or basket.
   */
  [HeseyaEventType.addToCart]: EventCallbackFunction<Product>[]

  /**
   * The addition of items to a wishlist.
   */
  [HeseyaEventType.addToWishlist]: EventCallbackFunction<Product>[]

  /**
   * A submission of information by a customer in exchange for a service provided by your business
   */
  [HeseyaEventType.completeRegistration]: EventCallbackFunction<User>[]

  /**
   * A telephone, SMS, email, chat or other type of contact between a customer and your business.
   */
  [HeseyaEventType.contact]: EventCallbackFunction[]

  /**
   * The customisation of products through a configuration tool or other application that your business owns.
   */
  [HeseyaEventType.customizeProduct]: EventCallbackFunction<Product>[]

  /**
   * The donation of funds to your organisation or cause.
   */
  [HeseyaEventType.donate]: EventCallbackFunction[]
  /**
   * When a person finds one of your locations via web, with an intention to visit.
   */
  [HeseyaEventType.findLocation]: EventCallbackFunction[]

  /**
   * The start of a checkout process
   */
  [HeseyaEventType.initiateCheckout]: EventCallbackFunction<CartDto>[]

  /**
   * A submission of information by a customer with the understanding that they may be contacted at a later date by your business.
   */
  [HeseyaEventType.lead]: EventCallbackFunction[]

  /**
   * The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt.
   */
  [HeseyaEventType.onPurchase]: EventCallbackFunction<CartDto>[]

  /**
   * Remove item from cart.
   */
  [HeseyaEventType.removeFromCart]: EventCallbackFunction<Product>[]

  /**
   * The booking of an appointment to visit one of your locations.
   */
  [HeseyaEventType.schedule]: EventCallbackFunction[]

  /**
   * A search performed on your website, app or other property.
   */
  [HeseyaEventType.search]: EventCallbackFunction<string>[]

  /**
   * User sign up.
   */
  [HeseyaEventType.signUp]: EventCallbackFunction<User>[]

  /**
   * A visit to a web page you care about.
   */
  [HeseyaEventType.viewContent]: EventCallbackFunction[]
}

export interface HeseyaEventToPayloadMap {
  [HeseyaEventType.addToCart]: Product
  [HeseyaEventType.addToWishlist]: Product
  [HeseyaEventType.completeRegistration]: User
  [HeseyaEventType.contact]: undefined
  [HeseyaEventType.customizeProduct]: Product
  [HeseyaEventType.donate]: undefined
  [HeseyaEventType.findLocation]: undefined
  [HeseyaEventType.initiateCheckout]: CartDto
  [HeseyaEventType.lead]: undefined
  [HeseyaEventType.onPurchase]: CartDto
  [HeseyaEventType.removeFromCart]: Product
  [HeseyaEventType.schedule]: undefined
  [HeseyaEventType.search]: string
  [HeseyaEventType.signUp]: User
  [HeseyaEventType.viewContent]: undefined
}
