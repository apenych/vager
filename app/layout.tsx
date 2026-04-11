import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import WhatsAppWidget from '@/components/WhatsAppWidget'

export const metadata: Metadata = {
  title: 'VAGER - Интернет-магазин автозапчастей',
  description: 'Автозапчасти для всех марок автомобилей в Шымкенте',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <CartProvider suppressHydrationWarning>
          {children}
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  )
}
