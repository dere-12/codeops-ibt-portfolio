import { OrderNotFoundError } from './order.errors';
import type { OrderRepository } from './order.repository';
import type { Area, Order } from './order.types';

export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  find(id: string): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
}
