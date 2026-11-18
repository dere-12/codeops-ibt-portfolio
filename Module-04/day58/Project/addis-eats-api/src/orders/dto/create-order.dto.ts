import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.validator';
import { AREAS, type Area } from '../../restaurants/restaurant.types';
import { TelebirrPhoneRequiredConstraint } from '../validators/telebirr-phone-required.constraint';
import {
  PAYMENT_METHODS,
  type CreateOrderInput,
  type CreateOrderLineInput,
  type PaymentMethod,
} from '../order.types';

export class OrderLineDto implements CreateOrderLineInput {
  @IsInt()
  @Min(1)
  dishId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto implements CreateOrderInput {
  @IsString()
  @MinLength(2)
  customer!: string;

  @IsIn([...AREAS])
  area!: Area;

  @IsInt()
  @Min(1)
  restaurantId!: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];

  @IsOptional()
  @IsIn([...PAYMENT_METHODS])
  paymentMethod?: PaymentMethod;

  @Validate(TelebirrPhoneRequiredConstraint)
  @IsTeleBirrNumber()
  telebirrPhone?: string;
}
