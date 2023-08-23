import './globals.css'
import { Inter } from 'next/font/google'
import AppProviders from '@/context/Context'
import Navbar from '@/shared/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Githubpedia',
  description: 'AlterEstate test - Antony Ventura ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
