import { CartDto, Product, User } from '../../../interfaces'

export type EventCallbackFunction<Payload = undefined> = (payload: Payload) => void

export enum HeseyaEventType {
  AddToCart = 'addToCart',
  AddToWishlist = 'addToWishlist',
  CompleteRegistration = 'completeRegistration',
  Contact = 'contact',
  CustomizeProduct = 'customizeProduct',
  Donate = 'donate',
  FindLocation = 'findLocation',
  InitiateCheckout = 'initiateCheckout',
  Lead = 'lead',
  OnPurchase = 'onPurchase',
  RemoveFromCart = 'removeFromCart',
  Schedule = 'schedule',
  Search = 'search',
  SignUp = 'signUp',
  ViewContent = 'viewContent',
}

export interface HeseyaEventToPayloadMap {
  /**
   * The addition of an item to a shopping cart or basket.
   */
  [HeseyaEventType.AddToCart]: Product

  /**
   * The addition of items to a wishlist.
   */
  [HeseyaEventType.AddToWishlist]: Product

  /**
   * A submission of information by a customer in exchange for a service provided by your business
   */
  [HeseyaEventType.CompleteRegistration]: User

  /**
   * A telephone, SMS, email, chat or other type of contact between a customer and your business.
   */
  [HeseyaEventType.Contact]: undefined

  /**
   * The customisation of products through a configuration tool or other application that your business owns.
   */
  [HeseyaEventType.CustomizeProduct]: Product

  /**
   * The donation of funds to your organisation or cause.
   */
  [HeseyaEventType.Donate]: undefined

  /**
   * When a person finds one of your locations via web, with an intention to visit.
   */
  [HeseyaEventType.FindLocation]: undefined

  /**
   * The start of a checkout process.
   */
  [HeseyaEventType.InitiateCheckout]: CartDto

  /**
   * A submission of information by a customer with the understanding that they may be contacted at a later date by your business.
   */
  [HeseyaEventType.Lead]: undefined

  /**
   * The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt.
   */
  [HeseyaEventType.OnPurchase]: CartDto

  /**
   * Remove item from cart.
   */
  [HeseyaEventType.RemoveFromCart]: Product

  /**
   * The booking of an appointment to visit one of your locations.
   */
  [HeseyaEventType.Schedule]: undefined

  /**
   * A search performed on your website, app or other property.
   */
  [HeseyaEventType.Search]: string

  /**
   * User sign up.
   */
  [HeseyaEventType.SignUp]: User

  /**
   * A visit to a web page you care about.
   */
  [HeseyaEventType.ViewContent]: undefined
}
