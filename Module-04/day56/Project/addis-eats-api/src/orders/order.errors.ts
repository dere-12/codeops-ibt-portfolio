import { ResourceNotFoundError } from '../common/errors/resource-not-found.error';

export class OrderNotFoundError extends ResourceNotFoundError {
  constructor(id: number) {
    super('Order', id);
    this.name = 'OrderNotFoundError';
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
