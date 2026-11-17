import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { InMemoryRestaurantRepository } from './restaurants.repository';
import { RESTAURANT_REPOSITORY } from './restaurant.tokens';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
  exports: [RESTAURANT_REPOSITORY, RestaurantsService],
})
export class RestaurantsModule {}
