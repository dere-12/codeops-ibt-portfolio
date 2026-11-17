import { Injectable } from '@nestjs/common';
import type { Order } from './order.types';
import { ORDERS_SEED } from './seed-orders';

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  add(order: Order): void;
  remove(id: number): boolean;
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>(
    ORDERS_SEED.map((order) => [order.id, order] as const),
  );

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }

  add(order: Order): void {
    this.orders.set(order.id, order);
  }

  remove(id: number): boolean {
    return this.orders.delete(id);
  }
}
