'use client'

import OrderOptions from '@/components/dropdown-menus/order-options'

import { formatDate } from '@/utils/formatDate'
import { useParams } from 'next/navigation'
import { orders } from '@/data/orders'
import { Page } from '@/components/layout/page'

export default function Order() {
  const { orderId } = useParams()

  const order = orders.find((order) => order.id === Number(orderId))

  if (!order) return null

  return (
    <Page.Container>
      <Page.Header>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">Pedido {order.id}</h1>
            <span className="text-terciary">{formatDate(order.createdAt)}</span>
          </div>

          <OrderOptions order={order} variant="primary" />
        </div>
      </Page.Header>

      <div>
        <div></div>
      </div>
    </Page.Container>
  )
}
