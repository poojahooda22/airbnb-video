import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './componentts/navbar/Navbar'
import ClientOnly from './componentts/ClientOnly'
import RegisterModal from './componentts/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './componentts/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './componentts/modals/RentModal'
import SearchModal from './componentts/modals/SearchModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal   />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
