import DeleteManyDialog from '../dialogs/delete-many-dialog'

import { AlertDialog, AlertDialogTrigger } from '../shadcnui/alert-dialog'
import { TrashSimple } from '@phosphor-icons/react/dist/ssr'
import { CaretDown } from '@phosphor-icons/react'
import { Customer } from '@/types/customer'
import { Button } from '../shadcnui/button'
import { Order } from '@/types/order'
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/shadcnui/dropdown-menu'

type DataType = Customer | Order

interface TableMoreActionsProps<TData extends DataType> {
  data: TData[]
}

export default function TableMoreActions<TData extends DataType>({
  data,
}: TableMoreActionsProps<TData>) {
  const variant =
    data.length > 0 ? ('customer' in data[0] ? 'order' : 'customer') : 'unknown'

  const onDelete = () => {
    console.log(data)
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1 font-normal">
            <span>Mais ações</span>
            <CaretDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-danger" asChild>
            <AlertDialogTrigger
              className="w-full text-danger gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <TrashSimple size={16} />
              <span>Excluir selecionados ({data.length})</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteManyDialog
        onConfirm={onDelete}
        variant={variant}
        quantity={data.length}
      />
    </AlertDialog>
  )
}
