import { api } from '@/lib/axios'
import { CustomerFormData } from '@/types/validations'

export async function getCustomers() {
  const response = await api.get('customers')

  return response.data
}

export async function getCustomerById(customerId: number | string) {
  const response = await api.get(`customers/${customerId}`)

  return response.data
}

export async function updateBalance(customerId: number, balance: number) {
  const response = await api.put(`customers/${customerId}/balance`, { balance })

  console.log(response.data)
}

export async function updateCustomer(
  customerId: number | string,
  data: CustomerFormData,
) {
  const response = await api.put(`customers/${customerId}`, data)

  console.log(response.data)
}
