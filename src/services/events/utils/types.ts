import {
  OrderSummary,
  Product,
  ProductList,
  ProductSetList,
  ShippingMethod,
  User,
} from '../../../interfaces'
import { CartItem } from '../../../models'

export type EventCallbackFunction<Payload = undefined> = (payload: Payload) => void

export enum HeseyaEvent {
  /**
   * View product page
   */
  ViewProduct = 'viewProduct',
  /**
   * View list of the products
   */
  ViewProductList = 'viewProductList',
  /**
   * The customisation of products through a configuration tool or other application that your business owns.
   */
  CustomizeProduct = 'customizeProduct',
  /**
   * The addition of an item to a shopping cart or basket.
   */
  AddToCart = 'addToCart',
  /**
   * Show the shopping cart page.
   */
  ViewCart = 'viewCart',
  /**
   * Remove item from cart.
   */
  RemoveFromCart = 'removeFromCart',
  /**
   * The addition of items to a wishlist.
   */
  AddToWishlist = 'addToWishlist',
  /**
   * The start of a checkout process.
   */
  InitiateCheckout = 'initiateCheckout',
  /**
   * Add shipping information to a checkout.
   */
  AddShippingInfo = 'addShippingInfo',
  /**
   * The completion of a purchase, usually signified by receiving order or purchase confirmation, or a transaction receipt.
   */
  Purchase = 'purchase',
  /**
   * A search performed on your website, app or other property.
   */
  Search = 'search',
  /**
   * A submission of information by a customer in exchange for a service provided by your business
   */
  Register = 'register',
  /**
   * User log in.
   */
  Login = 'login',
  /**
   * A visit to a web page you care about.
   */
  ViewContent = 'viewContent',
}

export interface HeseyaEventToPayloadMap extends Record<HeseyaEvent, unknown> {
  [HeseyaEvent.ViewProduct]: Product
  [HeseyaEvent.ViewProductList]: { set?: Partial<ProductSetList>; items: ProductList[] }
  [HeseyaEvent.CustomizeProduct]: CartItem
  [HeseyaEvent.AddToCart]: CartItem
  [HeseyaEvent.ViewCart]: CartItem[]
  [HeseyaEvent.RemoveFromCart]: CartItem
  [HeseyaEvent.AddToWishlist]: Product
  [HeseyaEvent.InitiateCheckout]: CartItem[]
  [HeseyaEvent.AddShippingInfo]: { shipping: ShippingMethod; items: CartItem[] }
  [HeseyaEvent.Purchase]: { order: OrderSummary; items: CartItem[] }
  [HeseyaEvent.Search]: string
  [HeseyaEvent.Register]: User
  [HeseyaEvent.Login]: User
  [HeseyaEvent.ViewContent]: unknown
}
