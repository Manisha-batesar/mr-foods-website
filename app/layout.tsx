import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CartProvider } from '@/components/cart-context'
import { UserProvider } from '@/components/user-context'
import { OrdersProvider } from '@/components/orders-context'
import { CartSidebar } from '@/components/cart-sidebar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MR Foods - Delicious Food Delivered',
  description: 'Experience the finest quality food with MR Foods - Your trusted partner for delicious meals',
  icons: {
    icon: '/images/MR-logo.png',
    shortcut: '/images/MR-logo.png',
    apple: '/images/MR-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <UserProvider>
            <OrdersProvider>
              <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
                <CartSidebar />
                <Header />
                <main className="flex-1 pt-20">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </OrdersProvider>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  )
}
