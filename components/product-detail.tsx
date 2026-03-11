"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, Minus, Plus, Star, Package, Truck, Shield, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { ProductWithCategory } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProductDetailProps {
  product: ProductWithCategory
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} added to cart`)
  }

  const specs = product.technical_specs as Record<string, string> | null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
            {product.images?.[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.featured && (
                <span className="rounded bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                  Featured
                </span>
              )}
              {product.best_seller && (
                <span className="rounded bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  Best Seller
                </span>
              )}
            </div>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary">{product.brand}</p>
          <h1 className="text-2xl font-bold mt-1 lg:text-3xl">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl font-bold">${Number(product.price).toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              {product.stock > 0 ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    {product.stock < 10 ? `Only ${product.stock} left in stock` : 'In Stock'}
                  </span>
                </>
              ) : (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-md border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[200px]"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Truck className="h-5 w-5 text-primary shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">Over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Warranty</p>
                <p className="text-muted-foreground">Manufacturer</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Package className="h-5 w-5 text-primary shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Easy Returns</p>
                <p className="text-muted-foreground">30 days</p>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Technical Specifications</h2>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(specs).map(([key, value], index) => (
                      <tr
                        key={key}
                        className={index % 2 === 0 ? 'bg-muted/50' : ''}
                      >
                        <td className="px-4 py-3 text-sm font-medium capitalize">
                          {key.replace(/_/g, ' ')}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
