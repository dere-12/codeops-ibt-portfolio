import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { OrdersController } from './orders.controller';
import { RestaurantOrdersController } from './restaurant-orders.controller';
import { OrdersService } from './orders.service';
import { ORDER_REPOSITORY } from './order.tokens';
import { InMemoryOrderRepository } from './order.repository';

@Module({
  imports: [RestaurantsModule],
  controllers: [OrdersController, RestaurantOrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
})
export class OrdersModule {}
