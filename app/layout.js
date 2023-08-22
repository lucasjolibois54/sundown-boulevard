import './globals.css'
import { Inter } from 'next/font/google'

import Navbar from './components/main/Navbar'
import Footer from './components/main/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Le Faim  | Restaurant',
  description: 'Your favorite restaurant in town',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/></body>
    </html>
  )
}
