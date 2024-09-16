'use client'

import { useParams } from 'next/navigation'
import { Page } from '@/components/layout/page'

export default function Customer() {
  const { customerId } = useParams()

  return (
    <Page.Container>
      <Page.Header></Page.Header>
      <div>Customer {customerId}</div>
    </Page.Container>
  )
}
