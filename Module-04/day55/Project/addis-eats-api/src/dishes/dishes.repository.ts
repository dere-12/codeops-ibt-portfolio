import type { Dish } from './dish.types';

export interface DishRepository {
  all(): Dish[];
  byId(id: number): Dish | undefined;
  save(dish: Dish): Dish;
}

export class InMemoryDishRepository implements DishRepository {
  private readonly rows: Map<number, Dish>;

  constructor(seed: Dish[] = []) {
    this.rows = new Map<number, Dish>(
      seed.map((dish) => [dish.id, dish] as const),
    );
  }

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
