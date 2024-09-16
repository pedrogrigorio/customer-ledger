'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'

import { ArrowLeft, Plus } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/customer-tabs'
import { columns } from '@/components/tables/columns'
import { DataTable } from '@/components/tables/data-table'
import { Customer } from '@/types/customer'
import { customers } from '@/data/customers-data'
import { Button } from '@/components/shadcnui/button'
import Link from 'next/link'
import { Page } from '@/components/layout/page'
import { useRouter } from 'next/navigation'

const tabs = [
  {
    id: 'all',
    label: 'Todos',
    value: 80,
  },
  {
    id: 'pendingOrder',
    label: 'Com pedidos pendentes',
    value: 17,
  },
  {
    id: 'noPendingOrder',
    label: 'Sem pedidos pendentes',
    value: 63,
  } as Tabs,
]

function getData(): Customer[] {
  return customers
}

export default function Customers() {
  const data = getData()
  const router = useRouter()

  return (
    <Page.Container>
      {/* Header */}
      <Page.Header>
        <button onClick={router.back}>
          <ArrowLeft size={20} />
        </button>
      </Page.Header>

      {/* Content */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Clientes</h1>
          <span className="text-terciary">4 resultados encontrados</span>
        </div>
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

      <TabsProvider tabs={tabs}>
        <Selectors />
        <Content value="all">
          <DataTable columns={columns} data={data} />
        </Content>

        <Content value="pendingOrder">
          <DataTable columns={columns} data={data.slice(5)} />
        </Content>

        <Content value="noPendingOrder">
          <DataTable columns={columns} data={data.slice(20)} />
        </Content>
      </TabsProvider>
    </Page.Container>
  )
}
