import Sidebar from '@/components/layout/sidebar'
import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex h-screen min-w-[650px]`}>
        <Sidebar />
        <main className="flex-1 h-full">{children}</main>
      </body>
    </html>
  )
}
