import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { AREAS, type Area } from '../restaurant.types';

const RESTAURANT_FIELDS = ['id', 'name', 'area', 'isOpen'] as const;

type RestaurantField = (typeof RESTAURANT_FIELDS)[number];

export class FindRestaurantsQuery {
  @IsOptional()
  @IsIn([...AREAS])
  area?: Area;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isOpen?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @IsOptional()
  @IsIn(['name', 'area', '-name', '-area'])
  sort: 'name' | 'area' | '-name' | '-area' = 'name';

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsArray()
  @IsIn([...RESTAURANT_FIELDS], { each: true })
  fields?: RestaurantField[];
}
