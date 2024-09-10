import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async getAllTransactions() {
    const transactions = await this.transactionRepository.findAll();

    return transactions;
  }

  async getTransactionById(transactionId: number) {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new Error(`Transaction not found`);
    }

    return transaction;
  }

  async getTransactionsByCustomerId(customerId: number) {
    const costumer = this.customerRepository.findById(customerId);

    if (!costumer) {
      throw new Error(`Customer not found`);
    }

    const transactions =
      await this.transactionRepository.findByCustomerId(customerId);

    return transactions;
  }

  async createTransaction(transaction: CreateTransactionDto) {
    const costumer = this.customerRepository.findById(transaction.customerId);

    if (!costumer) {
      throw new Error(`Customer not found`);
    }

    const createdTransaction =
      await this.transactionRepository.create(transaction);

    return createdTransaction;
  }

  async updateTransaction(
    transactionId: number,
    transaction: UpdateTransactionDto,
  ) {
    const existingTransaction =
      await this.transactionRepository.findById(transactionId);

    if (!existingTransaction) {
      throw new Error(`Transaction not found`);
    }

    const updatedTransaction = await this.transactionRepository.update(
      transactionId,
      transaction,
    );

    return updatedTransaction;
  }

  async deleteTransaction(transactionId: number) {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new Error(`Transaction not found`);
    }

    await this.transactionRepository.delete(transactionId);
  }
}
