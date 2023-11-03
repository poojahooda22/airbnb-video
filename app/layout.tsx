import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './componentts/navbar/Navbar'
import ClientOnly from './componentts/ClientOnly'
import RegisterModal from './componentts/modals/RegisterModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <RegisterModal   />
          <Navbar />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
