import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.tokens';
import type { RestaurantRepository } from '../restaurants/restaurants.repository';
import { DishesController } from './dishes.controller';
import { DISH_REPOSITORY } from './dish.tokens';
import { DISHES_SEED } from './dishes.seed';
import {
  InMemoryDishRepository,
  type DishRepository,
} from './dishes.repository';
import { DishesService } from './dishes.service';

@Module({
  imports: [RestaurantsModule],
  controllers: [DishesController],
  providers: [
    {
      provide: DISH_REPOSITORY,
      useFactory: (): DishRepository => new InMemoryDishRepository(DISHES_SEED),
    },
    {
      provide: DishesService,
      useFactory: (
        dishRepository: DishRepository,
        restaurantRepository: RestaurantRepository,
      ) => new DishesService(dishRepository, restaurantRepository),
      inject: [DISH_REPOSITORY, RESTAURANT_REPOSITORY],
    },
  ],
})
export class DishesModule {}
