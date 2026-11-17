import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import type { Page } from '../common/page';
import { RestaurantsService } from '../restaurants/restaurants.service';
import type { Order } from './order.types';
import { OrdersService } from './orders.service';

@Controller('restaurants/:restaurantId/orders')
export class RestaurantOrdersController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  findByRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
  ): Page<Order> {
    this.restaurantsService.findOne(restaurantId);

    return this.ordersService.findByRestaurant(restaurantId);
  }
}
