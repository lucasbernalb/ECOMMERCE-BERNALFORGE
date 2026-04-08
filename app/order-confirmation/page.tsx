import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface OrderConfirmationPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { id: orderId } = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">¡Pedido Confirmado!</h1>
          <p className="text-muted-foreground mt-4">
            Gracias por tu compra. Tu pedido fue recibido y está siendo procesado.
          </p>

          {orderId && (
            <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Número de Pedido</p>
              <p className="font-mono font-semibold mt-1">{orderId.slice(0, 8).toUpperCase()}</p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-border p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email de Confirmación Enviado</p>
                <p className="text-sm text-muted-foreground">
                  Revisá tu casilla de entrada para ver los detalles del pedido
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-border p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Actualizaciones de Envío</p>
                <p className="text-sm text-muted-foreground">
                  Te notificaremos cuando tu pedido sea enviado
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ver Estado del Pedido
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
