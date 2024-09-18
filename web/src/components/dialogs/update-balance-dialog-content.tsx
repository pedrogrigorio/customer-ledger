'use client'

import { currencyMask } from '@/utils/currencyMask'
import { Button } from '../shadcnui/button'
import { Label } from '../shadcnui/label'
import { Input } from '../shadcnui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/shadcnui/dialog'
import { useForm } from 'react-hook-form'
import { BalanceFormData } from '@/types/validations'
import { balanceFormSchema } from '@/lib/validations/balance-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '../ui/input-error'
import { formatCurrency } from '@/utils/formatCurrency'
import { currencyToFloat } from '@/utils/currencyToFloat'

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
    register,
    handleSubmit,
    formState: { errors },
  } = balanceForm

  const onSubmit = (data: BalanceFormData) => {
    console.log(data)
    const { balance } = data

    const formatedBalance = currencyToFloat(balance)
    console.log(formatedBalance)
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
            <Button variant="ghost">Cancelar</Button>
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
