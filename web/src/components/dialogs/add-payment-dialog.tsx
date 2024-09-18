'use client'

import InputError from '../ui/input-error'

import { paymentFormSchema } from '@/lib/validations/payment-form-schema'
import { PaymentFormData } from '@/types/validations'
import { currencyToFloat } from '@/utils/currencyToFloat'
import { formatCurrency } from '@/utils/formatCurrency'
import { currencyMask } from '@/utils/currencyMask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../shadcnui/button'
import { Label } from '../shadcnui/label'
import { Input } from '../shadcnui/input'
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
  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      payment: formatCurrency(0),
    },
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = paymentForm

  const onSubmit = (data: PaymentFormData) => {
    console.log(data)
    const { payment } = data

    const formatedBalance = currencyToFloat(payment)
    console.log(formatedBalance)

    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar pagamento</DialogTitle>
        </DialogHeader>
        <form
          className="py-4"
          onSubmit={handleSubmit(onSubmit)}
          id="balance-form"
        >
          <Label htmlFor="balance" className="text-right">
            Valor do pagamento
          </Label>
          <Input
            id="payment"
            type="text"
            className="col-span-3"
            {...register('payment', {
              onChange: currencyMask,
            })}
          />
          <InputError error={errors.payment?.message?.toString()} />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={() => reset()}>
              Cancelar
            </Button>
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
