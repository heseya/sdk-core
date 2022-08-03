import { CartDto, OrderCreateDto, Product, User } from '../../../interfaces'
import { CartItem } from '../../../models'

export type EventCallbackFunction<Payload = undefined> = (payload: Payload) => void

export enum HeseyaEvent {
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
  [HeseyaEvent.AddToCart]: CartItem

  /**
   * The addition of items to a wishlist.
   */
  [HeseyaEvent.AddToWishlist]: Product

  /**
   * A submission of information by a customer in exchange for a service provided by your business
   */
  [HeseyaEvent.CompleteRegistration]: User

  /**
   * A telephone, SMS, email, chat or other type of contact between a customer and your business.
   */
  [HeseyaEvent.Contact]: undefined

  /**
   * The customisation of products through a configuration tool or other application that your business owns.
   */
  [HeseyaEvent.CustomizeProduct]: CartItem

  /**
   * The donation of funds to your organisation or cause.
   */
  [HeseyaEvent.Donate]: undefined

  /**
   * When a person finds one of your locations via web, with an intention to visit.
   */
  [HeseyaEvent.FindLocation]: undefined

  /**
   * The start of a checkout process.
   */
  [HeseyaEvent.InitiateCheckout]: CartDto

  /**
   * A submission of information by a customer with the understanding that they may be contacted at a later date by your business.
   */
  [HeseyaEvent.Lead]: undefined

  /**
   * The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt.
   */
  [HeseyaEvent.OnPurchase]: OrderCreateDto

  /**
   * Remove item from cart.
   */
  [HeseyaEvent.RemoveFromCart]: CartItem

  /**
   * The booking of an appointment to visit one of your locations.
   */
  [HeseyaEvent.Schedule]: undefined

  /**
   * A search performed on your website, app or other property.
   */
  [HeseyaEvent.Search]: string

  /**
   * User sign up.
   */
  [HeseyaEvent.SignUp]: User

  /**
   * A visit to a web page you care about.
   */
  [HeseyaEvent.ViewContent]: undefined
}
