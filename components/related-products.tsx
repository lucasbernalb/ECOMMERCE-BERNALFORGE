"use client"

import { useState, useEffect, useCallback } from 'react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'
import { toggleWishlist, getWishlistProductIds } from '@/lib/actions/wishlist'

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
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
  )
}
