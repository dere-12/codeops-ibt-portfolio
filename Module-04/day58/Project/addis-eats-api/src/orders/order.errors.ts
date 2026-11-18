import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';
import type { OrderStatus } from './order.types';

export class OrderNotFoundError extends ResourceNotFoundError {
  constructor(id: number) {
    super('Order', id);
    this.name = 'OrderNotFoundError';
  }
}

export class InvalidTransitionError extends Error {
  constructor(
    public readonly currentStatus: OrderStatus,
    public readonly nextStatus: OrderStatus,
  ) {
    super(
      `Order status cannot transition from ${currentStatus} to ${nextStatus}.`,
    );
    this.name = 'InvalidTransitionError';
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`Payment from ${phone} was declined: ${reason}`);
    this.name = 'PaymentDeclinedError';
  }
}
