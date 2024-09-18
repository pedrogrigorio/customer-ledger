import { z } from 'zod'

export const paymentFormSchema = z.object({
  payment: z.string(),
})
