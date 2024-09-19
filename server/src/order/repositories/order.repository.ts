import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateStatusDto } from '../dtos/update-status';
import { UpdateNotesDto } from '../dtos/update-notes';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        customer: true,
      },
    });
  }

  async findById(orderId: number) {
    return await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
        customer: {
          include: {
            address: true,
          },
        },
        payments: true,
      },
    });
  }

  async create(order: CreateOrderDto) {
    console.log(order);

    return await this.prisma.order.create({
      data: {
        customerId: order.customerId,
        notes: order.notes,
        status: order.status,
        items: {
          createMany: {
            data: order.items,
          },
        },
      },
    });
  }

  async update(orderId: number, order: UpdateOrderDto) {
    return await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        customerId: order.customerId,
        notes: order.notes,
        status: order.status,
        items: {
          createMany: {
            data: order.items,
          },
        },
      },
    });
  }

  async updateNotes(orderId: number, updateStatusDto: UpdateNotesDto) {
    return await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        notes: updateStatusDto.notes,
      },
    });
  }

  async updateStatus(orderId: number, updateStatusDto: UpdateStatusDto) {
    return await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: updateStatusDto.status,
      },
    });
  }

  async delete(orderId: number) {
    return await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  async deleteMany(orderIds: number[]) {
    return await this.prisma.order.deleteMany({
      where: {
        id: {
          in: orderIds,
        },
      },
    });
  }
}
