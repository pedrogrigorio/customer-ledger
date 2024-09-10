import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.customer.findMany();
  }

  async findById(customerId: number) {
    return await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
  }

  async create(customer: CreateCustomerDto) {
    return await this.prisma.customer.create({
      data: {
        name: customer.name,
        email: customer.email,
        address: customer.address,
        imgUrl: customer.imgUrl,
        phone: customer.phone,
      },
    });
  }

  async update(customerId: number, customer: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: customer.name,
        email: customer.email,
        address: customer.address,
        imgUrl: customer.imgUrl,
        phone: customer.phone,
      },
    });
  }

  async delete(customerId: number) {
    return await this.prisma.customer.delete({
      where: {
        id: customerId,
      },
    });
  }
}
