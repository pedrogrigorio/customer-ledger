import { TransactionModule } from './transaction/transaction.module';
import { CustomerModule } from './customer/customer.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomerModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
