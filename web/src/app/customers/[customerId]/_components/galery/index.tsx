'use client'

import { RefObject, useEffect, useRef } from 'react'
import CustomPagination from '../../../../../components/ui/pagination'
import Card from './card'
import { Order } from '@/types/order'
import { useRouter, useSearchParams } from 'next/navigation'

interface GaleryProps {
  data: Order[]
  containerRef: RefObject<HTMLDivElement>
}

export default function Galery({ data, containerRef }: GaleryProps) {
  const testRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  // totalItems must come from backend
  const totalItems = data.length

  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = 12

  const start = (Number(page) - 1) * Number(itemsPerPage)
  const end = start + Number(itemsPerPage)

  const entries = data.slice(start, end)

  const totalPages = Math.ceil(totalItems / Number(itemsPerPage))

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [page, containerRef])

  return (
    <div ref={testRef}>
      <div
        className="mt-4 grid grid-rows-2 gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        }}
      >
        {entries.map((order) => (
          <Card key={order.id} order={order} />
        ))}
      </div>

      <CustomPagination
        firstPage={() => router.push('?page=1')}
        lastPage={() => router.push('?page=1')}
        nextPage={() => router.push(`?page=${Number(page) + 1}`)}
        previousPage={() => router.push(`?page=${Number(page) - 1}`)}
        setPageIndex={(p) => router.push(`?page=${p + 1}`)}
        pageIndex={Number(page) - 1}
        totalPages={totalPages}
        canNextPage={Number(page) < totalPages}
        canPreviousPage={Number(page) > 1}
        className="mt-4"
      />
    </div>
  )
}
