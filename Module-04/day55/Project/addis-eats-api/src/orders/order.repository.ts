import { Injectable } from '@nestjs/common';
import type { Order } from './order.types';
import { ORDERS_SEED } from './seed-orders';

export interface OrderRepository {
  byId(id: string): Order | undefined;
  all(): Order[];
  add(order: Order): void;
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>(
    ORDERS_SEED.map((order) => [order.id, order] as const),
  );

  byId(id: string): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }

  add(order: Order): void {
    this.orders.set(order.id, order);
  }
}