'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'
import Link from 'next/link'

import { orderColumns } from '@/components/tables/order-culumns'
import { OrderStatus } from '@/enums/order-status'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/shadcnui/button'
import { orders } from '@/data/orders'
import { Order } from '@/types/order'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/tabs'
import { Page } from '@/components/layout/page'

const tabs = [
  {
    id: 'all',
    label: 'Todos',
    value: orders.length,
  },
  {
    id: 'paid',
    label: 'Pagos',
    value: orders.filter((order) => order.status === OrderStatus.PAID).length,
  },
  {
    id: 'pending',
    label: 'Pendentes',
    value: orders.filter((order) => order.status === OrderStatus.PENDING)
      .length,
  } as Tabs,
]

function getData(): Order[] {
  return orders
}

export default function Orders() {
  const data = getData()

  return (
    <Page.Container>
      {/* Header */}
      <Page.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Pedidos</h1>
          <Button
            className="bg-button-primary gap-1 hover:bg-button-primary-hover"
            asChild
          >
            <Link href="/orders/create">
              <Plus size={20} weight="bold" className="text-white" />
              <span>Novo pedido</span>
            </Link>
          </Button>
        </div>
      </Page.Header>

      {/* Content */}
      <TabsProvider tabs={tabs}>
        <Selectors />
        <Content value="all">
          <DataTable columns={orderColumns} data={data} />
        </Content>

        <Content value="paid">
          <DataTable
            columns={orderColumns}
            data={data.filter((order) => order.status === OrderStatus.PAID)}
          />
        </Content>

        <Content value="pending">
          <DataTable
            columns={orderColumns}
            data={data.filter((order) => order.status === OrderStatus.PENDING)}
          />
        </Content>
      </TabsProvider>
    </Page.Container>
  )
}
