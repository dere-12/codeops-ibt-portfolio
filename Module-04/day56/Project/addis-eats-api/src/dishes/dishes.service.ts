import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.tokens';
import type { RestaurantRepository } from '../restaurants/restaurants.repository';
import { DISH_REPOSITORY } from './dish.tokens';
import type { CreateDishInput, Dish } from './dish.types';
import type { DishRepository } from './dishes.repository';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: DishRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(restaurantId?: number): Page<Dish> {
    let dishes = this.dishRepository.all();

    if (restaurantId !== undefined) {
      dishes = dishes.filter((dish) => dish.restaurantId === restaurantId);
    }

    const limit = 20;
    const offset = 0;

    return {
      items: dishes.slice(offset, offset + limit),
      total: dishes.length,
      limit,
      offset,
    };
  }

  findByRestaurant(restaurantId: number): Page<Dish> {
    return this.findAll(restaurantId);
  }

  findOne(id: number): Dish {
    const dish = this.dishRepository.byId(id);

    if (!dish) {
      throw new ResourceNotFoundError('Dish', id);
    }

    return dish;
  }

  create(input: CreateDishInput): Dish {
    const restaurant = this.restaurantRepository.byId(input.restaurantId);

    if (!restaurant) {
      throw new ResourceNotFoundError('Restaurant', input.restaurantId);
    }

    const id =
      Math.max(0, ...this.dishRepository.all().map((dish) => dish.id)) + 1;

    const dish: Dish = {
      id,
      restaurantId: input.restaurantId,
      name: input.name,
      priceSantim: input.priceSantim,
    };

    return this.dishRepository.save(dish);
  }
}
