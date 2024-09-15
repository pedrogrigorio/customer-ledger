'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/customer-tabs'
import { columns } from '@/components/tables/columns'
import { DataTable } from '@/components/tables/data-table'
import { Customer } from '@/types/customer'
import { customers } from '@/data/customers-data'

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

  return (
    <div className="h-full px-12 overflow-y-auto">
      {/* Header */}
      <div className="my-8">
        <button>
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content */}
      <div>
        <h1 className="text-2xl">Clientes</h1>
        <span className="text-terciary">4 resultados encontrados</span>
      </div>

      <TabsProvider tabs={tabs}>
        <Selectors />
        <Content value="all">
          <DataTable columns={columns} data={data} />
        </Content>
        <Content value="pendingOrder">Teste2</Content>
        <Content value="noPendingOrder">Teste3</Content>
      </TabsProvider>
    </div>
  )
}
