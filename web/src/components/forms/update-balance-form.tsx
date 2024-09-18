'use client'

import InputError from '../ui/input-error'

import { balanceFormSchema } from '@/lib/validations/balance-form-schema'
import { currencyToFloat } from '@/utils/currencyToFloat'
import { BalanceFormData } from '@/types/validations'
import { formatCurrency } from '@/utils/formatCurrency'
import { currencyMask } from '@/utils/currencyMask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '../shadcnui/label'
import { Input } from '../shadcnui/input'

interface UpdateBalanceFormProps {
  balance: number
}

export default function UpdateBalanceForm({ balance }: UpdateBalanceFormProps) {
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
    <form className="py-4" onSubmit={handleSubmit(onSubmit)} id="balance-form">
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
  )
}
