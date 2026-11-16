import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

import { AREAS, type Area } from '../order.types';
import type { CreateOrderInput } from '../order.types';

export class CreateOrderDto implements CreateOrderInput {
  @IsString()
  @MinLength(2)
  customer!: string;

  @IsIn([...AREAS])
  area!: Area;

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @IsString()
  @Matches(/^(?:\+251|0)9\d{8}$/, {
    message: 'telebirrPhone must be a valid Ethiopian mobile number',
  })
  telebirrPhone?: string;
}
