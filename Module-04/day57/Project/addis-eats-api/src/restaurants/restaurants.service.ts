import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { RESTAURANT_REPOSITORY } from './restaurant.tokens';
import type { RestaurantRepository } from './restaurants.repository';
import type {
  Area,
  CreateRestaurantInput,
  Restaurant,
} from './restaurant.types';
import type { FindRestaurantsQuery } from './dto/find-restaurants.query';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repository: RestaurantRepository,
  ) {}

  findAll(query: FindRestaurantsQuery): Page<Restaurant> {
    let restaurants = this.repository.all();

    if (query.area) {
      restaurants = restaurants.filter(
        (restaurant) => restaurant.area === query.area,
      );
    }

    if (query.isOpen !== undefined) {
      restaurants = restaurants.filter(
        (restaurant) => restaurant.isOpen === query.isOpen,
      );
    }

    restaurants = [...restaurants].sort((a, b) =>
      a[query.sort].localeCompare(b[query.sort]),
    );

    const total = restaurants.length;
    const items = restaurants.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findOne(id: number): Restaurant {
    const restaurant = this.repository.byId(id);

    if (!restaurant) {
      throw new ResourceNotFoundError('Restaurant', id);
    }

    return restaurant;
  }

  create(input: CreateRestaurantInput): Restaurant {
    const id =
      Math.max(0, ...this.repository.all().map((restaurant) => restaurant.id)) +
      1;

    const restaurant: Restaurant = {
      id,
      name: input.name,
      area: input.area,
      isOpen: input.isOpen ?? true,
    };

    return this.repository.save(restaurant);
  }
}
