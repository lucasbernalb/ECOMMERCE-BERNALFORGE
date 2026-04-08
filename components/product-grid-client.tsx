"use client"

import { useState, useEffect, useCallback } from 'react'
import { SlidersHorizontal, Grid3X3, List, ArrowUpDown } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'
import { toggleWishlist, getWishlistProductIds } from '@/lib/actions/wishlist'

interface ProductGridProps {
  products: Product[]
  categoryName: string
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name' | 'newest'

export function ProductGrid({ products, categoryName }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set())

  // Load wishlist on mount
  useEffect(() => {
    const loadWishlist = async () => {
      const ids = await getWishlistProductIds()
      setWishlistIds(ids)
    }
    loadWishlist()
  }, [])

  const handleWishlistToggle = useCallback(async (productId: string) => {
    await toggleWishlist(productId, (isNowInWishlist) => {
      setWishlistIds(prev => {
        const next = new Set(prev)
        if (isNowInWishlist) {
          next.add(productId)
        } else {
          next.delete(productId)
        }
        return next
      })
    })
  }, [])

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return Number(a.price) - Number(b.price)
      case 'price-desc':
        return Number(b.price) - Number(a.price)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return 0
    }
  })

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Destacados' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'newest', label: 'Más recientes' },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header con filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Producto' : 'Productos'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {categoryName}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-lg border border-border bg-background pl-4 pr-10 py-2 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-background p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded transition-colors',
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent'
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-4 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Filtros Rápidos</h3>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-orange-500/30 bg-orange-500/10 dark:bg-orange-500/10 dark:text-orange-500 px-4 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400">
                En Stock
              </button>
              <button className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/50">
                Destacados
              </button>
              <button className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/50">
                Bestsellers
              </button>
              <button className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/50">
                -20% OFF
              </button>
            </div>
          </div>
        )}

        {/* Grid de Productos */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No hay productos disponibles</h3>
            <p className="text-muted-foreground mb-6">
              Próximamente añadiremos productos en esta categoría
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className={cn(
            "grid gap-5",
            "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          )}>
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                variant="list"
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
