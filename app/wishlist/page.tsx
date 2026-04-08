"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Heart, LogIn } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { createClient } from '@/lib/supabase/client'
import type { ProductWithCategory } from '@/lib/types'
import { toast } from 'sonner'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<ProductWithCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loadWishlist = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      setIsAuthenticated(true)

      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          product_id,
          products:product_id (
            *,
            category:categories(*)
          )
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading wishlist:', error)
        setIsLoading(false)
        return
      }

      const products = data
        ?.map((item) => item.products as unknown as ProductWithCategory)
        .filter(Boolean) || []

      setWishlistItems(products)
      setIsLoading(false)
    }

    loadWishlist()
  }, [])

  const handleRemoveFromWishlist = async (productId: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (error) {
      toast.error('Error al eliminar de favoritos')
      return
    }

    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
    toast.success('Eliminado de favoritos')
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
              <span className="text-foreground font-medium">Favoritos</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
              <p className="text-muted-foreground mt-4">Cargando favoritos...</p>
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-12">
              <LogIn className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Iniciá sesión para ver tus favoritos</h2>
              <p className="text-muted-foreground mt-2">
                Creá una cuenta o iniciá sesión para guardar tus herramientas favoritas
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 mt-6 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Tu lista de favoritos está vacía</h2>
              <p className="text-muted-foreground mt-2">
                Empezá a agregar herramientas que te gusten a tus favoritos
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-6 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Ver Productos
              </Link>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'producto' : 'productos'} guardados
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {wishlistItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onWishlistToggle={handleRemoveFromWishlist}
                    isInWishlist
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
