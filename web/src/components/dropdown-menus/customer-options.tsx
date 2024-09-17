import Link from 'next/link'

import { Eye, PencilSimple, TrashSimple } from '@phosphor-icons/react/dist/ssr'
import { MoreHorizontal, MoreVertical } from 'lucide-react'
import { Customer } from '@/types/customer'
import { Button } from '../shadcnui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/shadcnui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/shadcnui/dropdown-menu'

interface CustomerOptionsProps {
  customer: Customer
  variant?: 'primary' | 'ghost'
  withViewItem?: boolean
}

export default function CustomerOptions({
  customer,
  variant,
  withViewItem,
}: CustomerOptionsProps) {
  return (
    <AlertDialog>
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {variant === 'ghost' ? (
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-button-primary gap-1 hover:bg-button-primary-hover px-0 w-10"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuLabel>Ações do cliente</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {withViewItem && (
            <DropdownMenuItem asChild>
              <Link
                href={`/customers/${customer.id}`}
                onClick={(event) => event.stopPropagation()}
                className="gap-2"
              >
                <Eye size={16} />
                <span>Visualizar</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Link
              href={`/customers/edit/${customer.id}`}
              onClick={(event) => event.stopPropagation()}
              className="gap-2"
            >
              <PencilSimple size={16} />
              <span>Editar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <AlertDialogTrigger
              className="w-full text-danger gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <TrashSimple size={16} />
              <span>Excluir</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir esse cliente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso vai excluir permanentemente o
            cliente e todos seus pedidos.
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
  )
}
