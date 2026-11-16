import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import type { Dish } from './dish.types';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(
    @Query('restaurantId', new ParseIntPipe({ optional: true }))
    restaurantId?: number,
  ): Dish[] {
    return this.dishesService.findAll(restaurantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dish {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDishDto): Dish {
    return this.dishesService.create(dto);
  }
}
