'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'
import Link from 'next/link'

import { costumerColumns } from '@/components/tables/customer-columns'
import { DataTable } from '@/components/tables/data-table'
import { customers } from '@/data/customers'
import { Customer } from '@/types/customer'
import { Button } from '@/components/shadcnui/button'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/tabs'
import { Page } from '@/components/layout/page'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@/services/customer-service'
import { OrderStatus } from '@/enums/order-status'

const tabs = [
  {
    id: 'all',
    label: 'Todos',
    value: customers.length,
  },
  {
    id: 'pendingOrder',
    label: 'Com pedidos pendentes',
    value: 17,
  },
  {
    id: 'noPendingOrder',
    label: 'Sem pedidos pendentes',
    value: 28,
  } as Tabs,
]

export default function Customers() {
  const { data } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: getCustomers,
  })

  if (!data) return null

  return (
    <Page.Container>
      {/* Header */}
      <Page.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Clientes</h1>
          <Button
            className="bg-button-primary gap-1 hover:bg-button-primary-hover"
            asChild
          >
            <Link href="customers/create">
              <Plus size={20} weight="bold" className="text-white" />
              <span>Novo cliente</span>
            </Link>
          </Button>
        </div>
      </Page.Header>

      {/* Content */}
      <TabsProvider tabs={tabs}>
        <Selectors />
        <Content value="all">
          <DataTable columns={costumerColumns} data={data} />
        </Content>

        <Content value="pendingOrder">
          <DataTable
            columns={costumerColumns}
            data={data.filter((customer) =>
              customer.orders.some(
                (order) => order.status === OrderStatus.PENDING,
              ),
            )}
          />
        </Content>

        <Content value="noPendingOrder">
          <DataTable
            columns={costumerColumns}
            data={data.filter((customer) =>
              customer.orders.some(
                (order) => order.status === OrderStatus.PAID,
              ),
            )}
          />
        </Content>
      </TabsProvider>
    </Page.Container>
  )
}
