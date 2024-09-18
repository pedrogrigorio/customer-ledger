import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/item/repositories/item.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private customerRepository: CustomerRepository,
    private itemRepository: ItemRepository,
  ) {}

  async getAllOrders() {
    const Orders = await this.orderRepository.findAll();

    return Orders;
  }

  async getOrderById(orderId: number) {
    const Order = await this.orderRepository.findById(orderId);

    if (!Order) {
      throw new Error(`Order not found`);
    }

    return Order;
  }

  async createOrder(order: CreateOrderDto) {
    const costumer = this.customerRepository.findById(order.customerId);

    if (!costumer) {
      throw new Error(`Customer not found`);
    }

    const createdOrder = await this.orderRepository.create(order);

    return createdOrder;
  }

  async updateOrder(orderId: number, order: UpdateOrderDto) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new Error(`Order not found`);
    }

    if (existingOrder.items) {
      await this.itemRepository.deleteMany(orderId);
    }

    const updatedOrder = await this.orderRepository.update(orderId, order);

    return updatedOrder;
  }

  async deleteOrder(orderId: number) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error(`Order not found`);
    }

    await this.orderRepository.delete(orderId);
  }

  async deleteOrders(orderIds: number[]) {
    for (const orderId of orderIds) {
      const existingOrder = await this.orderRepository.findById(orderId);

      if (!existingOrder) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
    }

    await this.orderRepository.deleteMany(orderIds);
  }
}
