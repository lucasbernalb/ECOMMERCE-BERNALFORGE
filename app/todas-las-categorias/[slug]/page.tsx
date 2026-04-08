import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Grid3X3, Zap, Shield, Truck, ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductGrid } from '@/components/product-grid-client'
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} | BernalForge Tools`,
    description: category.description || `Explora nuestra selección de ${category.name.toLowerCase()}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories(),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero de Categoría */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800">
          {/* Background con imagen */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1920&q=80"
              alt="Tools workshop"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          {/* Decorative orb */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[200px] pointer-events-none" />
          
          {/* Contenido del Hero */}
          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-orange-100 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/todas-las-categorias" className="hover:text-white transition-colors">
                Categorías
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
              {/* Info de Categoría */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 mb-4">
                  <Grid3X3 className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Categoría</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {category.name}
                </h1>
                
                {category.description && (
                  <p className="text-lg text-orange-100 max-w-2xl mb-6">
                    {category.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white">{products.length} productos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white">Garantía oficial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white">Envío rápido</span>
                  </div>
                </div>
              </div>

              {/* Sidebar de Categorías Relacionadas */}
              <div className="hidden lg:block">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Explorar Otras
                  </h3>
                  <ul className="space-y-1.5">
                    {allCategories
                      .filter((cat) => cat.id !== category.id)
                      .slice(0, 5)
                      .map((cat) => (
                        <li key={cat.id}>
                          <Link
                            href={`/todas-las-categorias/${cat.slug}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white hover:bg-white/10 transition-all group"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-orange-200 transition-colors" />
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <Link
                      href="/todas-las-categorias"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-white hover:text-orange-100 transition-colors"
                    >
                      Ver todas
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos con Filtros */}
        <ProductGrid products={products} categoryName={category.name} />

        {/* Categorías Relacionadas - Mobile */}
        <section className="lg:hidden py-10 bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-4">
            <h3 className="text-base font-semibold mb-4">Explorar Otras Categorías</h3>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {allCategories
                .filter((cat) => cat.id !== category.id)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/todas-las-categorias/${cat.slug}`}
                    className="flex-shrink-0 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              <Link
                href="/todas-las-categorias"
                className="flex-shrink-0 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Ver todas →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
