import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../shadcnui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../shadcnui/dropdown-menu'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string
  customer: string
  imgUrl: string
  phone: string
  email: string
  balance: number
  orders: number
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'customer',
    header: 'Cliente',
    cell: ({ row }) => {
      const name = row.getValue('customer') as string
      const imgUrl = row.original.imgUrl
      return (
        <div className="flex gap-2 font-medium items-center">
          <Image
            src={imgUrl}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          ></Image>{' '}
          <span>{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'balance',
    header: 'Saldo',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('balance'))
      const formatted = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'orders',
    header: 'Pedidos',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Visualizar pedidos</DropdownMenuItem>
            <DropdownMenuItem>Editar cliente</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Deletar cliente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
