"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Hammer, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  src?: string | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  // Si no hay src o hubo un error, mostrar placeholder
  if (!src || hasError) {
    if (fill) {
      return (
        <div
          className={cn(
            'relative flex items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950',
            className
          )}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />
          </div>
          {/* Icon */}
          <Hammer className="h-10 w-10 md:h-14 md:w-14 text-orange-500/40 relative z-10" />
        </div>
      )
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 rounded-md',
          className
        )}
        style={{ width, height }}
      >
        <Hammer className="h-6 w-6 md:h-8 md:w-8 text-orange-500/30" />
      </div>
    )
  }

  // Renderizar la imagen con manejo de errores
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  )
}

// Componente simple para thumbnails en carruseles
export function ImageThumbnail({
  src,
  alt,
  isSelected,
  onClick,
}: {
  src: string
  alt: string
  isSelected: boolean
  onClick: () => void
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
          isSelected ? 'border-orange-500' : 'border-border hover:border-orange-500/50'
        )}
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
          <Package className="h-6 w-6 text-orange-500/30" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
        isSelected ? 'border-orange-500' : 'border-border hover:border-orange-500/50'
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </button>
  )
}
