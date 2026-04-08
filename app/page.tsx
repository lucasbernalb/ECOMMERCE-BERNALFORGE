import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { CategoryCard } from '@/components/category-card'
import { ProductSection } from '@/components/product-section'
import { getCategories, getFeaturedProducts, getBestSellers } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [categories, featuredProducts, bestSellers] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getBestSellers(8),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Explora por Categoría</h2>
              <p className="text-muted-foreground mt-1">
                Encuentra las herramientas perfectas para cada trabajo
              </p>
            </div>
            <Link
              href="/todas-las-categorias"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <ProductSection
              title="Productos Destacados"
              description="Herramientas profesionales seleccionadas"
              products={featuredProducts}
              viewAllHref="/products?filter=featured"
            />
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <ProductSection
            title="Los Más Vendidos"
            description="Las preferidas de nuestros clientes"
            products={bestSellers}
            viewAllHref="/products?filter=bestseller"
          />
        </section>

        {/* CTA Section - Solo para usuarios no logueados */}
        {!user && (
          <section className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 py-16 text-center">
              <h2 className="text-3xl font-bold">¿Listo para comenzar?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
                Únete a miles de profesionales que confían en BernalForge para sus herramientas.
                Regístrate hoy y obtén 10% de descuento en tu primer pedido.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
                >
                  Crear Cuenta
                </Link>
                <Link
                  href="/todos-los-productos"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
