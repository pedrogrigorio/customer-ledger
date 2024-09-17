import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { OrderStatus } from '@/enums/order-status'
import { formatDate } from '@/utils/formatDate'
import { Order } from '@/types/order'
import { Button } from '@/components/shadcnui/button'
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

interface CardProps {
  order: Order
}

export default function Card({ order }: CardProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <div className="border h-[300px] rounded-xl flex flex-col border-primary p-6 text-secondary">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Pedido {order.id}</h2>
          <AlertDialog>
            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              {/* Dropdown Content */}
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/orders/${order.id}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Visualizar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/orders/edit/${order.id}`}
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

            {/* Dialog */}
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

        {/* Body */}
        <div className="mt-5 flex-1">
          <span className="text-xs text-terciary">
            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
          </span>
          <ul className="text-sm">
            {order.items.length > 3 ? (
              <>
                {order.items.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                  </li>
                ))}
                <li>
                  <span>...</span>
                </li>
              </>
            ) : (
              order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>Produto 1</span>
                  <span>1 un</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-6" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-terciary">Status</span>
            {order.status === OrderStatus.PAID ? (
              <span className="text-sm font-medium text-status-paid">Pago</span>
            ) : (
              <span className="text-sm font-medium text-status-pending-alternative">
                Pendente
              </span>
            )}
            <span className="text-sm"></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-terciary">Criado em</span>
            <span className="text-sm">{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
