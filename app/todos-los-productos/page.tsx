import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductGrid } from '@/components/product-grid-client'
import { getFeaturedProducts, getBestSellers, getProducts } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts({ limit: 100 })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero de sección */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[150px]" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 lg:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-orange-100 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Productos</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Todos los Productos
                </h1>
                <p className="text-orange-100">
                  Explora toda nuestra selección de herramientas profesionales
                </p>
              </div>

              {/* Quick filter pills */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/todos-los-productos"
                  className="rounded-full px-4 py-1.5 text-sm font-medium bg-white text-orange-600"
                >
                  Todos
                </Link>
                <Link
                  href="/todos-los-productos?filter=featured"
                  className="rounded-full px-4 py-1.5 text-sm font-medium bg-white/20 text-white hover:bg-white/30"
                >
                  ★ Destacados
                </Link>
                <Link
                  href="/todos-los-productos?filter=bestseller"
                  className="rounded-full px-4 py-1.5 text-sm font-medium bg-white/20 text-white hover:bg-white/30"
                >
                  🔥 Bestsellers
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <ProductGrid products={products} categoryName="Todos los Productos" />
      </main>

      <Footer />
    </div>
  )
}
