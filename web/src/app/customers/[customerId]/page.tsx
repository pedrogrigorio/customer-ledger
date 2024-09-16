'use client'

import Link from 'next/link'

import { MoreVertical } from 'lucide-react'
import { useParams } from 'next/navigation'
import { customers } from '@/data/customers'
import { Button } from '@/components/shadcnui/button'
import { Page } from '@/components/layout/page'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/shadcnui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/shadcnui/dropdown-menu'
import { formatCurrency } from '@/utils/formatCurrency'
import Selectors from '@/components/ui/tabs/selectors'
import TabsProvider from '@/components/ui/tabs/tabs-context'
import { Tabs } from '@/types/customer-tabs'
import Content from '@/components/ui/tabs/content'
import Galery from '@/components/ui/galery'
import { orders } from '@/data/orders'
import { OrderStatus } from '@/enums/order-status'
import { useRef } from 'react'

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
    (customer) => customer.id === parseInt(customerId[0]),
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
              <Link href="orders/create">
                <Plus size={20} weight="bold" className="text-white" />
                <span>Novo pedido</span>
              </Link>
            </Button>

            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-button-primary gap-1 hover:bg-button-primary-hover px-0 w-10"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                {/* Dropdown Content */}
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={`edit/${customer?.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Editar cliente
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <AlertDialogTrigger
                      className="w-full text-danger"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Excluir
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir esse cliente?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso vai excluir
                    permanentemente o cliente e todos seus pedidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={(event) => event.stopPropagation()}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-button-danger hover:bg-button-danger-hover"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Sim, excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
