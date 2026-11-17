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

export interface Dish {
  name: string;
  priceSantim: number;
}

export interface Order {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
}

export interface CreateOrderInput {
  customer: string;
  area: Area;
  restaurantId: number;
  totalSantim: number;
  telebirrPhone?: string;
}
