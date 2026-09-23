import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
})
const tajawal = Tajawal({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
})

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
        <body className={`${ibmPlex.className} ${tajawal.variable}`}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
