import DeleteManyDialogContent from '../dialogs/delete-many-dialog-content'

import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/shadcnui/dropdown-menu'
import { CaretDown } from '@phosphor-icons/react'
import { Button } from '../shadcnui/button'
import { AlertDialog, AlertDialogTrigger } from '../shadcnui/alert-dialog'
import { TrashSimple } from '@phosphor-icons/react/dist/ssr'
import { Customer } from '@/types/customer'
import { Order } from '@/types/order'

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

      <DeleteManyDialogContent
        onConfirm={onDelete}
        variant={variant}
        quantity={data.length}
      />
    </AlertDialog>
  )
}
