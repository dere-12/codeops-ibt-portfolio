export class DishNotOnMenuError extends Error {
  constructor(public readonly restaurantId: number) {
    super(
      `One or more selected dishes are not on restaurant ${restaurantId}'s menu.`,
    );
    this.name = 'DishNotOnMenuError';
  }
}
