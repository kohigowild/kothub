import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import RecoilProvider from '@/components/common/RecoilProvider'
import QueryProvider from '@/components/common/QueryProvider'
import Header from '@/components/common/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang='ko'>
      <RecoilProvider>
        <QueryProvider>
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </QueryProvider>
      </RecoilProvider>
    </html>
  )
}
