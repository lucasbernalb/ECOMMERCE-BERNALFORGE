"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Package } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onWishlistToggle?: (productId: string) => void
  isInWishlist?: boolean
}

export function ProductCard({ product, onWishlistToggle, isInWishlist }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    onWishlistToggle?.(product.id)
  }

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.featured && (
            <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              Featured
            </span>
          )}
          {product.best_seller && (
            <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onWishlistToggle && (
          <button
            onClick={handleWishlistToggle}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isInWishlist ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              )}
            />
          </button>
        )}

        {/* Image */}
        <div className="relative aspect-square bg-muted">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs font-medium text-primary mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating placeholder */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(24)</span>
          </div>

          {/* Price and Cart */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-bold">${Number(product.price).toFixed(2)}</p>
              {product.stock > 0 ? (
                <p className="text-xs text-muted-foreground">
                  {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                </p>
              ) : (
                <p className="text-xs text-destructive">Out of Stock</p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
