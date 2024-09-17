import { OrderStatus } from '@/enums/order-status'
import { Item } from './item'
import { Payment } from './payment'

export interface Order {
  id: number
  status: OrderStatus
  notes?: string
  items: Item[]
  customerId: number
  createdAt: string
  payments?: Payment[]
}
