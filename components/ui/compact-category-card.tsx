import Image from 'next/image'
import Link from 'next/link'
import { Wrench } from 'lucide-react'
import type { Category } from '@/lib/types'

interface CompactCategoryCardProps {
  category: Category
}

export function CompactCategoryCard({ category }: CompactCategoryCardProps) {
  return (
    <Link href={`/todas-las-categorias/${category.slug}`} className="group flex-shrink-0">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md hover:scale-[1.02] w-[160px] sm:w-[180px]">
        {/* Image */}
        <div className="relative aspect-square bg-muted">
          {category.image_url ? (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <Wrench className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}
