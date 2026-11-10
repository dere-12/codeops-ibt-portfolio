import {
  InMemoryOrderRepository,
  OrderNotFoundError,
  OrderService,
  seedOrders,
} from './index';

const repository = new InMemoryOrderRepository(seedOrders);
const orderService = new OrderService(repository);

const order = orderService.find('ord_001');
console.log('Found order:', order);

const customerNames: string[] = orderService.summarise('customerName');

console.log('Customer names:', customerNames);

const orderIds: string[] = orderService.summarise('id');

console.log('Order IDs:', orderIds);

const fees = orderService.feesByArea();

console.log('Delivery fee for Bole:', fees.Bole);

try {
  orderService.find('ord_missing');
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
