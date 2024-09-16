'use client'

import { useParams } from 'next/navigation'
import { Page } from '@/components/layout/page'

export default function Order() {
  const { orderId } = useParams()

  return (
    <Page.Container>
      <Page.Header></Page.Header>
      <div>Order {orderId}</div>
    </Page.Container>
  )
}
