import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CategoryCarousel } from '@/components/category-carousel'
import { getCategories, getProductsByCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const [categories, productsByCategory] = await Promise.all([
    getCategories(),
    getProductsByCategories(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero interno */}
        <section className="relative bg-gradient-to-br from-orange-600 to-orange-800 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Nuestras Categorías</h1>
            <p className="text-orange-100 text-lg max-w-2xl">
              Explora nuestra amplia gama de herramientas profesionales para cada tipo de trabajo
            </p>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[200px] bg-black/10 rounded-full blur-[80px]" />
        </section>

        {/* Categories Section */}
        <CategoryCarousel
          categories={categories}
          productsByCategory={productsByCategory}
          title="Explora por Categoría"
        />
      </main>

      <Footer />
    </div>
  )
}
