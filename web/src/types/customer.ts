import { Address } from './address'

export type Customer = {
  id: number
  name: string
  phone?: string
  email?: string
  balance: number
  orders: number
  address: Address
}
