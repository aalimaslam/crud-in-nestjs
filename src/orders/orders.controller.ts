import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entity/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.getOrderById(id);
  }

  @Post()
  async create(
    @Body() body: CreateOrderDto,
  ): Promise<Order | NotFoundException | InternalServerErrorException> {
    try {
      return await this.orderService.createOrder(body);
    } catch (err) {
      console.log(err);
      return new InternalServerErrorException('Internal Server Error');
    }
  }
}
