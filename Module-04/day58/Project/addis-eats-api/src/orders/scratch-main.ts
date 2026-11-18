import {
  InMemoryOrderRepository,
  OrderNotFoundError,
  OrdersService,
} from './index';
import { InMemoryDishRepository } from '../dishes/dishes.repository';
import { DishesService } from '../dishes/dishes.service';
import { InMemoryRestaurantRepository } from '../restaurants/restaurants.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';

const orderRepository = new InMemoryOrderRepository();
const restaurantRepository = new InMemoryRestaurantRepository();
const restaurantsService = new RestaurantsService(restaurantRepository);
const dishesService = new DishesService(
  new InMemoryDishRepository(),
  restaurantRepository,
);
const ordersService = new OrdersService(
  orderRepository,
  restaurantsService,
  dishesService,
);

const order = ordersService.findOne(1);
console.log('Found order:', order);

const customerNames: string[] = ordersService.summarise('customer');
console.log('Customer names:', customerNames);

const orderIds: number[] = ordersService.summarise('id');
console.log('Order IDs:', orderIds);

const fees = ordersService.feesByArea();
console.log('Delivery fee for Bole:', fees.Bole);

try {
  ordersService.findOne(999);
} catch (error) {
  if (error instanceof OrderNotFoundError) {
    console.error(error.message);
    console.error('Missing order ID:', error.id);
  } else if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
}
