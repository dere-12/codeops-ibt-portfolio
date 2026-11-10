import type { Order } from './order.types';

export interface OrderRepository {
  byId(id: string): Order | undefined;
  all(): Order[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  constructor(seedOrders: Order[] = []) {
    for (const order of seedOrders) {
      this.orders.set(order.id, order);
    }
  }

  byId(id: string): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }
}
