import './globals.css'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'منصة تعلّم',
  description: 'منصة تعليمية تفاعلية لطلاب المرحلة الثانوية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <body className={cairo.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
