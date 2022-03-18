import md5 from 'md5'
import round from 'lodash/round'

import { Product } from '../interfaces/Product'
import { SchemaType } from '../interfaces/Schema'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'
import { SavedCartItem, CartItemSchema, OrderCartItem } from '../interfaces/CartItem'

export class CartItem {
  public qty: number
  public schemas: CartItemSchema[]

  private product: Product
  private createdAt: number

  constructor(
    product: Product,
    quantity = 1,
    schemas: CartItemSchema[] = [],
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.schemas = schemas
    this.createdAt = createdAt
  }

  getOrderObject(): OrderCartItem & { cartitem_id: string } {
    return {
      cartitem_id: this.id,
      product_id: this.product.id,
      quantity: this.qty,
      schemas: Object.fromEntries(this.schemas.map((s) => [s.id, s.value])),
    }
  }

  updateQuantity(newQuantity: number) {
    return new CartItem(this.product, newQuantity, this.schemas, this.createdAt)
  }

  get id() {
    return md5(`${this.product.id}-${this.schemas.map((s) => [s.id, s.value].join('=')).join('&')}`)
  }

  get totalPrice() {
    return round(this.price * this.qty, 2)
  }

  get name() {
    return this.product.name
  }

  get descriptionHtml() {
    return this.product.description_html
  }
  get descriptionShort() {
    return this.product.description_short
  }
  // @deprecated
  get descriptionText() {
    return this.product.meta_description
  }

  get price() {
    try {
      return round(this.product.price + calcSchemasPrice(this.schemas), 2)
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('[HS CartItem]', e.message)
      return round(this.product.price, 2)
    }
  }

  get cover() {
    return this.product.cover?.url || ''
  }

  get quantityStep() {
    return this.product.quantity_step || 1
  }

  /**
   * Returns [name, value] pair for each schema in CartItem
   * value is a human readable value - so it is a selected option name for Option Schema,
   * or a simple value for any other type
   */
  get variant() {
    return this.schemas.map((schemaValue) => {
      const schema = this.product.schemas.find((s) => s.id === schemaValue.id)
      if (!schema) throw new Error('[HS CartItem] No schema for given schema value!')

      const value =
        schema.type === SchemaType.Select
          ? schema.options.find((op) => op.id === schemaValue.value)?.name
          : String(schemaValue.value)

      return [schemaValue.name, value]
    })
  }

  toJSON(): SavedCartItem {
    return {
      type: 'CartItem',
      product: this.product,
      qty: this.qty,
      schemas: this.schemas,
      createdAt: this.createdAt,
    }
  }
}
