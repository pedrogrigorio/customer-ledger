'use client'

import { useParams } from 'next/navigation'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/shadcnui/button'
import Link from 'next/link'
import { Plus } from '@phosphor-icons/react/dist/ssr'

export default function Customer() {
  const { customerId } = useParams()

  return (
    <Page.Container>
      <Page.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Customer {customerId}</h1>
          <Button
            className="bg-button-primary gap-1 hover:bg-button-primary-hover"
            asChild
          >
            <Link href="orders/create">
              <Plus size={20} weight="bold" className="text-white" />
              <span>Novo pedido</span>
            </Link>
          </Button>
        </div>
      </Page.Header>
    </Page.Container>
  )
}
