import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { DishNotOnMenuError } from '../dishes/dish.errors';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantClosedError } from '../restaurants/restaurant.errors';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { InvalidTransitionError, OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.tokens';
import type { OrderRepository } from './order.repository';
import type {
  Area,
  CreateOrderInput,
  Order,
  OrderDish,
  OrderStatus,
} from './order.types';
import type { FindOrdersQuery } from './dto/find-orders.query';

const ALLOWED_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ['PREPARING', 'CANCELLED'],
  PREPARING: ['ON_THE_WAY', 'CANCELLED'],
  ON_THE_WAY: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
  // The existing project status has no outgoing transition in Day58's rules.
  REFUNDED: [],
};

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
    private readonly restaurantsService: RestaurantsService,
    private readonly dishesService: DishesService,
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
    // 1. Existence: resolve the restaurant first (404 if it does not exist).
    const restaurant = this.restaurantsService.findOne(input.restaurantId);

    // 2. State: an order cannot be placed while the restaurant is closed.
    if (!restaurant.isOpen) {
      throw new RestaurantClosedError(restaurant.id);
    }

    // 3. Existence and relationships: retrieve every requested dish.
    const requestedDishIds = [
      ...new Set(input.lines.map((line) => line.dishId)),
    ];
    const menuDishes = this.dishesService.findByIds(requestedDishIds);
    const foundDishIds = new Set(menuDishes.map((dish) => dish.id));
    const missingDishId = requestedDishIds.find(
      (dishId) => !foundDishIds.has(dishId),
    );

    if (missingDishId !== undefined) {
      throw new ResourceNotFoundError('Dish', missingDishId);
    }

    if (menuDishes.some((dish) => dish.restaurantId !== restaurant.id)) {
      throw new DishNotOnMenuError(restaurant.id);
    }

    // 4. Only after all guards pass, create the order and calculate its total.
    const dishesById = new Map(
      menuDishes.map((dish) => [dish.id, dish] as const),
    );

    const orderDishes: OrderDish[] = input.lines.map((line) => {
      const dish = dishesById.get(line.dishId);

      // The missing-dish guard above guarantees that this lookup succeeds.
      if (!dish) {
        throw new ResourceNotFoundError('Dish', line.dishId);
      }

      return {
        name: dish.name,
        priceSantim: dish.priceSantim,
        quantity: line.quantity,
      };
    });

    const totalSantim = this.priceOrder(orderDishes);
    const nextId =
      Math.max(0, ...this.repository.all().map((order) => order.id)) + 1;

    const order: Order = {
      id: nextId,
      customer: input.customer,
      area: input.area,
      status: 'PENDING',
      restaurantId: restaurant.id,
      dishes: orderDishes,
      totalSantim,
      ...(input.telebirrPhone ? { telebirrPhone: input.telebirrPhone } : {}),
    };

    this.repository.add(order);
    return order;
  }

  updateStatus(id: number, next: OrderStatus): Order {
    const order = this.findOne(id);

    if (!ALLOWED_TRANSITIONS[order.status].includes(next)) {
      throw new InvalidTransitionError(order.status, next);
    }

    const updatedOrder: Order = { ...order, status: next };
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

  private priceOrder(dishes: OrderDish[]): number {
    return dishes.reduce(
      (total, dish) => total + dish.priceSantim * dish.quantity,
      0,
    );
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
