import { Injectable } from '@nestjs/common';
import type { Restaurant } from './restaurant.types';
import { RESTAURANTS_SEED } from './restaurants.seed';

export interface RestaurantRepository {
  all(): Restaurant[];
  byId(id: number): Restaurant | undefined;
  save(restaurant: Restaurant): Restaurant;
}

@Injectable()
export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly rows = new Map<number, Restaurant>(
    RESTAURANTS_SEED.map((restaurant) => [restaurant.id, restaurant] as const),
  );

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
