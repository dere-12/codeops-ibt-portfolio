import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';
import {
  AREAS,
  type Area,
  type CreateRestaurantInput,
} from '../restaurant.types';

export class CreateRestaurantDto implements CreateRestaurantInput {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsIn([...AREAS])
  area!: Area;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
