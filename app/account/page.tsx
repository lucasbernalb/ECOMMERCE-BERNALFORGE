"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, User, Package, Heart, LogOut, Settings, Shield } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { toast } from 'sonner'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        setIsAdmin(profile?.is_admin ?? false)
      } else {
        router.push('/auth/login')
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada exitosamente')
    router.push('/')
  }

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

  if (!user) {
    return null
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
              <span className="text-foreground font-medium">Mi Cuenta</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Miembro desde {new Date(user.created_at).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </div>
              <Link
                href="/account/settings"
                className="text-sm text-primary hover:underline"
              >
                Editar Perfil
              </Link>
            </div>

            {/* Orders */}
            <Link
              href="/account/orders"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Mis Pedidos</h3>
                  <p className="text-sm text-muted-foreground">
                    Ver historial de pedidos
                  </p>
                </div>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Favoritos</h3>
                  <p className="text-sm text-muted-foreground">
                    Productos guardados
                  </p>
                </div>
              </div>
            </Link>

            {/* Settings */}
            <Link
              href="/account/settings"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Configuración</h3>
                  <p className="text-sm text-muted-foreground">
                    Gestionar configuración de la cuenta
                  </p>
                </div>
              </div>
            </Link>

            {/* Admin Panel */}
            {isAdmin && (
              <Link
                href="/admin"
                className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Panel de Admin</h3>
                    <p className="text-sm text-muted-foreground">
                      Gestionar productos y pedidos
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border p-6 hover:border-destructive/50 hover:bg-destructive/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <LogOut className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">Cerrar Sesión</h3>
                  <p className="text-sm text-muted-foreground">
                    Desconectar de tu cuenta
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
