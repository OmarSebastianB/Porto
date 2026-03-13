import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio – education, experience, projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col relative">
        <AuthProvider>
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
