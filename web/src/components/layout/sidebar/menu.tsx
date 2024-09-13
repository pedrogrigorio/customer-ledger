'use client'

import { usePathname } from 'next/navigation'
import { menu } from '@/data/sidebar-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Menu() {
  const pathname = usePathname()

  return (
    <div className="mt-20">
      <span className="text-xs px-3">MENU</span>
      <ul className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <li
              className={cn(
                'flex gap-2 items-center h-10 px-3 hover:bg-table-header cursor-pointer rounded-lg',
                pathname === item.path && 'text-contrast bg-table-header',
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
