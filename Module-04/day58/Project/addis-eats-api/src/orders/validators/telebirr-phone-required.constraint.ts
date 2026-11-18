import {
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';
import type { PaymentMethod } from '../order.types';

interface OrderPaymentFields {
  paymentMethod?: PaymentMethod;
}

@ValidatorConstraint({ name: 'telebirrPhoneRequired', async: false })
export class TelebirrPhoneRequiredConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const order = args.object as OrderPaymentFields;

    if (order.paymentMethod !== 'TELEBIRR') {
      return true;
    }

    return value !== undefined && value !== null;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} is required when paymentMethod is TELEBIRR.`;
  }
}
