import {
  InMemoryOrderRepository,
  OrderNotFoundError,
  OrdersService,
} from './index';

const repository = new InMemoryOrderRepository();
const ordersService = new OrdersService(repository);

const order = ordersService.find('ord_001');
console.log('Found order:', order);

const customerNames: string[] = ordersService.summarise('customerName');

console.log('Customer names:', customerNames);

const orderIds: string[] = ordersService.summarise('id');

console.log('Order IDs:', orderIds);

const fees = ordersService.feesByArea();

console.log('Delivery fee for Bole:', fees.Bole);

try {
  ordersService.find('ord_missing');
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
