import { cn } from '@/lib/utils'

interface ContainerProps {
  children?: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('h-full overflow-y-auto px-12 pb-12', className)}>
      {children}
    </div>
  )
}
