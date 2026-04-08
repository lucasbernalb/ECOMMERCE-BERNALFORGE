"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ShoppingBag, CreditCard, Truck, Lock, AlertCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductImage } from '@/components/product-image'
import { useCart } from '@/lib/cart-context'
import { createOrder } from '@/lib/actions/orders'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { User } from '@supabase/supabase-js'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, totalPrice, clearCart } = useCart()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    postalCode: '',
    paymentMethod: 'card' as 'card' | 'paypal',
  })

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Necesitás iniciar sesión para confirmar el pedido')
      return
    }

    if (state.items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        postalCode: formData.postalCode,
        totalAmount: totalPrice,
        paymentMethod: formData.paymentMethod,
        items: state.items,
      })

      if (!result.success) {
        toast.error(result.error || 'Error al crear el pedido')
        return
      }

      clearCart()
      toast.success('¡Pedido realizado con éxito!')
      router.push(`/order-confirmation?id=${result.orderId}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Error al realizar el pedido. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const shipping = totalPrice >= 99 ? 0 : 9.99
  const tax = totalPrice * 0.0875
  const grandTotal = totalPrice + shipping + tax

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </main>
        <Footer />
      </div>
    )
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mt-2">
              Agregá herramientas a tu carrito antes de finalizar la compra
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Finalizar Compra</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="customerName" className="block text-sm font-medium mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Dirección de Envío</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="shippingAddress" className="block text-sm font-medium mb-2">
                      Calle y Número
                    </label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="shippingCity" className="block text-sm font-medium mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      disabled={!user}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Método de Pago</h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-md border border-border p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      disabled={!user}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium">Tarjeta de Crédito/Débito</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-md border border-border p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      disabled={!user}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium">MercadoPago</span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Tu información de pago es segura y está encriptada
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <ProductImage
                          src={item.product.images?.[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Login Required Warning */}
                {!user && (
                  <div className="mt-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-destructive">
                          Necesitás iniciar sesión
                        </p>
                        <p className="text-xs text-destructive/80 mt-1">
                          Debés estar logueado para confirmar el pedido
                        </p>
                        <Link
                          href="/auth/login"
                          className="inline-block mt-2 text-xs font-medium text-primary hover:underline"
                        >
                          Iniciar Sesión →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !user}
                  className="w-full mt-4 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Procesando...' : `Confirmar Pedido - $${grandTotal.toFixed(2)}`}
                </button>

                {!user ? (
                  <Link
                    href="/auth/sign-up"
                    className="block w-full mt-2 text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    ¿No tenés cuenta? Crear una
                  </Link>
                ) : (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Al confirmar tu pedido, aceptás nuestros Términos de Servicio y Política de Privacidad.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
