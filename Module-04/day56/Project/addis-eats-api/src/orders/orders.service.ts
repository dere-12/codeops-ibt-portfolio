import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.tokens';
import type { OrderRepository } from './order.repository';
import type { Area, CreateOrderInput, Order } from './order.types';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
  ) {}

  findAll(): Order[] {
    return this.repository.all();
  }

  find(id: string): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  create(input: CreateOrderInput): Order {
    const nextNumber = this.repository.all().length + 1;

    const order: Order = {
      id: `ord_${String(nextNumber).padStart(3, '0')}`,
      customerName: input.customer,
      area: input.area,
      status: 'PENDING',
      dishes: [],
      totalSantim: input.totalSantim,
      ...(input.telebirrPhone ? { telebirrPhone: input.telebirrPhone } : {}),
    };

    this.repository.add(order);
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
