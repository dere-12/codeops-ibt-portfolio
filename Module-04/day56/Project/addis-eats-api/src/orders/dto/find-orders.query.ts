import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AREAS, type Area } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES, type OrderStatus } from '../order.types';

export class FindOrdersQuery {
  @IsOptional()
  @IsIn([...ORDER_STATUSES])
  status?: OrderStatus;

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
  @IsIn(['customer', 'area'])
  sort: 'customer' | 'area' = 'customer';
}
