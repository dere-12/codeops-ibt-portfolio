import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Page } from '../common/page';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders.query';
import { UpdateStatusDto } from './dto/update-status.dto';
import { OrdersService } from './orders.service';
import type { Order } from './order.types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  findAll(@Query() query: FindOrdersQuery): Page<Order> {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-store')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.ordersService.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(
    @Body() dto: CreateOrderDto,
    @Res({ passthrough: true }) response: Response,
  ): Order {
    const order = this.ordersService.create(dto);

    response.setHeader('Location', `/api/v1/orders/${order.id}`);

    return order;
  }

  @Patch(':id/status')
  @Header('Cache-Control', 'no-store')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Order {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Cache-Control', 'no-store')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.remove(id);
  }
}
