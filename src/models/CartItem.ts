import md5 from 'md5'
import round from 'lodash/round'

import { ProductList } from '../interfaces/Product'
import { SchemaType, Schema } from '../interfaces/Schema'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'
import { SavedCartItem, CartItemSchema } from '../interfaces/CartItem'
import { CartItemDto } from '../interfaces/Cart'
import { ProductListAttribute } from '../interfaces'

export class CartItem {
  public qty: number
  public schemas: CartItemSchema[]

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
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.productSchemas = schemas
    this.schemas = schemaValues
    this.children = children
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
    return new CartItem(
      this.product,
      newQuantity,
      this.productSchemas,
      this.schemas,
      [],
      this.createdAt,
    )
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

  /**
   * Singular price of the item (without children)
   */
  get price() {
    if (this.precalculatedPrice) return this.precalculatedPrice

    try {
      return round(this.product.price + calcSchemasPrice(this.schemas), 2)
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('[HS CartItem]', e.message)
      return round(this.product.price, 2)
    }
  }

  /**
   * Singular initial (before discounts) price of the item (without children)
   */
  get initialPrice() {
    return this.precalculatedInitialPrice || this.price
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
      0,
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
  get variant() {
    return this.schemas.map((schemaValue) => {
      const schema = this.productSchemas.find((s) => s.id === schemaValue.id)
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
      qty: this.totalQty,
      schemas: this.schemas,
      productSchemas: this.productSchemas,
      createdAt: this.createdAt,
    }
  }
}
