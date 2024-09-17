'use client'

import Link from 'next/link'

import { MoreVertical } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { useParams } from 'next/navigation'
import { orders } from '@/data/orders'
import { Page } from '@/components/layout/page'
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
import { Button } from '@/components/shadcnui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/shadcnui/dropdown-menu'

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
                    href={`edit/${order?.id}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Editar
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
                  Tem certeza que deseja excluir esse pedido?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso vai excluir
                  permanentemente o pedido.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
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
      </Page.Header>

      <div>
        <div></div>
      </div>
    </Page.Container>
  )
}
