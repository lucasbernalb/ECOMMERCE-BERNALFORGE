import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getFeaturedProducts, getBestSellers, getProducts, getCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts({ limit: 100 })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800 py-12 lg:py-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[150px]" />
          <div className="relative mx-auto max-w-7xl px-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Todos los Productos
            </h1>
            <p className="text-orange-100">
              {products.length} productos disponibles
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-orange-500">${Number(product.price).toFixed(2)}</p>
                </div>
              ))}
              {products.length === 0 && (
                <p className="col-span-full text-center py-12 text-muted-foreground">
                  No hay productos disponibles
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
