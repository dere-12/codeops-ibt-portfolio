import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AREAS, type Area } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES, type OrderStatus } from '../order.types';

const ORDER_SORT_FIELDS = [
  'customer',
  'area',
  'totalSantim',
  '-customer',
  '-area',
  '-totalSantim',
] as const;

type OrderSortField = (typeof ORDER_SORT_FIELDS)[number];

export class FindOrdersQuery {
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsArray()
  @IsIn([...ORDER_STATUSES], { each: true })
  status?: OrderStatus[];

  @IsOptional()
  @IsIn([...AREAS])
  area?: Area;

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
  @IsIn([...ORDER_SORT_FIELDS])
  sort: OrderSortField = 'customer';
}
