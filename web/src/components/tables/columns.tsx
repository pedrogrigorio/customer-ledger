import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../shadcnui/checkbox'
import { Customer } from '@/types/customer'
import { Button } from '../shadcnui/button'
import { formatCurrency } from '@/utils/formatCurrency'
import CustomerOptions from '../dropdown-menus/customer-options'

export const columns: ColumnDef<Customer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(event) => event.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-0"
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return <span className="font-medium">{name}</span>
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
      const formatted = formatCurrency(amount)

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
        <CustomerOptions customer={customer} variant="ghost" withViewItem />
      )
    },
  },
]
