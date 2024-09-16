import { OrderStatus } from '@/enums/order-status'
import { MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Order } from '@/types/order'

interface CardProps {
  order: Order
}

export default function Card({ order }: CardProps) {
  return (
    <div className="border rounded-xl flex flex-col border-primary p-6 text-secondary">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-medium">Pedido {order.id}</h2>
        <MoreHorizontal size={16} />
      </div>

      {/* Body */}
      <div className="mt-5 flex-1">
        <span className="text-xs text-terciary">10 itens</span>
        <ul className="text-sm">
          {order.items.length > 3 ? (
            <>
              {order.items.slice(0, 3).map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} {item.unit}
                  </span>
                </li>
              ))}
              <li>
                <span>...</span>
              </li>
            </>
          ) : (
            order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>Produto 1</span>
                <span>1 un</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-6" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-terciary">Status</span>
          {order.status === OrderStatus.PAID ? (
            <span className="text-sm font-medium text-status-paid">Pago</span>
          ) : (
            <span className="text-sm font-medium text-status-pending-alternative">
              Pendente
            </span>
          )}
          <span className="text-sm"></span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-terciary">Criado em</span>
          <span className="text-sm">{formatDate(order.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
