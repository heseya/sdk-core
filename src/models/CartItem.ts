import md5 from 'md5'
import round from 'lodash/round'

import { ProductList } from '../interfaces/Product'
import { SchemaType, Schema } from '../interfaces/Schema'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'
import { SavedCartItem, CartItemSchema, CartItemRawSchemaValue } from '../interfaces/CartItem'
import { CartItemDto } from '../interfaces/Cart'
import { ProductListAttribute } from '../interfaces'

export class CartItem {
  public qty: number
  public schemas: CartItemSchema[]
  public currency: string

  private precalculatedPrice: number | null = null
  private precalculatedInitialPrice: number | null = null

  private productSchemas: Schema[]
  private product: ProductList
  private createdAt: number

  /**
   * field 'children' contains duplicated(due to id) products copies, which have different prices(usually discount prices)
   * it's required to merge products that are basically the same
   */
  private children: CartItem[] = []

  constructor(
    product: ProductList,
    quantity = 1,
    schemas: Schema[] = [],
    schemaValues: CartItemSchema[] = [],
    children: CartItem[] = [],
    currency: string,
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.productSchemas = schemas
    this.schemas = schemaValues
    this.children = children
    this.currency = currency
    this.createdAt = createdAt
  }

  getOrderObject(): CartItemDto {
    return {
      cartitem_id: this.id,
      product_id: this.product.id,
      quantity: this.totalQty,
      schemas: Object.fromEntries(this.schemas.map((s) => [s.id, s.value])),
    }
  }

  updateQuantity(newQuantity: number) {
    const newItem = new CartItem(
      this.product,
      newQuantity,
      this.productSchemas,
      this.schemas,
      [],
      this.currency,
      this.createdAt,
    )
    // This is to make sure that precalculated prices are not lost
    if (this.precalculatedPrice && this.precalculatedInitialPrice)
      newItem.setPrecalculatedPrices(this.precalculatedPrice, this.precalculatedInitialPrice)
    return newItem
  }

  get id() {
    return md5(`${this.product.id}-${this.schemas.map((s) => [s.id, s.value].join('=')).join('&')}`)
  }

  get productId() {
    return this.product.id
  }

  get name() {
    return this.product.name
  }

  get shippingDigital() {
    return this.product.shipping_digital
  }

  get attributes(): ProductListAttribute[] {
    return this.product.attributes
  }

  /**
   * Number of given items in the cart, also includes nested items
   */
  get totalQty() {
    const childrenQty = this.children.reduce((acc, child) => acc + child.qty, 0)
    return round(this.qty + childrenQty, 2)
  }

  get basePrice() {
    return (
      this.product.prices_base.find(({ currency }) => currency === this.currency) || {
        gross: '0',
        currency: 'unknown',
      }
    )
  }

  /**
   * Singular price of the item (without children)
   */
  get price() {
    if (this.precalculatedPrice !== null) return this.precalculatedPrice

    try {
      return round(parseFloat(this.basePrice.gross) + calcSchemasPrice(this.schemas), 2)
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error('[HS CartItem]', (e as Error).message || e)
      return round(parseFloat(this.basePrice.gross), 2)
    }
  }

  /**
   * Singular initial (before discounts) price of the item (without children)
   */
  get initialPrice() {
    return this.precalculatedInitialPrice === null ? this.price : this.precalculatedInitialPrice
  }

  /**
   * Total price of the item including quantity and children
   */
  get totalPrice(): number {
    const childrenTotalPrice = this.children.reduce((sum, child) => sum + child.totalPrice, 0)
    return round(this.price * this.qty + childrenTotalPrice, 2)
  }

  /**
   * Total initial price (before discounts) of the item including quantity and children
   */
  get totalInitialPrice(): number {
    const childrenTotalInitialPrice = this.children.reduce(
      (sum, child) => sum + child.totalInitialPrice,
      0,
    )
    return round(this.initialPrice * this.qty + childrenTotalInitialPrice, 2)
  }

  /**
   * Total discount value of the item (without children)
   */
  get discountValue() {
    return round((this.precalculatedInitialPrice || 0) - (this.precalculatedPrice || 0), 2)
  }

  /**
   * returns sum of core-product discounts and all childrens' discounts
   * to be able to display info about total discount on one particular product
   */
  get totalDiscountValue() {
    const baseDiscount = this.discountValue * this.qty
    const childrenDiscounts: number = this.children.reduce(
      (acc: number, item: CartItem) => acc + item.discountValue,
      0 as number,
    )

    return round(baseDiscount + childrenDiscounts, 2)
  }

  setPrecalculatedPrices(price: number, initialPrice: number) {
    this.precalculatedPrice = price
    this.precalculatedInitialPrice = initialPrice
    return this
  }

  setChildren(childs: CartItem[]) {
    if (childs.every((child) => child instanceof CartItem)) {
      this.children = childs
    } else {
      throw new Error('[HS CartItem] Given parameter is not type of `CartItem`!')
    }
    return this
  }

  /**
   * @deprecated Use `coverUrl` instead
   */
  get cover() {
    return this.coverUrl
  }

  get coverUrl() {
    return this.product.cover?.url || ''
  }

  get coverMedia() {
    return this.product.cover
  }

  get quantityStep() {
    return this.product.quantity_step || 1
  }

  /**
   * Returns [name, value] pair for each schema in CartItem
   * value is a human readable value - so it is a selected option name for Option Schema,
   * or a simple value for any other type
   */
  get variant(): [string, CartItemRawSchemaValue][] {
    return this.schemas.map((schemaValue) => {
      const schema = this.productSchemas.find((s) => s.id === schemaValue.id)
      if (!schema) throw new Error('[HS CartItem] No schema for given schema value!')

      const value =
        schema.type === SchemaType.Select
          ? schema.options.find((op) => op.id === schemaValue.value)?.name
          : (schemaValue.value as CartItemRawSchemaValue)

      return [schemaValue.name, value]
    })
  }

  toJSON(): SavedCartItem {
    return {
      type: 'CartItem',
      product: this.product,
      qty: this.totalQty,
      schemas: this.schemas,
      productSchemas: this.productSchemas,
      currency: this.currency,
      createdAt: this.createdAt,
    }
  }
}
