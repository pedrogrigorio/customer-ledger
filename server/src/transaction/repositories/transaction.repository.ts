import { PrismaService } from 'src/common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.transaction.findMany();
  }

  async findById(transactionId: number) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
  }

  async findByCustomerId(customerId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        customerId: customerId,
      },
    });
  }

  async create(transaction: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        value: transaction.value,
        type: transaction.type,
        description: transaction.description,
        customerId: transaction.customerId,
      },
    });
  }

  async update(transactionId: number, transaction: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: transaction,
    });
  }

  async delete(transactionId: number) {
    return await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
