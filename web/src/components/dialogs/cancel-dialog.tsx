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
import { useRouter } from 'next/navigation'
import React from 'react'

interface CancelDialogProps {
  children?: React.ReactNode
}

export default function CancelDialog({ children }: CancelDialogProps) {
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja cancelar?</AlertDialogTitle>
          <AlertDialogDescription>
            Existem dados não salvos no formulário. Se você cancelar agora,
            todas as informações inseridas serão perdidas.
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
  )
}
