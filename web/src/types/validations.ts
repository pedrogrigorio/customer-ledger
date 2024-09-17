import { customerFormSchema } from '@/lib/validations/customer-form-schema'
import { orderFormSchema } from '@/lib/validations/order-form-schema'
import { z } from 'zod'

export type OrderFormData = z.infer<typeof orderFormSchema>

export type CustomerFormData = z.infer<typeof customerFormSchema>
