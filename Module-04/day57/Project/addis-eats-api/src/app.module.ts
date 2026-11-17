import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [OrdersModule, RestaurantsModule, DishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

