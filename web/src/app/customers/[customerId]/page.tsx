'use client'

import CustomerOptions from '@/components/dropdown-menus/customer-options'
import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'
import Galery from '@/app/customers/[customerId]/_components/galery'
import Link from 'next/link'

import { formatCurrency } from '@/utils/formatCurrency'
import { OrderStatus } from '@/enums/order-status'
import { useParams } from 'next/navigation'
import { customers } from '@/data/customers'
import { Button } from '@/components/shadcnui/button'
import { orders } from '@/data/orders'
import { useRef } from 'react'
import { Tabs } from '@/types/tabs'
import { Page } from '@/components/layout/page'
import { Plus } from '@phosphor-icons/react/dist/ssr'

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

export default function Customer() {
  const { customerId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)

  const customer = customers.find(
    (customer) => customer.id === Number(customerId),
  )

  if (!customer) return null

  return (
    <Page.Container ref={containerRef}>
      <Page.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{customer.name}</h1>
          <div className="flex gap-2 justify-between items-center">
            <div className="border border-primary rounded-lg font-medium h-10 flex gap-1 items-center px-4 text-sm">
              <span>Saldo: </span>
              <span className="text-currency">
                {formatCurrency(customer.balance)}
              </span>
            </div>

            <Button
              className="bg-button-primary gap-1 hover:bg-button-primary-hover"
              asChild
            >
              <Link href="/orders/create">
                <Plus size={20} weight="bold" className="text-white" />
                <span>Novo pedido</span>
              </Link>
            </Button>

            <CustomerOptions
              customer={customer}
              variant="primary"
              showBalanceItem
              useLongLabel
            />
          </div>
        </div>
      </Page.Header>

      <TabsProvider tabs={tabs}>
        <Selectors />
        <Content value="all">
          <Galery data={orders} containerRef={containerRef} />
        </Content>

        <Content value="paid">
          <Galery
            data={orders.filter((order) => order.status === OrderStatus.PAID)}
            containerRef={containerRef}
          />
        </Content>

        <Content value="pending">
          <Galery
            data={orders.filter(
              (order) => order.status === OrderStatus.PENDING,
            )}
            containerRef={containerRef}
          />
        </Content>
      </TabsProvider>
    </Page.Container>
  )
}
