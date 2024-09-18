'use client'

import InputError from '../ui/input-error'

import { balanceFormSchema } from '@/lib/validations/balance-form-schema'
import { currencyToFloat } from '@/utils/currencyToFloat'
import { BalanceFormData } from '@/types/validations'
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

interface UpdateBalanceDialogProps {
  children?: React.ReactNode
  balance: number
}

export default function UpdateBalanceDialogContent({
  children,
  balance,
}: UpdateBalanceDialogProps) {
  const balanceForm = useForm<BalanceFormData>({
    resolver: zodResolver(balanceFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      balance: formatCurrency(balance),
    },
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = balanceForm

  const onSubmit = (data: BalanceFormData) => {
    console.log(data)
    const { balance } = data

    const formatedBalance = currencyToFloat(balance)
    console.log(formatedBalance)

    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar saldo</DialogTitle>
        </DialogHeader>
        <form
          className="py-4"
          onSubmit={handleSubmit(onSubmit)}
          id="balance-form"
        >
          <Label htmlFor="balance" className="text-right">
            Saldo
          </Label>
          <Input
            id="balance"
            type="text"
            className="col-span-3"
            {...register('balance', {
              onChange: currencyMask,
            })}
          />
          <InputError error={errors.balance?.message?.toString()} />
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
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
