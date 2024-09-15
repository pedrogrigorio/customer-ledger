import { ReactNode } from 'react'
import { useTabsContext } from './tabs-context'

interface ContentProps {
  children?: ReactNode
  value: string
}

export default function Content({ value, children }: ContentProps) {
  const { selectedTab } = useTabsContext()

  return selectedTab === value ? <div className="mt-4">{children}</div> : null
}
