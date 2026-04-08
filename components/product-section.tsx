"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'
import { toggleWishlist, getWishlistProductIds } from '@/lib/actions/wishlist'

interface ProductSectionProps {
  title: string
  description: string
  products: Product[]
  viewAllHref?: string
}

export function ProductSection({ title, description, products, viewAllHref }: ProductSectionProps) {
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

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={handleWishlistToggle}
            isInWishlist={wishlistIds.has(product.id)}
          />
        ))}
      </div>
    </>
  )
}
