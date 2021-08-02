import md5 from 'md5'
import { Product } from '../interfaces/Product'
import { SchemaOption, SchemaType } from '../interfaces/Schema'
import { toPrecision } from '../utils/amounts'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'

export interface SavedCartItem {
  type: 'CartItem'
  product: Product
  qty: number
  schemas: CartItemSchemaValue[]
  createdAt: number
}

export interface CartItemSchemaValue {
  id: string
  type: SchemaType
  name?: string
  price: number
  optionPrice?: number
  dependencies: string[]
  value?: string | SchemaOption | number | boolean
}

export class CartItem {
  public qty: number
  public schemas: CartItemSchemaValue[]

  private product: Product
  private createdAt: number

  constructor(
    product: Product,
    quantity = 1,
    schemas: CartItemSchemaValue[] = [],
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.schemas = schemas
    this.createdAt = createdAt
  }

  getOrderObject() {
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
    return toPrecision(this.price * this.qty)
  }

  get name() {
    return this.product.name
  }

  get price() {
    try {
      return toPrecision(this.product.price + calcSchemasPrice(this.schemas))
    } catch (e) {
      console.error('[HS CartItem]', e.message)
      return toPrecision(this.product.price)
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

  get brand() {
    return this.product.brand?.name || ''
  }

  get category() {
    return this.product.category?.name || ''
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
