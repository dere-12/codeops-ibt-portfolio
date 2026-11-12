import type { Restaurant } from './restaurant.types';

export interface RestaurantRepository {
  all(): Restaurant[];
  byId(id: number): Restaurant | undefined;
  save(restaurant: Restaurant): Restaurant;
}

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly rows: Map<number, Restaurant>;

  constructor(seed: Restaurant[] = []) {
    this.rows = new Map<number, Restaurant>(
      seed.map((restaurant) => [restaurant.id, restaurant] as const),
    );
  }

  all(): Restaurant[] {
    return [...this.rows.values()];
  }

  byId(id: number): Restaurant | undefined {
    return this.rows.get(id);
  }

  save(restaurant: Restaurant): Restaurant {
    this.rows.set(restaurant.id, restaurant);
    return restaurant;
  }
}
