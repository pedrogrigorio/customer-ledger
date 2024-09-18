import InputError from '../ui/input-error'

import { paymentFormSchema } from '@/lib/validations/payment-form-schema'
import { PaymentFormData } from '@/types/validations'
import { currencyToFloat } from '@/utils/currencyToFloat'
import { formatCurrency } from '@/utils/formatCurrency'
import { currencyMask } from '@/utils/currencyMask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '../shadcnui/label'
import { Input } from '../shadcnui/input'

export default function AddPaymentForm() {
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
  } = paymentForm

  const onSubmit = (data: PaymentFormData) => {
    console.log(data)
    const { payment } = data

    const formatedBalance = currencyToFloat(payment)
    console.log(formatedBalance)
  }

  return (
    <form className="py-4" onSubmit={handleSubmit(onSubmit)} id="balance-form">
      <Label htmlFor="balance" className="text-right">
        Valor do pagamento
      </Label>
      <Input
        id="payment"
        type="text"
        className="col-span-3 mt-1"
        {...register('payment', {
          onChange: currencyMask,
        })}
      />
      <InputError error={errors.payment?.message?.toString()} />
    </form>
  )
}
