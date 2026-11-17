import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { DishesController } from './dishes.controller';
import { DISH_REPOSITORY } from './dish.tokens';
import { InMemoryDishRepository } from './dishes.repository';
import { DishesService } from './dishes.service';
import { RestaurantDishesController } from './restaurant-dishes.controller';

@Module({
  imports: [RestaurantsModule],
  controllers: [DishesController, RestaurantDishesController],
  providers: [
    DishesService,
    {
      provide: DISH_REPOSITORY,
      useClass: InMemoryDishRepository,
    },
  ],
})
export class DishesModule {}
