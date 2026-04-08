"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react'
import type { Category, Product } from '@/lib/types'
import { CompactCategoryCard } from './ui/compact-category-card'
import { ProductCard } from './product-card'
import { FilterTabs } from './ui/filter-tabs'
import { toggleWishlist, getWishlistProductIds } from '@/lib/actions/wishlist'

interface CategoryCarouselProps {
  categories: Category[]
  productsByCategory: Record<string, Product[]>
  title?: string
}

export function CategoryCarousel({ categories, productsByCategory, title = "Nuestras Categorías" }: CategoryCarouselProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

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

  // Build filter tabs
  const tabs = [
    { id: 'all', label: 'Todos', count: Object.values(productsByCategory).flat().length },
    ...categories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      count: productsByCategory[cat.id]?.length || 0,
    })),
  ]

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      // Show products from all categories, limited to 20
      const allProducts = Object.values(productsByCategory).flat()
      setFilteredProducts(allProducts.slice(0, 20))
    } else {
      setFilteredProducts(productsByCategory[activeCategory] || [])
    }
  }, [activeCategory, productsByCategory])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setScrollPosition(scrollRef.current.scrollLeft)
  }

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return
    setScrollPosition(scrollRef.current.scrollLeft)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  return (
    <section className="py-12 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          </div>
        </div>

        {/* Category Scroll */}
        <div className="relative mb-8 group/categories">
          <button
            onClick={() => scroll('left')}
            disabled={scrollPosition === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow flex items-center justify-center transition-all hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed -translate-x-1 opacity-0 group-hover/categories:opacity-100"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow flex items-center justify-center transition-all hover:bg-background opacity-0 group-hover/categories:opacity-100 translate-x-1"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <CompactCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs
            tabs={tabs}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.slice(0, 12).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onWishlistToggle={handleWishlistToggle}
              isInWishlist={wishlistIds.has(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No hay productos en esta categoría
          </div>
        )}
      </div>
    </section>
  )
}
