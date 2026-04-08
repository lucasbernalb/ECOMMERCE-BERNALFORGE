import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-orange-600 to-orange-800 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Nuestras Categorías</h1>
            <p className="text-orange-100 text-lg max-w-2xl">
              {categories.length} categorías disponibles
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="col-span-full text-center py-12 text-muted-foreground">
                  No hay categorías disponibles
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
