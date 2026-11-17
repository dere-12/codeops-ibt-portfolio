import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import type { Page } from '../common/page';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import type { Restaurant } from './restaurant.types';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  findAll(@Query() query: FindRestaurantsQuery): Page<Restaurant> {
    return this.restaurantsService.findAll(query);
  }

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=60')
  findOne(@Param('id', ParseIntPipe) id: number): Restaurant {
    return this.restaurantsService.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(@Body() dto: CreateRestaurantDto): Restaurant {
    return this.restaurantsService.create(dto);
  }
}
