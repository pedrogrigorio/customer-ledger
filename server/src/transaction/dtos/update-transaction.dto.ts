import { TransactionType } from '../enums/transaction-type.enum';

export class UpdateTransactionDto {
  value: number;
  description: string;
  type: TransactionType;
  customerId: number;
}
