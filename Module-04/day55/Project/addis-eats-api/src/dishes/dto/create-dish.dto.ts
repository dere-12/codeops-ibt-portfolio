import { IsInt, IsString, Min, MinLength } from 'class-validator';
import type { CreateDishInput } from '../dish.types';

export class CreateDishDto implements CreateDishInput {
  @IsInt()
  @Min(1)
  restaurantId!: number;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsInt()
  @Min(1)
  priceSantim!: number;
}
