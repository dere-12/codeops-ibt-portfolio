import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import { RESTAURANT_REPOSITORY } from './restaurant.tokens';
import type { RestaurantRepository } from './restaurants.repository';
import type {
  Area,
  CreateRestaurantInput,
  Restaurant,
} from './restaurant.types';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repository: RestaurantRepository,
  ) {}

  findAll(area?: Area): Restaurant[] {
    const restaurants = this.repository.all();

    return area
      ? restaurants.filter((restaurant) => restaurant.area === area)
      : restaurants;
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
