import { OrderStatus } from '@/enums/order-status'
import { Item } from './item'

export interface Order {
  id: number
  status: OrderStatus
  notes: string
  items: Item[]
  customerId: number
  createdAt: string
}
