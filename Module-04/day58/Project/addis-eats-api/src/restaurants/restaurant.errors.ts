export class RestaurantClosedError extends Error {
  constructor(public readonly restaurantId: number) {
    super(`Restaurant ${restaurantId} is currently closed.`);
    this.name = 'RestaurantClosedError';
  }
}