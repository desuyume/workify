import type { Metadata } from 'next'
import { montserrat, santello } from './ui/fonts'
import './globals.css'
import '@workify/ui/styles.css'

import Providers from './providers'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Workify',
  description: 'Get started with Workify'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${montserrat.variable} ${santello.variable} font-montserrat`}>
        <Providers>
          <Suspense>{children}</Suspense>
          <Toaster position='top-center' />
          <div id='modal-root' />
        </Providers>
      </body>
    </html>
  )
}
