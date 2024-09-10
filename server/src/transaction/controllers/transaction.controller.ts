import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { TransactionService } from '../services/transaction.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async getAllTransactions() {
    return await this.transactionService.getAllTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') transactionId: string) {
    const id = parseInt(transactionId);

    return await this.transactionService.getTransactionById(id);
  }

  @Get('customer/:customerId')
  async getTransactionsByCustomerId(@Param('customerId') customerId: string) {
    const id = parseInt(customerId);

    return await this.transactionService.getTransactionsByCustomerId(id);
  }

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.createTransaction(
      createTransactionDto,
    );
  }

  @Put(':id')
  async updateTransaction(
    @Param('id') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const id = parseInt(transactionId);

    return await this.transactionService.updateTransaction(
      id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') transactionId: string) {
    const id = parseInt(transactionId);

    await this.transactionService.deleteTransaction(id);
  }
}
