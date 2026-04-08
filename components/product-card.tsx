"use client"

import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ProductImage } from './product-image'
import { useRef, useCallback } from 'react'

interface ProductCardProps {
  product: Product
  onWishlistToggle?: (productId: string) => void
  isInWishlist?: boolean
  className?: string
  variant?: 'grid' | 'list'
}

export function ProductCard({ 
  product, 
  onWishlistToggle, 
  isInWishlist, 
  className,
  variant = 'grid'
}: ProductCardProps) {
  const { addToCart } = useCart()
  const lastAddedRef = useRef<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent rapid duplicate clicks (debounce)
    const now = Date.now()
    if (lastAddedRef.current === product.id && timeoutRef.current) {
      console.log('Blocked duplicate add for', product.id)
      return
    }
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Mark this product as recently added
    lastAddedRef.current = product.id
    
    // Add to cart
    addToCart(product, 1)
    toast.success(`${product.name} añadido al carrito`)
    
    // Reset after 1 second
    timeoutRef.current = setTimeout(() => {
      lastAddedRef.current = null
    }, 1000)
  }, [addToCart, product.id, product.name])

  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onWishlistToggle?.(product.id)
  }, [onWishlistToggle, product.id])

  // Grid variant
  if (variant === 'grid') {
    return (
      <div className={cn("group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1", className)}>
        
        {/* Wishlist Button - FLOATING top right */}
        {onWishlistToggle && (
          <button
            type="button"
            onClick={handleWishlistToggle}
            className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent hover:border-orange-500/50 transition-all shadow-sm"
            aria-label={isInWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-all',
                isInWishlist 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'text-muted-foreground group-hover:text-foreground'
              )}
            />
          </button>
        )}

        {/* Link wraps image and content */}
        <Link 
          href={`/product/${product.slug}`}
          className="flex flex-col flex-1"
        >
          {/* Badges */}
          <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
            {product.featured && (
              <span className="rounded bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                ★ Destacado
              </span>
            )}
            {product.best_seller && (
              <span className="rounded bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                🔥 Bestseller
              </span>
            )}
          </div>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <ProductImage
              src={product.images?.[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex flex-col p-3 space-y-2">
            <p className="text-[10px] font-semibold text-orange-600 dark:text-orange-500 uppercase tracking-wider truncate">
              {product.brand}
            </p>
            
            <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < 4 ? 'fill-orange-400 text-orange-400' : 'fill-muted text-muted'
                  )}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">(24)</span>
            </div>

            {/* Price section */}
            <div className="mt-auto pt-2 border-t border-border/50">
              <p className="text-lg font-bold text-foreground whitespace-nowrap">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className={cn(
                "text-[10px] font-medium mt-0.5",
                product.stock > 0 
                  ? product.stock < 10 ? 'text-amber-600 dark:text-amber-500' : 'text-green-600 dark:text-green-500' 
                  : 'text-red-600 dark:text-red-500'
              )}>
                {product.stock > 0 
                  ? product.stock < 10 ? `Solo quedan ${product.stock}` : 'En stock' 
                  : 'Sin stock'}
              </p>
            </div>
          </div>
        </Link>
        
        {/* Add to Cart Button - below content */}
        <div className="px-3 pb-3 pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={cn(
              "w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300",
              "hover:from-orange-500 hover:to-orange-400 hover:shadow-md hover:shadow-orange-500/20",
              "disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
              "active:scale-[0.98]"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.stock === 0 ? 'Sin stock' : 'Agregar'}</span>
          </button>
        </div>
      </div>
    )
  }

  // List variant
  return (
    <div className={cn("group flex gap-4 rounded-xl border border-border bg-card p-3 md:p-4 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5", className)}>
      
      {/* Image */}
      <Link 
        href={`/product/${product.slug}`}
        className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
      >
        <ProductImage
          src={product.images?.[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges overlay */}
        <div className="absolute left-1 top-1 flex flex-col gap-0.5">
          {product.featured && (
            <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              ★ Dest.
            </span>
          )}
          {product.best_seller && (
            <span className="rounded bg-orange-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
              🔥 Best
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 py-1">
        <Link href={`/product/${product.slug}`} className="flex-1">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-xs font-semibold text-orange-600 dark:text-orange-500 uppercase tracking-wider truncate">
                {product.brand}
              </p>
              <h3 className="text-sm md:text-base font-medium text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1 md:mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3 md:h-4 md:w-4',
                  i < 4 ? 'fill-orange-400 text-orange-400' : 'fill-muted text-muted'
                )}
              />
            ))}
            <span className="text-[10px] md:text-xs text-muted-foreground ml-1">(24)</span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="hidden md:block text-xs text-muted-foreground mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </Link>

        {/* Bottom row with price and buttons */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-2 md:pt-3">
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-bold text-foreground">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className={cn(
              "text-[10px] md:text-xs font-medium",
              product.stock > 0 
                ? product.stock < 10 ? 'text-amber-600 dark:text-amber-500' : 'text-green-600 dark:text-green-500' 
                : 'text-red-600 dark:text-red-500'
            )}>
              {product.stock > 0 
                ? product.stock < 10 ? `Solo quedan ${product.stock}` : 'En stock' 
                : 'Sin stock'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {/* Wishlist button */}
            {onWishlistToggle && (
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isInWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  )}
                />
              </button>
            )}
            
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-3 md:px-4 py-2 text-sm font-medium text-white transition-all duration-300",
                "hover:from-orange-500 hover:to-orange-400 hover:shadow-md",
                "disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
                "active:scale-[0.98]"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">Añadir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
