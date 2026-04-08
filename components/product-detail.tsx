"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, Minus, Plus, Star, Package, Truck, Shield, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { ProductWithCategory } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ProductImage, ImageThumbnail } from './product-image'
import { toggleWishlist, getWishlistProductIds } from '@/lib/actions/wishlist'

interface ProductDetailProps {
  product: ProductWithCategory
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const { addToCart } = useCart()

  // Load wishlist status on mount
  useEffect(() => {
    const loadWishlistStatus = async () => {
      const wishlistIds = await getWishlistProductIds()
      setIsInWishlist(wishlistIds.has(product.id))
    }
    loadWishlistStatus()
  }, [product.id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} añadido al carrito`)
  }

  const handleWishlistToggle = useCallback(async () => {
    if (isWishlistLoading) return
    setIsWishlistLoading(true)
    
    await toggleWishlist(product.id, (newState) => {
      setIsInWishlist(newState)
    })
    
    setIsWishlistLoading(false)
  }, [product.id, isWishlistLoading])

  const specs = product.technical_specs as Record<string, string> | null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
            <ProductImage
              src={product.images?.[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.featured && (
                <span className="rounded bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                  ★ Destacado
                </span>
              )}
              {product.best_seller && (
                <span className="rounded bg-orange-600 px-3 py-1 text-sm font-medium text-white">
                  🔥 Bestseller
                </span>
              )}
            </div>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <ImageThumbnail
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  isSelected={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-orange-500 uppercase tracking-wider">{product.brand}</p>
          <h1 className="text-2xl font-bold mt-1 lg:text-3xl text-foreground">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < 4 ? 'fill-orange-400 text-orange-400' : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24 reseñas)</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl font-bold text-foreground">${Number(product.price).toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              {product.stock > 0 ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    {product.stock < 10 ? `Solo quedan ${product.stock} en stock` : 'En stock'}
                  </span>
                </>
              ) : (
                <span className="text-sm text-red-500">Sin stock</span>
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
            <div className="flex items-center rounded-lg border border-border bg-card">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-3 text-sm font-semibold text-white hover:from-orange-500 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[200px] shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir al Carrito
            </button>
            <button
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
              aria-label={isInWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart 
                className={cn(
                  'h-5 w-5 transition-colors',
                  isInWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                )} 
              />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <Truck className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Envío Gratis</p>
                <p className="text-muted-foreground">En pedidos +$99</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <Shield className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Garantía</p>
                <p className="text-muted-foreground">Del fabricante</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <Package className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Devoluciones</p>
                <p className="text-muted-foreground">30 días</p>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Especificaciones Técnicas</h2>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(specs).map(([key, value], index) => (
                      <tr
                        key={key}
                        className={index % 2 === 0 ? 'bg-muted/50' : ''}
                      >
                        <td className="px-4 py-3 text-sm font-medium capitalize text-foreground">
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
