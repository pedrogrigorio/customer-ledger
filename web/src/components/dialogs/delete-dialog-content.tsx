import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/shadcnui/alert-dialog'

interface DeleteDialogContentProps {
  onConfirm: () => void
  variant: 'customer' | 'order'
}

export default function DeleteDialogContent({
  onConfirm,
  variant,
}: DeleteDialogContentProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {variant === 'customer'
            ? 'Tem certeza que deseja excluir esse cliente?'
            : 'Tem certeza que deseja excluir esse pedido?'}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {variant === 'customer'
            ? 'Esta ação não pode ser desfeita. Isso vai excluir permanentemente o cliente e todos seus pedidos.'
            : 'Esta ação não pode ser desfeita. Isso vai excluir permanentemente o pedido.'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          className="bg-button-danger hover:bg-button-danger-hover"
          onClick={(event) => {
            event.stopPropagation()
            onConfirm()
          }}
        >
          Sim, excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
