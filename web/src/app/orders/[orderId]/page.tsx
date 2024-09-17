'use client'

import OrderOptions from '@/components/dropdown-menus/order-options'

import { formatCurrency } from '@/utils/formatCurrency'
import { OrderStatus } from '@/enums/order-status'
import { formatDate } from '@/utils/formatDate'
import { customers } from '@/data/customers'
import { useParams } from 'next/navigation'
import { orders } from '@/data/orders'
import { Input } from '@/components/shadcnui/input'
import { Label } from '@/components/shadcnui/label'
import { Page } from '@/components/layout/page'
import { User } from 'lucide-react'
import {
  ClockClockwise,
  EnvelopeSimple,
  MapPin,
  Phone,
  Trash,
  Wallet,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/shadcnui/button'

export default function Order() {
  const { orderId } = useParams()

  const order = orders.find((order) => order.id === Number(orderId))

  if (!order) return null

  const customer = customers.find(
    (customer) => customer.id === order.customerId,
  )

  if (!customer) return null

  const address = [
    customer.district,
    customer.street,
    customer.number,
    customer.complement,
  ].filter(Boolean)

  return (
    <Page.Container>
      <Page.Header>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">Pedido {order.id}</h1>
            <span className="text-terciary">{formatDate(order.createdAt)}</span>
          </div>

          <OrderOptions order={order} variant="primary" />
        </div>
      </Page.Header>

      <div className="mt-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Items */}
          <div className="border-primary h-fit flex flex-col gap-4 flex-[3] border p-6 pt-4 rounded-xl text-primary">
            <h2 className="font-medium">Produtos</h2>

            <div className="mt-2 flex flex-col gap-2">
              {order.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`name.${index}`}>Nome</Label>
                    <Input
                      disabled
                      placeholder="Insira o nome"
                      id={`name.${index}`}
                      value={item.name}
                      className="mt-1 disabled:opacity-100 disabled:cursor-text"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`quantity.${index}`}>Quantidade</Label>
                    <Input
                      disabled
                      type="number"
                      placeholder="Insira a quantidade"
                      id={`quantity.${index}`}
                      value={item.quantity}
                      className="mt-1 disabled:opacity-100 disabled:cursor-text"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`unit.${index}`}>Unidade</Label>
                    <div className="mt-1 flex h-10 w-16 items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm">
                      {item.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-col gap-4 flex-[2]">
            <div className="border-primary flex h-fit flex-col gap-4 border px-6 pt-4 pb-6 rounded-xl text-primary">
              <h2 className="font-medium">Detalhes do Pedido</h2>
              <p className="text-terciary text-sm">
                {!order.notes || order.notes === ''
                  ? 'Nenhuma nota especificada.'
                  : order.notes}
              </p>
            </div>

            <div className="border-primary flex h-fit flex-col gap-4 border px-6 pt-4 pb-6 rounded-xl text-primary">
              <h2 className="font-medium">Cliente</h2>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 text-sm items-center">
                  <User size={16} />
                  <span className="text-terciary">{customer.name}</span>
                </li>
                <li>
                  <div className="flex gap-2 text-sm items-center">
                    <MapPin size={16} className="min-w-4 min-h-4" />
                    <span className="text-terciary">
                      {address.length === 0 && !customer.landmark
                        ? 'Endereço não informado'
                        : address.length > 0
                          ? address.join(', ')
                          : customer.landmark}
                    </span>
                  </div>
                  {customer.landmark && address.length > 0 && (
                    <div className="flex gap-2 text-sm items-center">
                      <div className="min-w-4 min-h-4" />
                      <span className="text-terciary">{customer.landmark}</span>
                    </div>
                  )}
                </li>
                <li className="flex gap-2 text-sm items-center">
                  <Phone size={16} />
                  <span className="text-terciary">
                    {!customer.phone || customer.phone === ''
                      ? 'Telefone não informado.'
                      : customer.phone}
                  </span>
                </li>
                <li className="flex gap-2 text-sm items-center">
                  <EnvelopeSimple size={16} />
                  <span className="text-terciary">
                    {!customer.email || customer.email === ''
                      ? 'E-mail não informado.'
                      : customer.email}
                  </span>
                </li>
                <li className="flex gap-2 text-sm items-center">
                  <Wallet size={16} />
                  <span className="text-terciary">
                    {formatCurrency(customer.balance)}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-primary flex h-fit flex-col gap-4 border px-6 pt-4 pb-6 rounded-xl text-primary">
              <h2 className="font-medium">Status</h2>
              <div className="flex gap-2 text-sm items-center">
                <ClockClockwise size={16} />
                <span>
                  {order.status === OrderStatus.PENDING ? 'Pendente' : 'Pago'}
                </span>
              </div>
            </div>

            <div className="border-primary flex h-fit flex-col gap-4 border px-6 pt-4 pb-6 rounded-xl text-primary">
              <h2 className="font-medium">Controle de pagamento</h2>
              {!order.payments || order.payments.length === 0 ? (
                <p className="text-terciary text-sm">
                  Nenhum registro de pagamento
                </p>
              ) : (
                <>
                  <div>
                    {order.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex gap-2 text-sm items-center text-terciary"
                      >
                        <span className="flex-1">
                          {payment.fromBalance
                            ? 'Saldo descontado'
                            : `Pagamento ${payment.id}`}
                        </span>
                        <span>{formatCurrency(payment.value)}</span>
                        <Button variant="ghost" className="h-10 w-10 p-0">
                          <Trash size={20} />
                        </Button>
                      </div>
                    ))}
                    <button className="text-button-primary hover:text-button-primary-hover text-sm text-right w-full px-[10px]">
                      Adicionar pagamento
                    </button>
                  </div>
                  {/* Divider */}
                  <div className="h-px bg-border my-4" />

                  <div className="items-center justify-center flex">
                    <span className="text-currency font-medium text-2xl">
                      {formatCurrency(
                        order.payments?.reduce(
                          (total, payment) => total + payment.value,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page.Container>
  )
}
