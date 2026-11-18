import type { Area } from '../restaurants/restaurant.types';
export type { Area } from '../restaurants/restaurant.types';

export const ORDER_STATUSES = [
  'PENDING',
  'PREPARING',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderDish {
  name: string;
  priceSantim: number;
  quantity: number;
}

export type Dish = OrderDish;

export interface CreateOrderLineInput {
  dishId: number;
  quantity: number;
}

export interface Order {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  dishes: OrderDish[];
  telebirrPhone?: string;
  totalSantim: number;
}

export interface CreateOrderInput {
  customer: string;
  area: Area;
  restaurantId: number;
  lines: CreateOrderLineInput[];
  telebirrPhone?: string;
}
