export const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;

export type Area = (typeof AREAS)[number];

export type OrderStatus =
  | 'PENDING'
  | 'PREPARING'
  | 'ON_THE_WAY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Dish {
  name: string;
  priceSantim: number;
}

export interface Order {
  readonly id: string;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
}

export interface CreateOrderInput {
  customer: string;
  area: Area;
  totalSantim: number;
  telebirrPhone?: string;
}
