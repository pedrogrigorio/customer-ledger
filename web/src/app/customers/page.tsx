'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'

import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/customer-tabs'
import { columns } from '@/components/tables/columns'
import { DataTable } from '@/components/tables/data-table'
import { Customer } from '@/types/customer'
import { customers } from '@/data/customers'
import { Button } from '@/components/shadcnui/button'
import Link from 'next/link'
import { Page } from '@/components/layout/page'

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

function getData(): Customer[] {
  return customers
}

export default function Customers() {
  const data = getData()

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
          <DataTable columns={columns} data={data} />
        </Content>

        <Content value="pendingOrder">
          <DataTable columns={columns} data={data.slice(13, 30)} />
        </Content>

        <Content value="noPendingOrder">
          <DataTable columns={columns} data={data.slice(-28)} />
        </Content>
      </TabsProvider>
    </Page.Container>
  )
}
