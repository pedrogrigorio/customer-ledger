import { Address } from './address'
import { Order } from './order'

export type Customer = {
  id: number
  name: string
  phone?: string
  email?: string
  balance: number
  orders: Order[]
  address: Address
}
