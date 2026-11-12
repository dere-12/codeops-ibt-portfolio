export class OrderNotFoundError extends Error {
  constructor(public readonly id: string) {
    super(`Order ${id} was not found.`);
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
