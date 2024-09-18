'use client'

import AddPaymentForm from '../forms/add-payment-form'

import { Button } from '../shadcnui/button'
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  Dialog,
} from '@/components/shadcnui/dialog'

interface AddPaymentDialogProps {
  children?: React.ReactNode
}

export default function AddPaymentDialog({ children }: AddPaymentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar pagamento</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <AddPaymentForm />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="submit"
              form="balance-form"
              className="bg-button-warning hover:bg-button-warning-hover"
            >
              Adicionar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
