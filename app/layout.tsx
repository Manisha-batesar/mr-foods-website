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

const META_TITLE = 'MR Foods - Delicious Food Delivered';
const META_DESCRIPTION = 'Experience the finest quality food with MR Foods - Your trusted partner for delicious meals';
const META_IMAGE = '/images/preview-image.png';
const META_URL = 'https://mrfoods.vercel.app'; // Update to your actual domain

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  icons: {
    icon: '/images/MR-logo.png',
    shortcut: '/images/MR-logo.png',
    apple: '/images/MR-logo.png',
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: META_URL,
    siteName: META_TITLE,
    images: [
      {
        url: META_IMAGE,
        width: 1200,
        height: 630,
        alt: META_TITLE,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [META_IMAGE],
    site: '@mrfoods', // Update to your Twitter handle
    creator: '@mrfoods', // Update to your Twitter handle
  },
  metadataBase: new URL(META_URL),
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
