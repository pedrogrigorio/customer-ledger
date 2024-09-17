'use client'

import InputError from '@/components/ui/input-error'

import { customerFormSchema } from '@/lib/validations/customer-form-schema'
import { CustomerFormData } from '@/types/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { phoneMask } from '@/utils/phoneMask'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shadcnui/button'
import { Input } from '@/components/shadcnui/input'
import { Label } from '@/components/shadcnui/label'
import { Page } from '@/components/layout/page'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/shadcnui/alert-dialog'

export default function CreateCustomer() {
  const router = useRouter()
  const customerForm = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      district: '',
      street: '',
      number: '',
      complement: '',
      landmark: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = customerForm

  const onSubmit = (data: CustomerFormData) => {
    console.log(data)
  }

  return (
    <Page.Container>
      <Page.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Novo cliente</h1>
          <div className="flex gap-2">
            {isDirty ? (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="ghost">
                    <span>Cancelar</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja cancelar?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Existem dados não salvos no formulário. Se você cancelar
                      agora, todas as informações inseridas serão perdidas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-button-warning hover:bg-button-warning-hover"
                      onClick={router.back}
                    >
                      Sim, cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button variant="ghost" onClick={router.back}>
                <span>Cancelar</span>
              </Button>
            )}

            <Button
              className="bg-button-primary hover:bg-button-primary-hover"
              type="submit"
              form="customer-form"
            >
              <span>Cadastrar cliente</span>
            </Button>
          </div>
        </div>
      </Page.Header>

      <div className="mt-4">
        <form
          className="flex flex-col lg:flex-row gap-4"
          id="customer-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Customer Info Fields */}
          <div className="border-primary flex flex-col gap-4 flex-1 border p-6 pt-4 rounded-xl text-primary">
            <h2 className="font-medium">Dados do cliente</h2>
            <div className="mt-2 flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  placeholder="Insira o nome"
                  id="name"
                  {...register('name')}
                  className="mt-1"
                />
                <InputError error={errors.name?.message?.toString()} />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  placeholder="(xx) xxxxx-xxxx"
                  id="phone"
                  {...register('phone', {
                    onChange: phoneMask,
                  })}
                  className="mt-1"
                />
                <InputError error={errors.phone?.message?.toString()} />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  placeholder="Insira um e-mail..."
                  id="email"
                  {...register('email')}
                  className="mt-1"
                />
                <InputError error={errors.email?.message?.toString()} />
              </div>
            </div>
          </div>

          {/* Address Fields */}
          <div className="border-primary flex flex-col gap-4 flex-1 border px-6 py-4 rounded-xl text-primary">
            <h2 className="font-medium">Endereço</h2>
            <div className="mt-2 grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="district">Bairro</Label>
                <Input
                  placeholder="Insira o nome do bairro..."
                  id="district"
                  {...register('district')}
                  className="mt-1"
                />
                <InputError error={errors.district?.message?.toString()} />
              </div>
              <div className="col-span-4">
                <Label htmlFor="street">Rua</Label>
                <Input
                  placeholder="Insira o nome da rua..."
                  id="street"
                  {...register('street', {
                    onChange: phoneMask,
                  })}
                  className="mt-1"
                />
                <InputError error={errors.street?.message?.toString()} />
              </div>
              <div className="col-span-4 xl:col-span-1">
                <Label htmlFor="number">Número</Label>
                <Input
                  placeholder="Ex: 103"
                  type="text"
                  id="number"
                  {...register('number')}
                  className="mt-1"
                />
                <InputError error={errors.number?.message?.toString()} />
              </div>
              <div className="col-span-4 xl:col-span-3">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  placeholder="Casa, apartamento, bloco"
                  id="complement"
                  {...register('complement')}
                  className="mt-1"
                />
                <InputError error={errors.complement?.message?.toString()} />
              </div>
              <div className="col-span-4">
                <Label htmlFor="landmark">Ponto de referência</Label>
                <Input
                  placeholder="Insira um ponto de referência..."
                  id="landmark"
                  {...register('landmark')}
                  className="mt-1"
                />
                <InputError error={errors.landmark?.message?.toString()} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Page.Container>
  )
}
