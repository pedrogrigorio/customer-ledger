import { TransactionModule } from './transaction/transaction.module';
import { CustomerModule } from './customer/customer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomerModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
