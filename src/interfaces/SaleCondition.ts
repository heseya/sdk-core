/* eslint-disable camelcase */
import { PriceDto } from './Price'
import { Product } from './Product'
import { ProductSet } from './ProductSet'
import { Role } from './Role'
import { User } from './User'
import { UUID } from './UUID'

export interface DiscountConditionGroup {
  id: UUID
  conditions: DiscountCondition[]
}

export interface DiscountConditionGroupDto {
  conditions: DiscountConditionDto[]
}

// ? ------------------------------------------------------------------------------------

export enum DiscountConditionType {
  OrderValue = 'order-value',
  UserInRole = 'user-in-role',
  UserIn = 'user-in',
  ProductInSet = 'product-in-set',
  ProductIn = 'product-in',
  DateBetween = 'date-between',
  TimeBetween = 'time-between',
  MaxUses = 'max-uses',
  MaxUsesPerUser = 'max-uses-per-user',
  WeekdayIn = 'weekday-in',
  CartLength = 'cart-length',
  CouponsCount = 'coupons-count',
}

// ? ------------------------------------------------------------------------------------

export interface OrderValueDiscountConditionDto {
  type: DiscountConditionType.OrderValue
  /**
   * Inclues all currencies
   */
  min_values: PriceDto[] | null
  /**
   * Inclues all currencies
   */
  max_values: PriceDto[] | null
  include_taxes: boolean
  is_in_range: boolean
}
export type OrderValueDiscountCondition = OrderValueDiscountConditionDto & { id: UUID }

export interface UserInRoleDiscountConditionDto {
  type: DiscountConditionType.UserInRole
  roles: UUID[]
  is_allow_list: boolean
}
export type UserInRoleDiscountCondition = Omit<UserInRoleDiscountConditionDto, 'roles'> & {
  id: UUID
  roles: Role[]
}

export interface UserInDiscountConditionDto {
  type: DiscountConditionType.UserIn
  users: UUID[]
  is_allow_list: boolean
}
export type UserInDiscountCondition = Omit<UserInDiscountConditionDto, 'users'> & {
  id: UUID
  users: User[]
}

export interface ProductInSetDiscountConditionDto {
  type: DiscountConditionType.ProductInSet
  product_sets: UUID[]
  is_allow_list: boolean
}
export type ProductInSetDiscountCondition = Omit<
  ProductInSetDiscountConditionDto,
  'product_sets'
> & {
  id: UUID
  product_sets: ProductSet[]
}

export interface ProductInDiscountConditionDto {
  type: DiscountConditionType.ProductIn
  products: UUID[]
  is_allow_list: boolean
}
export type ProductInDiscountCondition = Omit<ProductInDiscountConditionDto, 'products'> & {
  id: UUID
  products: Product[]
}

export interface DateBetweenDiscountConditionDto {
  type: DiscountConditionType.DateBetween
  start_at: string | null // Date
  end_at: string | null // Date
  is_in_range: boolean
}
export type DateBetweenDiscountCondition = DateBetweenDiscountConditionDto & { id: UUID }

export interface TimeBetweenDiscountConditionDto {
  type: DiscountConditionType.TimeBetween
  start_at: string | null // H:i:s
  end_at: string | null // H:i:s
  is_in_range: boolean
}
export type TimeBetweenDiscountCondition = TimeBetweenDiscountConditionDto & { id: UUID }

export interface MaxUsesDiscountConditionDto {
  type: DiscountConditionType.MaxUses
  max_uses: number
}
export type MaxUsesDiscountCondition = MaxUsesDiscountConditionDto & { id: UUID }

export interface MaxUsesPerUserDiscountConditionDto {
  type: DiscountConditionType.MaxUsesPerUser
  max_uses: number
}
export type MaxUsesPerUserDiscountCondition = MaxUsesPerUserDiscountConditionDto & { id: UUID }

export interface WeekdayInDiscountConditionDto {
  type: DiscountConditionType.WeekdayIn
  /**
   * [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
   */
  weekday: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
}
export type WeekdayInDiscountCondition = WeekdayInDiscountConditionDto & { id: UUID }

export interface CartLengthDiscountConditionDto {
  type: DiscountConditionType.CartLength
  min_value: number | null
  max_value: number | null
}
export type CartLengthDiscountCondition = CartLengthDiscountConditionDto & { id: UUID }

export interface CouponsCountDiscountConditionDto {
  type: DiscountConditionType.CouponsCount
  min_value: number | null
  max_value: number | null
}
export type CouponsCountDiscountCondition = CouponsCountDiscountConditionDto & { id: UUID }

// ? ------------------------------------------------------------------------------------

export type DiscountCondition =
  | OrderValueDiscountCondition
  | UserInRoleDiscountCondition
  | UserInDiscountCondition
  | ProductInSetDiscountCondition
  | ProductInDiscountCondition
  | DateBetweenDiscountCondition
  | TimeBetweenDiscountCondition
  | MaxUsesDiscountCondition
  | MaxUsesPerUserDiscountCondition
  | WeekdayInDiscountCondition
  | CartLengthDiscountCondition
  | CouponsCountDiscountCondition

export type DiscountConditionDto =
  | OrderValueDiscountConditionDto
  | UserInRoleDiscountConditionDto
  | UserInDiscountConditionDto
  | ProductInSetDiscountConditionDto
  | ProductInDiscountConditionDto
  | DateBetweenDiscountConditionDto
  | TimeBetweenDiscountConditionDto
  | MaxUsesDiscountConditionDto
  | MaxUsesPerUserDiscountConditionDto
  | WeekdayInDiscountConditionDto
  | CartLengthDiscountConditionDto
  | CouponsCountDiscountConditionDto
