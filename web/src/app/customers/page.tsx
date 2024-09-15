'use client'

import TabsProvider from '@/components/ui/tabs/tabs-context'
import Selectors from '@/components/ui/tabs/selectors'
import Content from '@/components/ui/tabs/content'

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Tabs } from '@/types/customer-tabs'
import { columns, Customer } from '@/components/tables/columns'
import { DataTable } from '@/components/tables/data-table'

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
  return [
    {
      id: '1',
      customer: 'Pedro Grigorio',
      imgUrl:
        'https://img.freepik.com/fotos-gratis/close-up-do-homem-moreno-sorriso-cheio-de-dentes_1187-5800.jpg',
      phone: '(88) 91234-1234',
      email: 'pedro@example.com',
      balance: 25,
      orders: 30,
    },
    {
      id: '2',
      customer: 'João Ferreira Silva',
      imgUrl:
        'https://img.freepik.com/fotos-premium/closeup-retrato-de-bonito-e-inteligente-sorrindo-com-sorriso-masculino-posando-para-propaganda-social-isolada-no-fundo-branco-com-espaco-de-copia-para-suas-informacoes-ou-conteudo-promocional_616427-3101.jpg',
      phone: '(88) 91111-2222',
      email: 'joao@example.com',
      balance: 40,
      orders: 23,
    },
  ]
}

export default function Customers() {
  const data = getData()

  return (
    <div className="h-full px-12">
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
