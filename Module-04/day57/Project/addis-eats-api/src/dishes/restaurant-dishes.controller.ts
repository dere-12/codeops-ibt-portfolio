import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { Page } from '../common/page';
import { RestaurantsService } from '../restaurants/restaurants.service';
import type { Dish } from './dish.types';
import { DishesService } from './dishes.service';

@Controller('restaurants/:restaurantId/dishes')
export class RestaurantDishesController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly dishesService: DishesService,
  ) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  findByRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
  ): Page<Dish> {
    this.restaurantsService.findOne(restaurantId);

    return this.dishesService.findByRestaurant(restaurantId);
  }

  @Get(':dishId')
  @Header('Cache-Control', 'public, max-age=60')
  findOneForRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ): Dish {
    this.restaurantsService.findOne(restaurantId);
    const dish = this.dishesService.findOne(dishId);

    if (dish.restaurantId !== restaurantId) {
      throw new ResourceNotFoundError('Dish', dishId);
    }

    return dish;
  }
}
