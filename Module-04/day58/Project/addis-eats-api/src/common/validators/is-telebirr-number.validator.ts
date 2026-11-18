import { registerDecorator, type ValidationOptions } from 'class-validator';

export const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export function IsTeleBirrNumber(
  options?: ValidationOptions,
): PropertyDecorator {
  return (target, propertyKey) => {
    registerDecorator({
      name: 'isTeleBirrNumber',
      target: target.constructor,
      propertyName: String(propertyKey),
      options,
      validator: {
        validate: (value: unknown): boolean =>
          value === undefined ||
          value === null ||
          (typeof value === 'string' && TELEBIRR.test(value)),
        defaultMessage: () =>
          'Enter a valid TeleBirr number using 09xxxxxxxx or +2519xxxxxxxx.',
      },
    });
  };
}
