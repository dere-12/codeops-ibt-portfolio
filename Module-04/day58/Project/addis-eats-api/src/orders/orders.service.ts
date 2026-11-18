
import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.tokens';
import type { RestaurantRepository } from '../restaurants/restaurants.repository';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.tokens';
import type { OrderRepository } from './order.repository';
import type {
  Area,
  CreateOrderInput,
  Order,
  OrderStatus,
} from './order.types';
import type { FindOrdersQuery } from './dto/find-orders.query';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(query: FindOrdersQuery): Page<Order> {
    let orders = this.repository.all();

    if (query.status !== undefined) {
      orders = orders.filter((order) => query.status!.includes(order.status));
    }

    if (query.area !== undefined) {
      orders = orders.filter((order) => order.area === query.area);
    }

    const descending = query.sort.startsWith('-');

    const sortField: 'customer' | 'area' | 'totalSantim' =
      query.sort === '-customer'
        ? 'customer'
        : query.sort === '-area'
          ? 'area'
          : query.sort === '-totalSantim'
            ? 'totalSantim'
            : query.sort;

    orders = [...orders].sort((a, b) => {
      const first = a[sortField];
      const second = b[sortField];

      const result =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second));

      return descending ? -result : result;
    });

    return this.toPage(orders, query.limit, query.offset);
  }

  findByRestaurant(restaurantId: number): Page<Order> {
    const orders = this.repository
      .all()
      .filter((order) => order.restaurantId === restaurantId)
      .sort((a, b) => a.customer.localeCompare(b.customer));

    return this.toPage(orders, 20, 0);
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

  remove(id: number): void {
    this.repository.remove(id);
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

  private toPage(orders: Order[], limit: number, offset: number): Page<Order> {
    const total = orders.length;

    return {
      items: orders.slice(offset, offset + limit),
      total,
      limit,
      offset,
    };
  }
}
