import {
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isSantim', async: false })
export class IsSantimConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return (
      typeof value === 'number' &&
      Number.isInteger(value) &&
      value > 0 &&
      value <= 10_000_000
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return (
      `${args.property} must be a whole number of santim, ` +
      'between 1 and 10,000,000 (100,000 ETB)'
    );
  }
}
