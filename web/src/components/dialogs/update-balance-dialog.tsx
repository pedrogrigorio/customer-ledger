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
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from '@/components/shadcnui/dialog'
import { useEffect } from 'react'

interface UpdateBalanceDialogProps {
  balance: number
  isOpen: boolean
}

export default function UpdateBalanceDialog({
  balance,
  isOpen,
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
  }

  useEffect(() => {
    if (isOpen === true) {
      reset({ balance: formatCurrency(balance) })
    }
  }, [isOpen, reset, balance])

  return (
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
  )
}
