import { DeleteOrdersDto } from '../dtos/delete-orders.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderService } from '../services/order.service';
import {
  Controller,
  Delete,
  Param,
  Body,
  Post,
  Put,
  Get,
} from '@nestjs/common';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    const id = parseInt(orderId);

    return await this.orderService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const id = parseInt(orderId);

    return await this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string) {
    const id = parseInt(orderId);

    await this.orderService.deleteOrder(id);
  }

  @Delete()
  async deleteOrders(@Body() deleteOrdersDto: DeleteOrdersDto) {
    const { orderIds } = deleteOrdersDto;

    return await this.orderService.deleteOrders(orderIds);
  }
}
