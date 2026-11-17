import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.tokens';
import type { RestaurantRepository } from '../restaurants/restaurants.repository';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.tokens';
import type { OrderRepository } from './order.repository';
import type { Area, CreateOrderInput, Order, OrderStatus } from './order.types';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(): Page<Order> {
    const orders = this.repository.all();
    const limit = 20;
    const offset = 0;

    return {
      items: orders.slice(offset, offset + limit),
      total: orders.length,
      limit,
      offset,
    };
  }

  findOne(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  create(input: CreateOrderInput): Order {
    const restaurant = this.restaurantRepository.byId(input.restaurantId);

    if (!restaurant) {
      throw new ResourceNotFoundError('Restaurant', input.restaurantId);
    }

    const nextId =
      Math.max(0, ...this.repository.all().map((order) => order.id)) + 1;

    const order: Order = {
      id: nextId,
      customer: input.customer,
      area: input.area,
      status: 'PENDING',
      restaurantId: input.restaurantId,
      dishes: [],
      totalSantim: input.totalSantim,
      ...(input.telebirrPhone ? { telebirrPhone: input.telebirrPhone } : {}),
    };

    this.repository.add(order);
    return order;
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const existingOrder = this.findOne(id);
    const updatedOrder: Order = { ...existingOrder, status };

    this.repository.add(updatedOrder);
    return updatedOrder;
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
