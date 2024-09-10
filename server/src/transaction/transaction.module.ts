import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    CustomerRepository,
    TransactionRepository,
    PrismaService,
  ],
})
export class TransactionModule {}
