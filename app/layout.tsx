import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'BernalForge Tools | Professional Hardware & Equipment',
  description: 'Professional-grade power tools, hand tools, construction equipment, and safety gear. Built for those who build.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <Toaster richColors position="bottom-right" />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
