import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import {
  InMemoryRestaurantRepository,
  type RestaurantRepository,
} from './restaurants.repository';
import { RESTAURANT_REPOSITORY } from './restaurant.tokens';
import { RESTAURANTS_SEED } from './restaurants.seed';

@Module({
  controllers: [RestaurantsController],
  providers: [
    {
      provide: RESTAURANT_REPOSITORY,
      useFactory: (): RestaurantRepository =>
        new InMemoryRestaurantRepository(RESTAURANTS_SEED),
    },
    {
      provide: RestaurantsService,
      useFactory: (repository: RestaurantRepository) =>
        new RestaurantsService(repository),
      inject: [RESTAURANT_REPOSITORY],
    },
  ],
  exports: [RESTAURANT_REPOSITORY],
})
export class RestaurantsModule {}
