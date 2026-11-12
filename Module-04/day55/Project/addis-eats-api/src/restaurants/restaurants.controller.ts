import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AREAS, isArea, type Restaurant } from './restaurant.types';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(@Query('area') area?: string): Restaurant[] {
    if (area !== undefined && !isArea(area)) {
      throw new BadRequestException(`area must be one of: ${AREAS.join(', ')}`);
    }

    return this.restaurantsService.findAll(area);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Restaurant {
    return this.restaurantsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRestaurantDto): Restaurant {
    return this.restaurantsService.create(dto);
  }
}
