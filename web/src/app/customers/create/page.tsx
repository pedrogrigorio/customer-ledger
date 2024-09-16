'use client'

import { ArrowLeft, Link, Plus } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/shadcnui/button'

export default function CreateCustomer() {
  const router = useRouter()

  return (
    <Page.Container>
      <Page.Header>
        <button onClick={router.back}>
          <ArrowLeft size={20} />
        </button>
      </Page.Header>

      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl">Novo cliente</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">
            <span>Cancelar</span>
          </Button>
          <Button className="bg-button-primary hover:bg-button-primary-hover">
            <span>Cadastrar cliente</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="border-primary flex-1 border px-6 py-4 rounded-xl text-primary">
          <h2>Dados do cliente</h2>
        </div>

        <div className="border-primary flex-1 border px-6 py-4 rounded-xl text-primary">
          <h2>Endereço</h2>
        </div>
      </div>
    </Page.Container>
  )
}
