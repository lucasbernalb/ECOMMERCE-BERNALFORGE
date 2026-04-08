import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductGrid } from '@/components/product-grid-client'
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories(),
  ])

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Categoría no encontrada</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero de Categoría */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800 py-16">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[200px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-7xl px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-orange-100 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/todas-las-categorias" className="hover:text-white transition-colors">
                Categorías
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {category.name}
                </h1>
                
                {category.description && (
                  <p className="text-lg text-orange-100 max-w-2xl mb-6">
                    {category.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <span className="text-white">{products.length} productos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos con Filtros */}
        <ProductGrid products={products} categoryName={category.name} />
      </main>

      <Footer />
    </div>
  )
}
