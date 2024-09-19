import { OrderFormData } from '@/types/validations'
import { api } from '@/lib/axios'

export async function getOrders() {
  const response = await api.get('orders')

  return response.data
}

export async function getOrderById(orderId: number | string) {
  const response = await api.get(`orders/${orderId}`)

  return response.data
}

export async function createOrder(orderFormData: OrderFormData) {
  const response = await api.post(`customers`, orderFormData)

  console.log(response.data)
}

export async function updateOrder(
  customerId: number | string,
  orderFormData: OrderFormData,
) {
  const response = await api.put(`customers/${customerId}`, orderFormData)

  console.log(response.data)
}

// export async function updateBalance(customerId: number, balance: number) {
//   const response = await api.put(`customers/${customerId}/balance`, { balance })

//   console.log(response.data)
// }

export async function deleteOrder(customerId: number | string) {
  await api.delete(`customers/${customerId}`)
}

export async function deleteManyOrders(customerIds: number[]) {
  await api.delete('customers', {
    data: {
      customerIds,
    },
  })
}
