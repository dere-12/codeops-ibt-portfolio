import { Injectable } from '@nestjs/common';
import type { Dish } from './dish.types';
import { DISHES_SEED } from './dishes.seed';

export interface DishRepository {
  all(): Dish[];
  byId(id: number): Dish | undefined;
  save(dish: Dish): Dish;
}

@Injectable()
export class InMemoryDishRepository implements DishRepository {
  private readonly rows = new Map<number, Dish>(
    DISHES_SEED.map((dish) => [dish.id, dish] as const),
  );

  all(): Dish[] {
    return [...this.rows.values()];
  }

  byId(id: number): Dish | undefined {
    return this.rows.get(id);
  }

  save(dish: Dish): Dish {
    this.rows.set(dish.id, dish);
    return dish;
  }
}
