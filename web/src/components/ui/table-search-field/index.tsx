import { InputHTMLAttributes } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/components/shadcnui/input'

interface TableSearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function TableSearchField(props: TableSearchFieldProps) {
  return (
    <div className="flex items-center py-4">
      <div className="flex w-full items-center max-w-sm px-3 rounded-md border border-zinc-200">
        <MagnifyingGlass size={20} className="text-zinc-500" />
        <Input
          {...props}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
      </div>
    </div>
  )
}
