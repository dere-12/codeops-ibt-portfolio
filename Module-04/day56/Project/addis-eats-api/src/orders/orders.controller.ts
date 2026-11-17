import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { Page } from '../common/page';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { OrdersService } from './orders.service';
import type { Order } from './order.types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  findAll(): Page<Order> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Header('Cache-Control', 'no-store')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.ordersService.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(@Body() dto: CreateOrderDto): Order {
    return this.ordersService.create(dto);
  }

  @Patch(':id/status')
  @Header('Cache-Control', 'no-store')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Order {
    return this.ordersService.updateStatus(id, dto.status);
  }
}
