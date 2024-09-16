import md5 from 'md5'

import { ProductListed } from '../interfaces/Product'
import { Schema } from '../interfaces/Schema'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'
import { CartItemRawSchemaValue, CartItemSchema, SavedCartItem } from '../interfaces/CartItem'
import { CartItemDto } from '../interfaces/Cart'
import { ProductListedAttribute } from '../interfaces'
import { round } from '../utils/utils'

interface CartItemPrice {
  net: number
  gross: number
}

export class CartItem {
  public qty: number
  public schemas: CartItemSchema[]
  public currency: string

  private precalculatedPrice: CartItemPrice | null = null
  private precalculatedInitialPrice: CartItemPrice | null = null

  private productSchemas: Schema[]
  readonly product: ProductListed
  private createdAt: number

  /**
   * field 'children' contains duplicated(due to id) products copies, which have different prices(usually discount prices)
   * it's required to merge products that are basically the same
   */
  private children: CartItem[] = []

  constructor(
    product: ProductListed,
    quantity = 1,
    productSchemas: Schema[] = [],
    schemas: CartItemSchema[] = [],
    children: CartItem[] = [],
    currency: string,
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.productSchemas = productSchemas
    this.schemas = [...schemas].map((p) => ({ ...p }))
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
      newItem.setPrecalculatedPrices(
        { ...this.precalculatedPrice },
        { ...this.precalculatedInitialPrice },
      )
    return newItem
  }

  get id(): string {
    return md5(`${this.product.id}-${this.schemas.map((s) => [s.id, s.value].join('=')).join('&')}`)
  }

  get productId(): string {
    return this.product.id
  }

  get name(): string {
    return this.product.name
  }

  get shippingDigital(): boolean {
    return this.product.shipping_digital
  }

  get attributes(): ProductListedAttribute[] {
    return this.product.attributes
  }

  /**
   * Number of given items in the cart, also includes nested items
   */
  get totalQty(): number {
    const childrenQty = this.children.reduce((acc, child) => acc + child.qty, 0)
    return round(this.qty + childrenQty, 2)
  }

  get basePrice(): CartItemPrice {
    return {
      net: parseFloat(this.product.price.net),
      gross: parseFloat(this.product.price.gross),
    }
  }

  /**
   * Singular price of the item (without children)
   */
  get price(): CartItemPrice {
    if (this.precalculatedPrice !== null) return this.precalculatedPrice

    try {
      const netPrice = round(this.basePrice.net + calcSchemasPrice(this.schemas, 'net'), 2)
      const grossPrice = round(this.basePrice.gross + calcSchemasPrice(this.schemas, 'gross'), 2)

      return {
        net: netPrice,
        gross: grossPrice,
      }
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error('[HS CartItem]', (e as Error).message || e)

      return {
        net: round(this.basePrice.net, 2),
        gross: round(this.basePrice.gross, 2),
      }
    }
  }

  /**
   * Singular initial (before discounts) price of the item (without children)
   */
  get initialPrice(): CartItemPrice {
    return this.precalculatedInitialPrice === null ? this.price : this.precalculatedInitialPrice
  }

  /**
   * Total price of the item including quantity and children
   */
  get totalPrice(): CartItemPrice {
    const childrenTotalPrice = this.childrenTotalPrice

    return {
      net: round(this.price.net * this.qty + childrenTotalPrice.net, 2),
      gross: round(this.price.gross * this.qty + childrenTotalPrice.gross, 2),
    }
  }

  /**
   * Total initial price (before discounts) of the item including quantity and children
   */
  get totalInitialPrice(): CartItemPrice {
    const childrenTotalInitialPrice = this.childrenTotalInitialPrice

    return {
      net: round(this.initialPrice.net * this.qty + childrenTotalInitialPrice.net, 2),
      gross: round(this.initialPrice.gross * this.qty + childrenTotalInitialPrice.gross, 2),
    }
  }

  /**
   * Total discount value of the item (without children)
   */
  get discountValue(): CartItemPrice {
    return {
      net: round(
        +(this.precalculatedInitialPrice?.net || 0) - +(this.precalculatedPrice?.net || 0),
        2,
      ),
      gross: round(
        +(this.precalculatedInitialPrice?.gross || 0) - +(this.precalculatedPrice?.gross || 0),
        2,
      ),
    }
  }

  /**
   * returns sum of core-product discounts and all childrens' discounts
   * to be able to display info about total discount on one particular product
   */
  get totalDiscountValue(): CartItemPrice {
    const baseDiscountValue = this.baseDiscountValue
    const childrenDiscountValue = this.childrenDiscountValue

    return {
      net: round(baseDiscountValue.net + childrenDiscountValue.net, 2),
      gross: round(baseDiscountValue.gross + childrenDiscountValue.gross, 2),
    }
  }

  setPrecalculatedPrices(price: CartItemPrice, initialPrice: CartItemPrice) {
    this.precalculatedPrice = { ...price }
    this.precalculatedInitialPrice = { ...initialPrice }
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

      const value = schema.options.find((op) => op.id === schemaValue.value)?.name

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

  private get childrenTotalPrice(): CartItemPrice {
    const childrenTotalPriceNet = this.children.reduce(
      (sum, child) => sum + child.totalPrice.net,
      0,
    )

    const childrenTotalPriceGross = this.children.reduce(
      (sum, child) => sum + child.totalPrice.gross,
      0,
    )

    return {
      net: childrenTotalPriceNet,
      gross: childrenTotalPriceGross,
    }
  }

  private get childrenTotalInitialPrice(): CartItemPrice {
    const childrenTotalPriceNet = this.children.reduce(
      (sum, child) => sum + child.totalInitialPrice.net,
      0,
    )

    const childrenTotalPriceGross = this.children.reduce(
      (sum, child) => sum + child.totalInitialPrice.gross,
      0,
    )

    return {
      net: childrenTotalPriceNet,
      gross: childrenTotalPriceGross,
    }
  }

  private get baseDiscountValue(): CartItemPrice {
    const baseDiscountNet = this.discountValue.net * this.qty
    const baseDiscountGross = this.discountValue.gross * this.qty

    return {
      net: baseDiscountNet,
      gross: baseDiscountGross,
    }
  }

  private get childrenDiscountValue(): CartItemPrice {
    const childrenDiscountsNet = this.children.reduce(
      (acc: number, item: CartItem) => acc + item.discountValue.net,
      0,
    )

    const childrenDiscountsGross = this.children.reduce(
      (acc: number, item: CartItem) => acc + item.discountValue.gross,
      0,
    )

    return {
      net: childrenDiscountsNet,
      gross: childrenDiscountsGross,
    }
  }
}
