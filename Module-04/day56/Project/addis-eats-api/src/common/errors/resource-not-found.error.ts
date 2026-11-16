export class ResourceNotFoundError extends Error {
  constructor(
    public readonly resource: string,
    public readonly id: number | string,
  ) {
    super(`${resource} ${id} was not found.`);
    this.name = 'ResourceNotFoundError';
  }
}
