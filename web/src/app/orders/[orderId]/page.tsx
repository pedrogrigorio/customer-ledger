'use client'

import { useParams } from 'next/navigation'
import { customers } from '@/data/customers'

import { Input } from '@/components/shadcnui/input'
import { Label } from '@/components/shadcnui/label'
import { Page } from '@/components/layout/page'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcnui/select'
import { orders } from '@/data/orders'

import OrderOptions from '@/components/dropdown-menus/order-options'

import { formatDate } from '@/utils/formatDate'
import { User } from 'lucide-react'
import {
  ClockClockwise,
  EnvelopeSimple,
  MapPin,
  Phone,
  Wallet,
} from '@phosphor-icons/react/dist/ssr'
import { formatCurrency } from '@/utils/formatCurrency'
import { OrderStatus } from '@/enums/order-status'

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
        <form className="flex flex-col lg:flex-row gap-4">
          {/* Items */}
          <div className="border-primary h-fit flex flex-col gap-4 flex-[3] border p-6 pt-4 rounded-xl text-primary">
            <h2 className="font-medium">Produtos</h2>

            <div className="mt-2 flex flex-col gap-4">
              {order.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`name.${index}`}>Nome *</Label>
                    <Input
                      disabled
                      placeholder="Insira o nome"
                      id={`name.${index}`}
                      value={item.name}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`unit.${index}`}>Unidade *</Label>

                    <Select name={`unit.${index}`} disabled value={item.unit}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">UN</SelectItem>
                        <SelectItem value="MT">MT</SelectItem>
                        <SelectItem value="KG">KG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`quantity.${index}`}>Quantidade *</Label>
                    <Input
                      disabled
                      type="number"
                      placeholder="Insira a quantidade"
                      id={`quantity.${index}`}
                      value={item.quantity}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-col gap-4 flex-[2]">
            <div className="border-primary flex h-fit flex-col gap-4 border px-6 pt-4 pb-6 rounded-xl text-primary">
              <h2 className="font-medium">Detalhes do Pedido</h2>
              <p className="text-terciary text-sm">{order.notes}</p>
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
                  <span className="text-terciary">{customer.phone}</span>
                </li>
                <li className="flex gap-2 text-sm items-center">
                  <EnvelopeSimple size={16} />
                  <span className="text-terciary">{customer.email}</span>
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
          </div>
        </form>
      </div>
    </Page.Container>
  )
}
