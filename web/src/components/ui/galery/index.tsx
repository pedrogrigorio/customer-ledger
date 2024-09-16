import { Order } from '@/types/order'
import Card from './card'

interface GaleryProps {
  data: Order[]
}

export default function Galery({ data }: GaleryProps) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-4">
      {data.map((order) => (
        <Card key={order.id} order={order} />
      ))}
    </div>
  )
}
