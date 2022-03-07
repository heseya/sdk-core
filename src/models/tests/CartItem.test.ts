import { CartItem } from '../../models/CartItem'
import { CartItemSchema } from '../../interfaces/CartItem'
import { Product } from '../../interfaces/Product'

describe('usage of CartItem', () => {
  const product = {
    id: 'product_id',
    name: 'Test Product',
    price: 100.05,
  } as Product
  const quantity = 2
  const schemaValues: CartItemSchema[] = []

  const cartItem = new CartItem(product, quantity, schemaValues)

  it('has access to static fields', () => {
    expect(cartItem.id).toBeTruthy()
    expect(cartItem.name).toBe(product.name)
    expect(cartItem.descriptionHtml).toBe(product.description_html)
    expect(cartItem.descriptionText).toBe(product.meta_description)
    expect(cartItem.descriptionShort).toBe(product.description_short)
    expect(cartItem.qty).toBe(quantity)
    expect(cartItem.schemas).toBe(schemaValues)
    expect(cartItem.quantityStep).toBe(1)
  })

  it('has access to dynamic fields', () => {
    expect(cartItem.totalPrice).toBe(200.1)
    expect(cartItem.price).toBe(100.05)
  })

  it('can update quantity without object mutation', () => {
    expect(cartItem.qty).toBe(quantity)

    const newCartItem = cartItem.updateQuantity(5)

    expect(cartItem.qty).toBe(quantity)
    expect(newCartItem.qty).toBe(5)
  })

  it('can create order object', () => {
    const orderItem = cartItem.getOrderObject()

    expect(typeof orderItem.cartitem_id).toBe('string')
    expect(orderItem.product_id).toBe(product.id)
    expect(orderItem.quantity).toBe(quantity)
    expect(orderItem.schemas).toStrictEqual({})
  })
})
