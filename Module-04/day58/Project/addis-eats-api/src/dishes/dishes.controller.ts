import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Page } from '../common/page';
import { CreateDishDto } from './dto/create-dish.dto';
import type { Dish } from './dish.types';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  findAll(
    @Query('restaurantId', new ParseIntPipe({ optional: true }))
    restaurantId?: number,
  ): Page<Dish> {
    return this.dishesService.findAll(restaurantId);
  }

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=60')
  findOne(@Param('id', ParseIntPipe) id: number): Dish {
    return this.dishesService.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(
    @Body() dto: CreateDishDto,
    @Res({ passthrough: true }) response: Response,
  ): Dish {
    const dish = this.dishesService.create(dto);

    response.setHeader('Location', `/api/v1/dishes/${dish.id}`);

    return dish;
  }
}
