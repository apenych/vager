import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import WhatsAppWidget from '@/components/WhatsAppWidget'

const SITE_URL = 'https://vager.kz'

export const metadata: Metadata = {
  title: {
    default: 'VAGER — Автозапчасти в Шымкенте | Купить запчасти для авто',
    template: '%s | VAGER',
  },
  description:
    'Интернет-магазин автозапчастей VAGER — более 11 000 товаров в наличии. Запчасти для всех марок авто: двигатели, подвеска, тормоза, масла, фильтры. Доставка по Шымкенту и Казахстану. 📞 +7 708 935 37 82',
  keywords: [
    'автозапчасти Шымкент',
    'купить запчасти',
    'интернет-магазин автозапчастей',
    'запчасти для авто Казахстан',
    'масло моторное',
    'фильтры автомобильные',
    'тормозные колодки',
    'подвеска',
    'VAGER',
  ],
  authors: [{ name: 'VAGER' }],
  creator: 'VAGER',
  publisher: 'VAGER',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'VAGER',
    title: 'VAGER — Автозапчасти в Шымкенте',
    description:
      'Более 11 000 автозапчастей в наличии. Доставка по Шымкенту и Казахстану. Масла, фильтры, тормозные системы, подвеска, двигатель. 📞 +7 708 935 37 82',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'VAGER — Автозапчасти в Шымкенте',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAGER — Автозапчасти в Шымкенте',
    description:
      'Более 11 000 автозапчастей в наличии. Доставка по Шымкенту и Казахстану.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '_HtJ_NSMUSTlKFWQCh8Tk8qZJisN-dzACCye7kuuWig',
    yandex: '9b1f767f15c71206',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Дополнительные meta-теги */}
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <CartProvider>
          {children}
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  )
}
